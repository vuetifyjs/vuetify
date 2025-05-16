import { ref, computed, shallowRef, onScopeDispose, isRef, readonly, getCurrentInstance } from 'vue';
import type { Ref, ComputedRef, InjectionKey } from 'vue';
import { useKeyBindings } from './useKeyBindings';
import type {
  ActionDefinition,
  ActionContext,
  ActionsSource,
  ActionCoreOptions as ActionCoreInstanceOptions,
  ActionCorePublicAPI,
  KeyBindingHandlerOptions,
} from './types';
import { IS_CLIENT, log, isPromise } from './utils'; // Import centralized utilities

/**
 * @file actionCore.ts The core logic for managing, registering, and executing actions,
 * integrating with `useKeyBindings` for hotkey support.
 */

const COMPONENT_NAME = 'ActionCore';

/**
 * Injection key for providing and injecting the ActionCore instance's public API.
 * @type {InjectionKey<ActionCorePublicAPI>}
 */
export const ActionCoreSymbol: InjectionKey<ActionCorePublicAPI> = Symbol.for('vuetify:action-core');

/**
 * Manages collections of actions, their hotkeys, and execution state.
 * It provides a centralized system for defining and triggering commands within an application.
 */
class ActionCore implements ActionCorePublicAPI {
  /** Options passed to the ActionCore instance during construction. */
  private readonly options: ActionCoreInstanceOptions;

  /** Reactive state indicating if any action is currently being executed. */
  public readonly isLoading: Readonly<Ref<boolean>>;
  /** Internal mutable ref for isLoading state. */
  private _isLoading = ref(false);

  /** Shallow ref map of registered action sources. Key is a unique symbol, value is the ActionsSource. */
  private registeredSources = shallowRef<Map<symbol, ActionsSource>>(new Map());
  /** Map to store unregister functions for hotkeys associated with an action ID. */
  private actionHotkeysUnregisterMap = new Map<string, (() => void)[]>();
  /** Instance of the keybindings manager. */
  private keyBindings: ReturnType<typeof useKeyBindings>;

  /** Map to track pending async source resolutions */
  private pendingAsyncSources = new Map<symbol, Promise<ActionDefinition<any>[]>>();

  /**
   * Computed property that aggregates all valid actions from all registered sources.
   * It deduplicates actions by ID (last one registered wins) and triggers hotkey processing.
   * @type {ComputedRef<Readonly<ActionDefinition<any>[]>>}
   */
  public readonly allActions: ComputedRef<Readonly<ActionDefinition<any>[]>>;

  /**
   * Creates an instance of ActionCore.
   * @param {ActionCoreInstanceOptions} [options={}] - Configuration options for this ActionCore instance.
   */
  constructor(options: ActionCoreInstanceOptions = {}) {
    this.options = options; // Store options for potential future use (e.g., componentIntegration flags)
    this.isLoading = readonly(this._isLoading);
    this.keyBindings = useKeyBindings(); // Initialize keybindings

    this.allActions = computed(() => {
      const actions: ActionDefinition<any>[] = [];
      // Process registered sources
      for (const [sourceKey, source] of this.registeredSources.value.entries()) {
        let currentActionsFromSource: ActionDefinition<any>[] = [];
        const sourceValue = isRef(source) ? source.value : source;

        if (typeof sourceValue === 'function') {
          try {
            const result = (sourceValue as () => ActionDefinition<any>[] | Promise<ActionDefinition<any>[]>)();

            if (isPromise<ActionDefinition<any>[]>(result)) {
              // Handle async source
              if (!this.pendingAsyncSources.has(sourceKey)) {
                log('debug', COMPONENT_NAME, 'Processing async action source');
                const processAsyncResult = async () => {
                  try {
                    const resolvedActions = await result;
                    // Check if this source is still registered
                    if (this.registeredSources.value.has(sourceKey)) {
                      // Force update of allActions by creating a new Map for registeredSources
                      const newMap = new Map(this.registeredSources.value);
                      // Store the resolved actions if the source is a function
                      const filteredActions = Array.isArray(resolvedActions)
                        ? resolvedActions.filter(this.isActionDefinition)
                        : [];
                      // Trigger update
                      this.registeredSources.value = newMap;
                      log('debug', COMPONENT_NAME, `Async source resolved with ${filteredActions.length} actions`);
                    }
                    return resolvedActions;
                  } catch (error) {
                    log('error', COMPONENT_NAME, 'resolve async actions source', error);
                    return [];
                  } finally {
                    this.pendingAsyncSources.delete(sourceKey);
                  }
                };

                // Store the promise to track its state
                this.pendingAsyncSources.set(sourceKey, processAsyncResult());
              }
              // Don't include any actions from this source until resolved
              currentActionsFromSource = [];
            } else {
              // Synchronous source
              currentActionsFromSource = Array.isArray(result) ? result.filter(this.isActionDefinition) : [];
            }
          } catch (error) {
            log('error', COMPONENT_NAME, 'execute actions source function', error);
            currentActionsFromSource = [];
          }
        } else if (Array.isArray(sourceValue)) {
          currentActionsFromSource = sourceValue.filter(this.isActionDefinition);
        }

        actions.push(...currentActionsFromSource);
      }

      const actionMap = new Map<string, ActionDefinition<any>>();
      actions.forEach(action => actionMap.set(action.id, action));
      const finalActions = Array.from(actionMap.values());
      this.processAndRegisterHotkeys(finalActions);
      return Object.freeze(finalActions);
    });
  }

