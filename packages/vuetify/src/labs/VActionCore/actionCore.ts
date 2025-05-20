import { ref, computed, shallowRef, onScopeDispose, isRef, readonly, getCurrentInstance, watch } from 'vue';
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
import type { App } from 'vue';

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

// Helper function for verbose logging if enabled
function verboseLog(instanceOptions: ActionCoreInstanceOptions, ...args: any[]) {
  if (instanceOptions.verboseLogging) {
    log('debug', COMPONENT_NAME, '[VERBOSE]', ...args);
  }
}

/**
 * Manages collections of actions, their hotkeys, and execution state.
 * It provides a centralized system for defining and triggering commands within an application.
 */
export class ActionCore implements ActionCorePublicAPI {
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

  /** Internal mutable ref for the active profile name. */
  private _activeProfile = ref<string | null>(null);
  /** Public readonly ref for the active profile name. */
  public readonly activeProfile: Readonly<Ref<string | null>>;

  /**
   * Computed property that aggregates all valid actions from all registered sources.
   * It deduplicates actions by ID (last one registered wins) and triggers hotkey processing.
   * These actions are the "effective" actions, potentially merged with profile overrides.
   * @type {ComputedRef<Readonly<ActionDefinition<any>[]>>}
   */
  public readonly allActions: ComputedRef<Readonly<ActionDefinition<any>[]>>;

  /**
   * Creates an instance of ActionCore.
   * @param {ActionCoreInstanceOptions} [options={}] - Configuration options for this ActionCore instance.
   */
  constructor(options: ActionCoreInstanceOptions = {}) {
    this.options = { verboseLogging: false, ...options }; // Initialize with default for verboseLogging
    this.isLoading = readonly(this._isLoading);
    this._activeProfile = ref<string | null>(null);
    this.activeProfile = readonly(this._activeProfile);
    this.keyBindings = useKeyBindings({ capture: true });
    this.keyBindings.start(); // Start listening for key events

    if (this.options.verboseLogging) {
      log('info', COMPONENT_NAME, `Instance created with verbose logging enabled.`);
    } else {
      log('info', COMPONENT_NAME, `Instance created.`);
    }

    this.allActions = computed(() => {
      const currentProfileName = this._activeProfile.value;
      log('debug', COMPONENT_NAME, `Computing allActions. Active profile: ${currentProfileName}`);

      const baseActions: ActionDefinition<any>[] = [];
      for (const [sourceKey, source] of this.registeredSources.value.entries()) {
        let currentActionsFromSource: ActionDefinition<any>[] = [];
        const sourceValue = isRef(source) ? source.value : source;

        if (typeof sourceValue === 'function') {
          try {
            const result = (sourceValue as () => ActionDefinition<any>[] | Promise<ActionDefinition<any>[]>)();
            if (isPromise<ActionDefinition<any>[]>(result)) {
              if (!this.pendingAsyncSources.has(sourceKey)) {
                log('debug', COMPONENT_NAME, 'Processing async action source');
                const processAsyncResult = async () => {
                  try {
                    const resolvedActions = await result;
                    if (this.registeredSources.value.has(sourceKey)) {
                      const newMap = new Map(this.registeredSources.value);
                      const filteredActions = Array.isArray(resolvedActions)
                        ? resolvedActions.filter(action => this.isBaseActionDefinitionValid(action))
                        : [];
                      newMap.set(sourceKey, filteredActions);
                      this.registeredSources.value = newMap;
                      log('debug', COMPONENT_NAME, `Async source resolved with ${filteredActions.length} base actions`);
                    }
                    return resolvedActions;
                  } catch (error) {
                    log('error', COMPONENT_NAME, 'resolve async actions source', error);
                    return [];
                  } finally {
                    this.pendingAsyncSources.delete(sourceKey);
                  }
                };
                this.pendingAsyncSources.set(sourceKey, processAsyncResult());
              }
              currentActionsFromSource = [];
            } else {
              currentActionsFromSource = Array.isArray(result) ? result.filter(action => this.isBaseActionDefinitionValid(action)) : [];
            }
          } catch (error) {
            log('error', COMPONENT_NAME, 'execute actions source function', error);
            currentActionsFromSource = [];
          }
        } else if (Array.isArray(sourceValue)) {
          currentActionsFromSource = sourceValue.filter(action => this.isBaseActionDefinitionValid(action));
        }
        baseActions.push(...currentActionsFromSource);
      }

      const baseActionMap = new Map<string, ActionDefinition<any>>();
      baseActions.forEach(action => baseActionMap.set(action.id, action));

      const effectiveActions: ActionDefinition<any>[] = [];
      for (const baseAction of baseActionMap.values()) {
        const effectiveAction = this.getEffectiveActionDefinition(baseAction, currentProfileName);
        if (this.isEffectiveActionDefinitionValid(effectiveAction)) {
          effectiveActions.push(effectiveAction);
        }
      }
      return Object.freeze(effectiveActions);
    });

    // Watch allActions to trigger hotkey processing as a side effect
    watch(this.allActions, (newActions, oldActions) => {
      log('debug', COMPONENT_NAME, 'allActions changed, queueing hotkey reprocessing.');
      // Vue's watch with deep:true might trigger even if the objects are structurally similar.
      // A more robust check might involve comparing action IDs and their hotkey definitions if performance becomes an issue.
      this.processAndRegisterHotkeys(newActions);
    }, { deep: true, immediate: true }); // immediate: true ensures it runs for the initial set of actions
  }

