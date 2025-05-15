import { ref, computed, shallowRef, onScopeDispose, isRef, readonly, getCurrentInstance } from 'vue';
import type { Ref, ComputedRef, InjectionKey } from 'vue';
import { useKeyBindings } from './useKeyBindings';
import type { ActionDefinition, ActionContext, ActionsSource, RunInTextInputMatcher, KeyBindingHandlerOptions } from './types';
import { IS_CLIENT, IS_MAC } from './platform'; // UPDATED IMPORT

const commandCoreLogPrefix = '[CommandCore]';
const commandCoreDebug = (...args: any[]) => console.debug(commandCoreLogPrefix, ...args);
const commandCoreWarn = (...args: any[]) => console.warn(commandCoreLogPrefix, ...args);
const commandCoreError = (...args: any[]) => console.error(commandCoreLogPrefix, ...args);

export interface CommandCoreOptions {
  // Future options for CommandCore can be added here
  // For example, default keybinding options or action processing rules
}

export const CommandCoreSymbol: InjectionKey<CommandCore> = Symbol.for('vuetify:command-core');

class CommandCore {
  public readonly isLoading: Readonly<Ref<boolean>>;
  private _isLoading = ref(false);

  private registeredSources = shallowRef<Map<symbol, ActionsSource>>(new Map());
  private actionHotkeysUnregisterMap = new Map<string, (() => void)[]>();
  private keyBindings: ReturnType<typeof useKeyBindings>;

  public readonly allActions: ComputedRef<Readonly<ActionDefinition<any>[]>>;