  /**
   * Type guard to check if an entry is a valid ActionDefinition.
   * An action is valid if it has an ID and either a handler or subItems.
   * @param {*} entry - The entry to check.
   * @returns {entry is ActionDefinition<any>} True if the entry is a valid ActionDefinition.
   */
  private isActionDefinition(entry: any): entry is ActionDefinition<any> {
    return typeof entry === 'object' && entry !== null && typeof entry.id === 'string' &&
           (typeof entry.handler === 'function' || typeof entry.subItems === 'function');
  }

  /**
   * Processes the current list of actions to register their hotkeys
   * and unregister hotkeys for actions that are no longer present.
   * @param {Readonly<ActionDefinition<any>[]>} actionsToKeep - The current list of actions to process hotkeys for.
   */
  private processAndRegisterHotkeys(actionsToKeep: Readonly<ActionDefinition<any>[]>) {
    const actionIdsToKeep = new Set(actionsToKeep.map(action => action.id));
    this.actionHotkeysUnregisterMap.forEach((unregisterFns, actionId) => {
      if (!actionIdsToKeep.has(actionId)) {
        log('debug', COMPONENT_NAME, `Unregistering all hotkeys for removed action ID: ${actionId}`);
        unregisterFns.forEach(fn => fn());
        this.actionHotkeysUnregisterMap.delete(actionId);
      }
    });

    for (const currentActionDef of actionsToKeep) {
      const existingUnregisterFns = this.actionHotkeysUnregisterMap.get(currentActionDef.id);
      if (existingUnregisterFns) {
        log('debug', COMPONENT_NAME, `Re-registering: Unregistering old hotkeys for action ID: ${currentActionDef.id}`);
        existingUnregisterFns.forEach(fn => fn());
      }
      this.actionHotkeysUnregisterMap.delete(currentActionDef.id);

      if (currentActionDef.hotkey) {
        const hotkeyStrings = Array.isArray(currentActionDef.hotkey) ? currentActionDef.hotkey : [currentActionDef.hotkey];
        const newUnregisterFns: (()=>void)[] = [];
        for (const hotkeyString of hotkeyStrings) {
          const individualBindings = hotkeyString.split(',').map(s => s.trim()).filter(s => s);
          for (const binding of individualBindings) {
            const handlerOpts: KeyBindingHandlerOptions = {};
            const runInTextInputMatcher = currentActionDef.runInTextInput;
            if (runInTextInputMatcher === true) handlerOpts.ignoreInputBlocker = true;
            else handlerOpts.ignoreInputBlocker = false;

            const unregisterFn = this.keyBindings.on(
              binding,
              (event: KeyboardEvent) => {
                const action = this.getAction(currentActionDef.id);
                if (!action) return;

                if (action.disabled === true || (isRef(action.disabled) && action.disabled.value === true)) {
                  log('debug', COMPONENT_NAME, `Hotkey "${binding}" for disabled action "${action.id}" ignored.`);
                  return;
                }
                const activeElement = IS_CLIENT ? document.activeElement : null;
                const isGenerallyInputFocused = activeElement &&
                                              (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName?.toUpperCase()) ||
                                              (activeElement as HTMLElement).isContentEditable);
                const matcher = action.runInTextInput;
                if (matcher === 'only') { if (!isGenerallyInputFocused) { log('debug', COMPONENT_NAME, `Hotkey "${binding}" for action "${action.id}" (runInTextInput: 'only') ignored; general input not focused.`); return; } }
                else if (typeof matcher === 'string') { if (!isGenerallyInputFocused || (activeElement as HTMLInputElement)?.name !== matcher) { log('debug', COMPONENT_NAME, `Hotkey "${binding}" for action "${action.id}" (runInTextInput: "${matcher}") ignored; input name mismatch or not focused.`); return; } }
                else if (Array.isArray(matcher)) { if (!isGenerallyInputFocused || !matcher.includes((activeElement as HTMLInputElement)?.name)) { log('debug', COMPONENT_NAME, `Hotkey "${binding}" for action "${action.id}" (runInTextInput: [${matcher.join(',')}]) ignored; input name mismatch or not focused.`); return; } }
                else if (typeof matcher === 'function') { if (!matcher(activeElement as Element)) { log('debug', COMPONENT_NAME, `Hotkey "${binding}" for action "${action.id}" (runInTextInput: custom function) ignored; predicate returned false.`); return; } }
                const context: ActionContext = { trigger: 'hotkey', event };
                if (action.canExecute) {
                  try {
                    if (!action.canExecute(context)) {
                      log('debug', COMPONENT_NAME, `Hotkey "${binding}" for action "${action.id}" ignored; canExecute returned false.`); return;
                    }
                  } catch (e) { log('error', COMPONENT_NAME, `canExecute for action "${action.id}" triggered by hotkey "${binding}"`, e); return; }
                }

                log('debug', COMPONENT_NAME, `Hotkey "${binding}" executing action "${action.id}"`);
                this.executeAction(action.id, context);
              },
              handlerOpts
            );
            newUnregisterFns.push(unregisterFn);
          }
        }
        if (newUnregisterFns.length > 0) this.actionHotkeysUnregisterMap.set(currentActionDef.id, newUnregisterFns);
      }
    }
  }

  /**
   * Registers a new source of actions with ActionCore.
   * @param {ActionsSource} source - The source of actions (array, Ref, or function).
   * @returns {symbol} A unique symbol key for this source, which can be used to unregister it.
   */
  public registerActionsSource(source: ActionsSource): symbol {
    const key = Symbol('ActionSource');
    const newMap = new Map(this.registeredSources.value);
    newMap.set(key, source);
    this.registeredSources.value = newMap;
    log('debug', COMPONENT_NAME, `Registered action source: ${key.toString()}`);
    return key;
  }

  /**
   * Unregisters an existing action source using its key.
   * @param {symbol} key - The symbol key of the source to unregister.
   * @returns {boolean} True if the source was found and unregistered, false otherwise.
   */
  public unregisterActionsSource(key: symbol): boolean {
    const newMap = new Map(this.registeredSources.value);
    const deleted = newMap.delete(key);
    if (deleted) {
      this.registeredSources.value = newMap;
      this.pendingAsyncSources.delete(key); // Also clean up any pending async resolution
      log('debug', COMPONENT_NAME, `Unregistered action source: ${key.toString()}`);
    } else {
      log('warn', COMPONENT_NAME, `Attempted to unregister non-existent action source key: ${key.toString()}`);
    }
    return deleted;
  }

  /**
   * Retrieves a specific action definition by its ID from the current set of all actions.
   * @param {string} actionId - The ID of the action to retrieve.
   * @returns {ActionDefinition<any> | undefined} The action definition if found, otherwise undefined.
   */
  public getAction(actionId: string): ActionDefinition<any> | undefined {
    return this.allActions.value.find(action => action.id === actionId);
  }

  /**
   * Executes a registered action by its ID.
   * Checks `disabled` and `canExecute` conditions before running the handler.
   * Sets the `isLoading` state during handler execution.
   * @param {string} actionId - The ID of the action to execute.
   * @param {ActionContext} [invocationContext={}] - The context for this specific action invocation.
   * @returns {Promise<void>} A promise that resolves when the action handler completes or is skipped.
   */
  public async executeAction(actionId: string, invocationContext: ActionContext = {}): Promise<void> {
    const action = this.getAction(actionId);
    if (!action) {
      log('error', COMPONENT_NAME, `execute action: Action with id "${actionId}" not found`);
      return;
    }
    if (action.disabled === true || (isRef(action.disabled) && action.disabled.value === true)) {
      log('warn', COMPONENT_NAME, `Action "${actionId}" is disabled`);
      return;
    }
    const executionContext: ActionContext = { ...invocationContext };
    if (action.canExecute) {
      try {
        if (!action.canExecute(executionContext)) {
          log('warn', COMPONENT_NAME, `Action "${actionId}" cannot be executed due to canExecute returning false`, { context: executionContext });
          return;
        }
      } catch (error: any) {
        log('error', COMPONENT_NAME, `canExecute check for action "${actionId}"`, error);
        return;
      }
    }
    if (typeof action.handler !== 'function') {
      if (typeof action.subItems === 'function') {
        log('debug', COMPONENT_NAME, `Action "${actionId}" is a group action, no direct handler called. SubItems might be used by UI.`);
        return;
      }
      log('error', COMPONENT_NAME, `Action "${actionId}" has no handler or subItems to execute`);
      return;
    }
    this._isLoading.value = true;
    try {
      log('debug', COMPONENT_NAME, `Executing handler for action: ${action.id}`);
      await action.handler(executionContext);
    } catch (error: any) {
      log('error', COMPONENT_NAME, `execute action "${actionId}"`, error);
    } finally {
      this._isLoading.value = false;
    }
  }

  /**
   * Method to check if component integration is enabled for a specific component.
   * Relies on `componentIntegration` settings passed in `ActionCoreInstanceOptions`.
   * @param {string} componentName - The name of the component (e.g., 'VBtn').
   * @returns {boolean} True if integration is enabled for the component.
   */
  public isComponentIntegrationEnabled(componentName: string): boolean {
    const integrationOpts = this.options.componentIntegration;
    if (!integrationOpts) return false;
    if (typeof integrationOpts === 'boolean') return integrationOpts;
    return !!integrationOpts[componentName]; // Check specific component flag
  }

  /**
   * Cleans up the ActionCore instance, stopping keybindings and clearing registered actions/hotkeys.
   * Called automatically via `onScopeDispose` if `useActionCore` is used in a setup function.
   */
  public destroy = () => {
    log('debug', COMPONENT_NAME, 'Destroying ActionCore instance');
    this.keyBindings.stop();
    this.actionHotkeysUnregisterMap.forEach(fns => fns.forEach(fn => fn()));
    this.actionHotkeysUnregisterMap.clear();
    this.pendingAsyncSources.clear();
    const newMap = new Map();
    this.registeredSources.value = newMap;
  };
}