  /**
   * Validates a base ActionDefinition (before profile merging).
   * It must have an ID.
   * The presence of handler or subItems is checked on the *effective* action.
   */
  private isBaseActionDefinitionValid(entry: any): entry is ActionDefinition<any> {
    return typeof entry === 'object' && entry !== null && typeof entry.id === 'string';
  }

  /**
   * Validates an effective ActionDefinition (after profile merging).
   * An action is valid if it has an ID and either a handler or subItems.
   */
  private isEffectiveActionDefinitionValid(entry: ActionDefinition<any>): boolean {
    return typeof entry.handler === 'function' || typeof entry.subItems === 'function';
  }

  /**
   * Applies profile overrides to a base action definition.
   * @param baseAction The base action definition.
   * @param profileName The name of the active profile, or null.
   * @returns The effective action definition.
   */
  private getEffectiveActionDefinition(baseAction: ActionDefinition<any>, profileName: string | null): ActionDefinition<any> {
    if (profileName && baseAction.profiles && baseAction.profiles[profileName]) {
      const profileOverrides = baseAction.profiles[profileName];

      let mergedMeta = { ...(baseAction.meta || {}) }; // Start with base meta
      if (profileOverrides.meta) {
        // Deep merge logic specifically for meta and its nested properties if needed
        // For now, simple override for top-level keys in profileOverrides.meta
        // and a specific deep merge for a common pattern like 'nested' object.
        mergedMeta = { ...mergedMeta, ...profileOverrides.meta };
        if (baseAction.meta?.nested && typeof baseAction.meta.nested === 'object' &&
            profileOverrides.meta.nested && typeof profileOverrides.meta.nested === 'object' &&
            !Array.isArray(baseAction.meta.nested) && !Array.isArray(profileOverrides.meta.nested)) {
          mergedMeta.nested = { ...baseAction.meta.nested, ...profileOverrides.meta.nested };
        }
      }

      const effectiveAction = {
        ...baseAction,
        ...profileOverrides, // Profile overrides base properties
        id: baseAction.id,
        profiles: baseAction.profiles,
        meta: mergedMeta, // Use the more deeply merged meta
      };
      return effectiveAction;
    }
    return baseAction; // Return base action if no active profile or no matching override
  }