  constructor(options: CommandCoreOptions = {}) {
    this.isLoading = readonly(this._isLoading);
    this.keyBindings = useKeyBindings();

    this.allActions = computed(() => {
      const actions: ActionDefinition<any>[] = [];
      for (const source of this.registeredSources.value.values()) {
        let currentActionsFromSource: ActionDefinition<any>[] = [];
        const sourceValue = isRef(source) ? source.value : source;
        if (typeof sourceValue === 'function') {
          try {
            const result = (sourceValue as () => ActionDefinition<any>[] | Promise<ActionDefinition<any>[]>)();
            if (result && typeof (result as Promise<ActionDefinition<any>[]>).then === 'function') {
              commandCoreWarn('Asynchronous action source functions are not fully supported for immediate availability...');
              (result as Promise<ActionDefinition<any>[]>).then(resolvedActions => {
                commandCoreDebug('Async source resolved. Manual source update might be needed.');
              }).catch(error => {
                commandCoreError('Error resolving async actions source:', error);
              });
              currentActionsFromSource = [];
            } else {
              currentActionsFromSource = Array.isArray(result) ? result.filter(this.isActionDefinition) : [];
            }
          } catch (error) {
            commandCoreError('Error executing actions source function:', error);
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

  private isActionDefinition(entry: any): entry is ActionDefinition<any> {
    return typeof entry === 'object' && entry !== null && typeof entry.id === 'string' &&
           (typeof entry.handler === 'function' || typeof entry.subItems === 'function');
  }

  private processAndRegisterHotkeys(actionsToKeep: Readonly<ActionDefinition<any>[]>) {
    const actionIdsToKeep = new Set(actionsToKeep.map(action => action.id));
    this.actionHotkeysUnregisterMap.forEach((unregisterFns, actionId) => {
      if (!actionIdsToKeep.has(actionId)) {
        commandCoreDebug(`Unregistering all hotkeys for removed action ID: ${actionId}`);
        unregisterFns.forEach(fn => fn());
        this.actionHotkeysUnregisterMap.delete(actionId);
      }
    });

    for (const currentActionDef of actionsToKeep) {
      const existingUnregisterFns = this.actionHotkeysUnregisterMap.get(currentActionDef.id);
      if (existingUnregisterFns) {
        commandCoreDebug(`Re-registering: Unregistering old hotkeys for action ID: ${currentActionDef.id}`);
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
                  commandCoreDebug(`Hotkey "${binding}" for disabled action "${action.id}" ignored.`);
                  return;
                }
                const activeElement = IS_CLIENT ? document.activeElement : null;
                const isGenerallyInputFocused = activeElement &&
                                              (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName?.toUpperCase()) ||
                                              (activeElement as HTMLElement).isContentEditable);
                const matcher = action.runInTextInput;
                if (matcher === 'only') { if (!isGenerallyInputFocused) { commandCoreDebug(`Hotkey "${binding}" for action "${action.id}" (runInTextInput: 'only') ignored; general input not focused.`); return; } }
                else if (typeof matcher === 'string') { if (!isGenerallyInputFocused || (activeElement as HTMLInputElement)?.name !== matcher) { commandCoreDebug(`Hotkey "${binding}" for action "${action.id}" (runInTextInput: "${matcher}") ignored; input name mismatch or not focused.`); return; } }
                else if (Array.isArray(matcher)) { if (!isGenerallyInputFocused || !matcher.includes((activeElement as HTMLInputElement)?.name)) { commandCoreDebug(`Hotkey "${binding}" for action "${action.id}" (runInTextInput: [${matcher.join(',')}]) ignored; input name mismatch or not focused.`); return; } }
                else if (typeof matcher === 'function') { if (!matcher(activeElement as Element)) { commandCoreDebug(`Hotkey "${binding}" for action "${action.id}" (runInTextInput: custom function) ignored; predicate returned false.`); return; } }
                const context: ActionContext = { trigger: 'hotkey', event };
                if (action.canExecute) {
                  try {
                    if (!action.canExecute(context)) {
                      commandCoreDebug(`Hotkey "${binding}" for action "${action.id}" ignored; canExecute returned false.`); return;
                    }
                  } catch (e) { commandCoreError(`Error in canExecute for action "${action.id}" triggered by hotkey "${binding}"`, e); return; }
                }

                commandCoreDebug(`Hotkey "${binding}" executing action "${action.id}"`);
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

  public registerActionsSource(source: ActionsSource): symbol {
    const key = Symbol('ActionSource');
    const newMap = new Map(this.registeredSources.value);
    newMap.set(key, source);
    this.registeredSources.value = newMap;
    commandCoreDebug(`Registered action source:`, key);
    return key;
  }

  public unregisterActionsSource(key: symbol): boolean {
    const newMap = new Map(this.registeredSources.value);
    const deleted = newMap.delete(key);
    if (deleted) {
      this.registeredSources.value = newMap;
      commandCoreDebug(`Unregistered action source:`, key);
    } else {
      commandCoreWarn(`Attempted to unregister non-existent action source key:`, key);
    }
    return deleted;
  }

  public getAction(actionId: string): ActionDefinition<any> | undefined {
    return this.allActions.value.find(action => action.id === actionId);
  }

  public async executeAction(actionId: string, invocationContext: ActionContext = {}): Promise<void> {
    const action = this.getAction(actionId);
    if (!action) {
      commandCoreError(`Failed to execute action: Action with id "${actionId}" not found.`);
      return;
    }
    if (action.disabled === true || (isRef(action.disabled) && action.disabled.value === true)) {
      commandCoreWarn(`Action "${actionId}" is disabled.`);
      return;
    }
    const executionContext: ActionContext = { ...invocationContext };
    if (action.canExecute) {
      try {
        if (!action.canExecute(executionContext)) {
          commandCoreWarn(`Action "${actionId}" cannot be executed due to canExecute returning false.`, { context: executionContext });
          return;
        }
      } catch (error: any) {
        commandCoreError(`Error during canExecute check for action "${actionId}"`, error, { context: executionContext });
        return;
      }
    }
    if (typeof action.handler !== 'function') {
      if (typeof action.subItems === 'function') {
        commandCoreDebug(`Action "${actionId}" is a group action, no direct handler called. SubItems might be used by UI.`);
        return;
      }
      commandCoreError(`Action "${actionId}" has no handler or subItems to execute.`);
      return;
    }
    this._isLoading.value = true;
    try {
      commandCoreDebug(`Executing handler for action: ${action.id}`);
      await action.handler(executionContext);
    } catch (error: any) {
      commandCoreError(`Error executing action "${actionId}"`, error, { context: executionContext });
    } finally {
      this._isLoading.value = false;
    }
  }

  public destroy = () => {
    commandCoreDebug('Destroying CommandCore instance');
    this.keyBindings.stop();
    this.actionHotkeysUnregisterMap.forEach(fns => fns.forEach(fn => fn()));
    this.actionHotkeysUnregisterMap.clear();
    const newMap = new Map();
    this.registeredSources.value = newMap;
  };
}

let _commandCoreInstance: CommandCore | null = null;

export function useCommandCore(options?: CommandCoreOptions): CommandCore {
  if (!_commandCoreInstance && IS_CLIENT) {
    _commandCoreInstance = new CommandCore(options);
    if (getCurrentInstance()) {
      onScopeDispose(() => {
        destroyCommandCoreInstance();
      });
    }
  } else if (!_commandCoreInstance) {
    commandCoreWarn('CommandCore accessed in a non-client environment without prior client-side initialization. Features might be limited.');
    _commandCoreInstance = new CommandCore(options);
  }
  return _commandCoreInstance!;
}

export function destroyCommandCoreInstance() {
  if (_commandCoreInstance) {
    _commandCoreInstance.destroy();
    _commandCoreInstance = null;
  }
}

// utils.ts (Needs to be created)
/*
export const IS_CLIENT = typeof window !== 'undefined';
export const IS_MAC = IS_CLIENT && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
*/