/** Singleton instance of ActionCore. */
let _actionCoreInstance: ActionCore | null = null;

/**
 * Composable function to get the singleton instance of ActionCore.
 * Initializes ActionCore on its first call within a client environment.
 * Manages automatic cleanup via `onScopeDispose` if used within a Vue component's setup context.
 * @param {ActionCoreInstanceOptions} [options] - Optional configuration for ActionCore, used only on first initialization.
 * @returns {ActionCore} The singleton ActionCore instance.
 */
export function useActionCore(options?: ActionCoreInstanceOptions): ActionCorePublicAPI {
  if (!_actionCoreInstance && IS_CLIENT) {
    _actionCoreInstance = new ActionCore(options);
    if (getCurrentInstance()) {
      onScopeDispose(() => {
        destroyActionCoreInstance();
      });
    }
  } else if (!_actionCoreInstance) {
    log('warn', COMPONENT_NAME, 'ActionCore accessed in a non-client environment without prior client-side initialization. Features might be limited.');
    _actionCoreInstance = new ActionCore(options);
  }
  return _actionCoreInstance!;
}

/**
 * Explicitly destroys the current singleton ActionCore instance, if one exists.
 * This will stop all keybindings and clear all registered actions.
 */
export function destroyActionCoreInstance() {
  if (_actionCoreInstance) {
    _actionCoreInstance.destroy();
    _actionCoreInstance = null;
  }
}

// Re-export types for convenience when importing from this module
export type { ActionCoreOptions } from './types';