  /**
   * Processes the current list of actions to register their hotkeys
   * and unregister hotkeys for actions that are no longer present.
   * @param {Readonly<ActionDefinition<any>[]>} actionsToKeep - The current list of actions to process hotkeys for.
   */
  private processAndRegisterHotkeys(actionsToKeep: Readonly<ActionDefinition<any>[]>) {
    // ---- ACTION CORE DEBUG LOG ----
    // console.log('[ActionCore INFO] processAndRegisterHotkeys called with actions:', actionsToKeep.map(a => a.id));
    // ---- END DEBUG LOG ----

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
            const baseHotkeyOptions = currentActionDef.hotkeyOptions || {};
            const handlerOpts: KeyBindingHandlerOptions = {
              ...baseHotkeyOptions,
            };
            const runInTextInputMatcher = currentActionDef.runInTextInput;
            let ignoreBlocker = false;
            if (runInTextInputMatcher === true || runInTextInputMatcher === 'only') {
              ignoreBlocker = true;
            } else if (
              typeof runInTextInputMatcher === 'function' ||
              typeof runInTextInputMatcher === 'string' ||
              Array.isArray(runInTextInputMatcher)
            ) {
              ignoreBlocker = true;
            }
            handlerOpts.ignoreInputBlocker = ignoreBlocker;

            verboseLog(this.options, `Attempting to register hotkey '${binding}' for action '${currentActionDef.id}'`, { options: handlerOpts });

            const unregisterFn = this.keyBindings.on(
              binding,
              (event: KeyboardEvent) => {
                const action = this.getAction(currentActionDef.id);
                if (!action) {
                  console.warn(`[ActionCore WARN] Hotkey callback: Action '${currentActionDef.id}' not found at execution time.`);
                  verboseLog(this.options, `Hotkey callback: Action '${currentActionDef.id}' not found at execution time.`);
                  return;
                }
                verboseLog(this.options, `Hotkey '${binding}' triggered for action '${action.id}'. Evaluating conditions...`);

                // **** START: Added runInTextInput evaluation ****
                const activeElement = IS_CLIENT ? document.activeElement : null;
                const runInTextInputMatcher = action.runInTextInput;
                let allowExecutionBasedOnInputContext = false;

                if (typeof runInTextInputMatcher === 'function') {
                  allowExecutionBasedOnInputContext = runInTextInputMatcher(activeElement);
                  verboseLog(this.options, `Action '${action.id}': runInTextInput (function) evaluated to: ${allowExecutionBasedOnInputContext} for element:`, activeElement?.tagName, activeElement?.id);
                } else if (runInTextInputMatcher === true) {
                  allowExecutionBasedOnInputContext = true;
                  verboseLog(this.options, `Action '${action.id}': runInTextInput is true. Allowing execution.`);
                } else if (runInTextInputMatcher === 'only') {
                  allowExecutionBasedOnInputContext = !!(activeElement && (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName?.toUpperCase()) || (activeElement as HTMLElement).isContentEditable));
                  verboseLog(this.options, `Action '${action.id}': runInTextInput is 'only'. Input focused: ${allowExecutionBasedOnInputContext}. Element:`, activeElement?.tagName, activeElement?.id);
                } else if (typeof runInTextInputMatcher === 'string') {
                  if (activeElement && activeElement.matches && typeof activeElement.matches === 'function') {
                     allowExecutionBasedOnInputContext = activeElement.matches(runInTextInputMatcher) || (activeElement.closest && activeElement.closest(runInTextInputMatcher) !== null) ;
                  } else {
                    allowExecutionBasedOnInputContext = !!(activeElement && (activeElement as HTMLInputElement)?.name === runInTextInputMatcher);
                  }
                  verboseLog(this.options, `Action '${action.id}': runInTextInput (string: "${runInTextInputMatcher}") evaluated to: ${allowExecutionBasedOnInputContext} for element:`, activeElement?.tagName, activeElement?.id);
                } else if (Array.isArray(runInTextInputMatcher)) {
                  allowExecutionBasedOnInputContext = runInTextInputMatcher.some(matcher => {
                    if (activeElement && activeElement.matches && typeof activeElement.matches === 'function') {
                       return activeElement.matches(matcher) || (activeElement.closest && activeElement.closest(matcher) !== null);
                    }
                    return !!(activeElement && (activeElement as HTMLInputElement)?.name === matcher);
                  });
                  verboseLog(this.options, `Action '${action.id}': runInTextInput (array: [${runInTextInputMatcher.join(',')}] evaluated to: ${allowExecutionBasedOnInputContext} for element:`, activeElement?.tagName, activeElement?.id);
                } else { // runInTextInput is undefined or false
                  const isGenerallyInputFocused = activeElement && (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName?.toUpperCase()) || (activeElement as HTMLElement).isContentEditable);
                  if (isGenerallyInputFocused) {
                    verboseLog(this.options, `Action '${action.id}': Hotkey triggered in input, but runInTextInput is false/undefined. Blocking. Element:`, activeElement?.tagName, activeElement?.id);
                    return; // Block execution
                  }
                  allowExecutionBasedOnInputContext = true; // Not in an input, so allow by default
                  verboseLog(this.options, `Action '${action.id}': runInTextInput is false/undefined and not in an input. Allowing.`);
                }

                if (!allowExecutionBasedOnInputContext) {
                  verboseLog(this.options, `Action '${action.id}': Hotkey blocked by runInTextInput final evaluation.`);
                  return;
                }
                // **** END: Added runInTextInput evaluation ****

                // Proceed with canExecute and disabled checks only if allowed by input context
                if (action.disabled === true || (isRef(action.disabled) && action.disabled.value === true)) {
                  const disabledVal = isRef(action.disabled) ? action.disabled.value : action.disabled;
                  log('debug', COMPONENT_NAME, `Action ${action.id} hotkey is disabled.`);
                  verboseLog(this.options, `Action '${action.id}': Hotkey blocked because action.disabled is ${disabledVal}.`);
                  return;
                }
                verboseLog(this.options, `Action '${action.id}': Passed disabled check.`);

                const context: ActionContext = { trigger: 'hotkey', event };
                if (action.canExecute) {
                  try {
                    const canExecuteResult = action.canExecute(context);
                    if (!canExecuteResult) {
                      log('debug', COMPONENT_NAME, `Action ${action.id} hotkey canExecute returned false.`);
                      verboseLog(this.options, `Action '${action.id}': Hotkey blocked because canExecute() returned false.`);
                      return;
                    }
                    verboseLog(this.options, `Action '${action.id}': Passed canExecute() check (returned true).`);
                  } catch (e) {
                    log('error', COMPONENT_NAME, `Error in canExecute for action "${action.id}" triggered by hotkey`, e);
                    verboseLog(this.options, `Action '${action.id}': Hotkey blocked because canExecute() threw an error:`, e);
                    return;
                  }
                } else {
                  verboseLog(this.options, `Action '${action.id}': No canExecute function. Proceeding with execution.`);
                }
                verboseLog(this.options, `Action '${action.id}': All hotkey conditions passed. Executing action.`);
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

  // Other ActionCore methods (registerActionsSource, getAction, executeAction, etc.)
  // should be here. Due to previous truncation issues, their full presence needs to be verified.
  // For now, ensuring the class structure is valid and adding back known method signatures if missing.

  public registerActionsSource(source: ActionsSource): symbol {
    const key = Symbol('ActionSource');
    const newMap = new Map(this.registeredSources.value);
    newMap.set(key, source);
    this.registeredSources.value = newMap;
    log('debug', COMPONENT_NAME, `Registered action source: ${key.toString()}`);
    return key;
  }

  public unregisterActionsSource(key: symbol): boolean {
    const newMap = new Map(this.registeredSources.value);
    const deleted = newMap.delete(key);
    if (deleted) {
      this.registeredSources.value = newMap;
      this.pendingAsyncSources.delete(key);
      log('debug', COMPONENT_NAME, `Unregistered action source: ${key.toString()}`);
    } else {
      log('warn', COMPONENT_NAME, `Attempted to unregister non-existent action source key: ${key.toString()}`);
    }
    return deleted;
  }

  public getAction(actionId: string): ActionDefinition<any> | undefined {
    return this.allActions.value.find(action => action.id === actionId);
  }

  public async executeAction(actionId: string, invocationContext: ActionContext = {}): Promise<void> {
    const action = this.getAction(actionId);
    if (!action) {
      log('error', COMPONENT_NAME, `execute action: Action with id "${actionId}" not found`);
      return;
    }
    // ... (rest of executeAction logic as previously defined or restored) ...
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

  public isComponentIntegrationEnabled (componentName: string): boolean {
    log('warn', COMPONENT_NAME, '`isComponentIntegrationEnabled` is deprecated as direct component integration is being phased out.')
    const integrationOpts = this.options.componentIntegration
    if (typeof integrationOpts === 'boolean') return integrationOpts
    if (typeof integrationOpts === 'object' && integrationOpts !== null) return !!integrationOpts[componentName]
    return false
  }

  public destroy = () => {
    log('debug', COMPONENT_NAME, 'Destroying ActionCore instance')
    this.keyBindings?.stop()
    this.actionHotkeysUnregisterMap.forEach(fns => fns.forEach(fn => fn()))
    this.actionHotkeysUnregisterMap.clear()
    this.pendingAsyncSources.clear()
    this.registeredSources.value = new Map()
    this._activeProfile.value = null // Use internal ref
    log('debug', COMPONENT_NAME, 'ActionCore instance destroyed')
  }

  public setActiveProfile (profileName: string | null): void {
    if (this._activeProfile.value !== profileName) { // Use internal ref
      log('debug', COMPONENT_NAME, `Setting active profile to: ${profileName}`)
      this._activeProfile.value = profileName // Use internal ref
    } else {
      log('debug', COMPONENT_NAME, `Profile already set to: ${profileName}, no change.`)
    }
  }

} // End of ActionCore class

// Singleton management (useActionCore, destroyActionCoreInstance)
// should be here, assuming they were part of the original file structure.

let _actionCoreInstance: ActionCore | null = null;

export function useActionCore (options?: ActionCoreInstanceOptions, app?: App): ActionCorePublicAPI {
  if (!_actionCoreInstance && IS_CLIENT) {
    log('debug', COMPONENT_NAME, 'Initializing new ActionCore singleton instance.', options)
    _actionCoreInstance = new ActionCore(options)
    if (getCurrentInstance()) {
      onScopeDispose(() => {
        log('debug', COMPONENT_NAME, 'ActionCore instance automatically disposed with component scope.')
        destroyActionCoreInstance()
      })
    }
  } else if (!_actionCoreInstance) {
    if (!IS_CLIENT) {
      log('warn', COMPONENT_NAME, 'ActionCore accessed or initialized in a non-client environment. Limited functionality.')
      _actionCoreInstance = new ActionCore(options)
    }
     else if (IS_CLIENT && !_actionCoreInstance) {
        log('warn', COMPONENT_NAME, 'ActionCore singleton was previously destroyed. Re-initializing. This may indicate an issue if not intended.');
        _actionCoreInstance = new ActionCore(options);
         if (getCurrentInstance()) {
            onScopeDispose(() => {
                log('debug', COMPONENT_NAME, 'Re-initialized ActionCore instance automatically disposed with component scope.');
                destroyActionCoreInstance();
            });
        }
    }
  }
  if (!_actionCoreInstance && !IS_CLIENT) {
    _actionCoreInstance = new ActionCore(options)
  }
  if (!_actionCoreInstance) {
    log('error', COMPONENT_NAME, 'ActionCore instance could not be provided. This is an unexpected state.')
    _actionCoreInstance = new ActionCore(options);
  }
  return _actionCoreInstance!;
}

export function destroyActionCoreInstance (): void {
  if (_actionCoreInstance) {
    log('debug', COMPONENT_NAME, 'Explicitly destroying ActionCore singleton instance.')
    _actionCoreInstance.destroy()
    _actionCoreInstance = null
  }
}
