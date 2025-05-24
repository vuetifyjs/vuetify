// Utilities
import { computed, getCurrentInstance, isRef, onScopeDispose, readonly, ref, shallowRef, watch } from 'vue'

// Types
import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { App } from 'vue'
import type {
  ActionContext,
  ActionCoreOptions as ActionCoreInstanceOptions,
  ActionCorePublicAPI,
  ActionDefinition,
  ActionsSource,
  RunInTextInputMatcher,
} from './types'
import { useKeyBindings, type KeyBindingConfig, type ShortcutConfig, type KeyBindingOptions } from './useKeyBindings'
import { IS_CLIENT, isPromise, log } from './utils'

/**
 * @file actionCore.ts The core logic for managing, registering, and executing actions,
 * integrating with `useKeyBindings` for hotkey support.
 */

const COMPONENT_NAME = 'ActionCore'

/**
 * Injection key for providing and injecting the ActionCore instance's public API.
 * @type {InjectionKey<ActionCorePublicAPI>}
 */
export const ActionCoreSymbol: InjectionKey<ActionCorePublicAPI> = Symbol.for('vuetify:action-core')

// Helper function for verbose logging if enabled
function verboseLog (instanceOptions: ActionCoreInstanceOptions, ...args: any[]) {
  if (instanceOptions.verboseLogging) {
    log('debug', COMPONENT_NAME, '[VERBOSE]', ...args)
  }
}

/**
 * Manages collections of actions, their hotkeys, and execution state.
 * It provides a centralized system for defining and triggering commands within an application.
 */
export class ActionCore implements ActionCorePublicAPI {
  /** Options passed to the ActionCore instance during construction. */
  private readonly options: ActionCoreInstanceOptions

  /** Reactive state indicating if any action is currently being executed. */
  public readonly isLoading: Readonly<Ref<boolean>>
  /** Internal mutable ref for isLoading state. */
  private _isLoading = ref(false)

  /** Shallow ref map of registered action sources. Key is a unique symbol, value is the ActionsSource. */
  private registeredSources = shallowRef<Map<symbol, ActionsSource>>(new Map())

  /** Stores the stop function returned by useKeyBindings to unregister all hotkeys. */
  private unregisterAllHotkeys: (() => void) | null = null

  /** Map to track pending async source resolutions */
  private pendingAsyncSources = new Map<symbol, Promise<ActionDefinition<any>[]>>()

  /** Internal mutable ref for the active profile name. */
  private _activeProfile = ref<string | null>(null)
  /** Public readonly ref for the active profile name. */
  public readonly activeProfile: Readonly<Ref<string | null>>

  /**
   * Computed property that aggregates all valid actions from all registered sources.
   * It deduplicates actions by ID (last one registered wins) and triggers hotkey processing.
   * These actions are the "effective" actions, potentially merged with profile overrides.
   * @type {ComputedRef<Readonly<ActionDefinition<any>[]>>}
   */
  public readonly allActions: ComputedRef<Readonly<ActionDefinition<any>[]>>

  /**
   * Creates an instance of ActionCore.
   * @param {ActionCoreInstanceOptions} [options={}] - Configuration options for this ActionCore instance.
   */
  constructor (options: ActionCoreInstanceOptions = {}) {
    this.options = { verboseLogging: false, ...options } // Initialize with default for verboseLogging
    this.isLoading = readonly(this._isLoading)
    this._activeProfile = ref<string | null>(null)
    this.activeProfile = readonly(this._activeProfile)

    if (this.options.verboseLogging) {
      log('info', COMPONENT_NAME, `Instance created with verbose logging enabled.`)
    } else {
      log('info', COMPONENT_NAME, `Instance created.`)
    }

    this.allActions = computed(() => {
      const currentProfileName = this._activeProfile.value
      verboseLog(this.options, `Computing allActions. Active profile: ${currentProfileName}`)

      const baseActions: ActionDefinition<any>[] = []
      for (const [sourceKey, source] of this.registeredSources.value.entries()) {
        let currentActionsFromSource: ActionDefinition<any>[] = []
        const sourceValue = isRef(source) ? source.value : source

        if (typeof sourceValue === 'function') {
          try {
            const result = (sourceValue as () => ActionDefinition<any>[] | Promise<ActionDefinition<any>[]>)()
            if (isPromise<ActionDefinition<any>[]>(result)) {
              if (!this.pendingAsyncSources.has(sourceKey)) {
                verboseLog(this.options, 'Processing async action source')
                const processAsyncResult = async () => {
                  try {
                    const resolvedActions = await result
                    if (this.registeredSources.value.has(sourceKey)) {
                      const newMap = new Map(this.registeredSources.value)
                      const filteredActions = Array.isArray(resolvedActions)
                        ? resolvedActions.filter(action => this.isBaseActionDefinitionValid(action))
                        : []
                      newMap.set(sourceKey, filteredActions)
                      this.registeredSources.value = newMap
                      verboseLog(this.options, `Async source resolved with ${filteredActions.length} base actions`)
                    }
                    return resolvedActions
                  } catch (error) {
                    log('error', COMPONENT_NAME, 'resolve async actions source', error)
                    return []
                  } finally {
                    this.pendingAsyncSources.delete(sourceKey)
                  }
                }
                this.pendingAsyncSources.set(sourceKey, processAsyncResult())
              }
              // While pending, use no actions from this source
              currentActionsFromSource = []
            } else {
              currentActionsFromSource = Array.isArray(result) ? result.filter(action => this.isBaseActionDefinitionValid(action)) : []
            }
          } catch (error) {
            log('error', COMPONENT_NAME, 'execute actions source function', error)
            currentActionsFromSource = []
          }
        } else if (Array.isArray(sourceValue)) {
          currentActionsFromSource = sourceValue.filter(action => this.isBaseActionDefinitionValid(action))
        }
        baseActions.push(...currentActionsFromSource)
      }

      const baseActionMap = new Map<string, ActionDefinition<any>>()
      baseActions.forEach(action => baseActionMap.set(action.id, action))

      const effectiveActions: ActionDefinition<any>[] = []
      for (const baseAction of baseActionMap.values()) {
        const effectiveAction = this.getEffectiveActionDefinition(baseAction, currentProfileName)
        if (this.isEffectiveActionDefinitionValid(effectiveAction)) {
          effectiveActions.push(effectiveAction)
        }
      }
      verboseLog(this.options, `Computed allActions. Total effective actions: ${effectiveActions.length}`)
      return Object.freeze(effectiveActions)
    })

    watch(this.allActions, (newActions) => {
      verboseLog(this.options, 'allActions changed, re-processing and registering hotkeys.')
      this.processAndRegisterHotkeys(newActions)
    }, { deep: true, immediate: true })
  }

  /**
   * Validates a base ActionDefinition (before profile merging).
   * It must have an ID.
   */
  private isBaseActionDefinitionValid (entry: any): entry is ActionDefinition<any> {
    const isValid = typeof entry === 'object' && entry !== null && typeof entry.id === 'string'
    if (!isValid && this.options.verboseLogging) {
        log('warn', COMPONENT_NAME, 'Invalid base action definition (missing ID):', entry)
    }
    return isValid
  }

  /**
   * Validates an effective ActionDefinition (after profile merging).
   * An action is valid if it has an ID and either a handler or subItems.
   */
  private isEffectiveActionDefinitionValid (entry: ActionDefinition<any>): boolean {
    const isValid = typeof entry.handler === 'function' || typeof entry.subItems === 'function'
     if (!isValid && this.options.verboseLogging) {
        log('warn', COMPONENT_NAME, `Invalid effective action definition (missing handler/subItems): ${entry.id}`, entry)
    }
    return isValid
  }

  /**
   * Applies profile overrides to a base action definition.
   */
  private getEffectiveActionDefinition (baseAction: ActionDefinition<any>, profileName: string | null): ActionDefinition<any> {
    if (profileName && baseAction.profiles && baseAction.profiles[profileName]) {
      const profileOverrides = baseAction.profiles[profileName]
      verboseLog(this.options, `Applying profile "${profileName}" to action "${baseAction.id}"`)

      let mergedMeta = { ...(baseAction.meta || {}) }
      if (profileOverrides.meta) {
        mergedMeta = { ...mergedMeta, ...profileOverrides.meta }
        if (baseAction.meta?.nested && typeof baseAction.meta.nested === 'object' &&
            profileOverrides.meta.nested && typeof profileOverrides.meta.nested === 'object' &&
            !Array.isArray(baseAction.meta.nested) && !Array.isArray(profileOverrides.meta.nested)) {
          mergedMeta.nested = { ...baseAction.meta.nested, ...profileOverrides.meta.nested }
        }
      }

      return {
        ...baseAction,
        ...profileOverrides,
        id: baseAction.id, // Ensure ID is not overridden
        profiles: baseAction.profiles, // Keep original profiles definition
        meta: mergedMeta,
      }
    }
    return baseAction
  }

  private getUsingInputForDefineShortcuts(runInTextInputRaw: ActionDefinition['runInTextInput']): string | boolean | undefined {
    if (typeof runInTextInputRaw === 'boolean' || typeof runInTextInputRaw === 'string') {
      return runInTextInputRaw;
    }
    if (typeof runInTextInputRaw === 'function' || Array.isArray(runInTextInputRaw) || runInTextInputRaw === 'only') {
      return true;
    }
    return undefined;
  }

  /**
   * Generates ShortcutsConfig for useKeyBindings based on the current actions.
   * @param {Readonly<ActionDefinition<any>[]>} actionsToProcess - The current list of actions.
   */
  private generateShortcutsConfig (actionsToProcess: Readonly<ActionDefinition<any>[]>): KeyBindingConfig {
    const shortcuts: KeyBindingConfig = {}
    verboseLog(this.options, `Generating ShortcutsConfig for ${actionsToProcess.length} actions.`)

    for (const actionDef of actionsToProcess) {
      if (actionDef.hotkey) {
        const hotkeyStrings = Array.isArray(actionDef.hotkey) ? actionDef.hotkey : [actionDef.hotkey]

        for (const hotkeyString of hotkeyStrings) {
          // Handle multiple bindings in one string, e.g., "ctrl+k, command+k"
          const individualBindings = hotkeyString.split(',').map(s => s.trim()).filter(s => s)

          for (const binding of individualBindings) {
            if (shortcuts[binding]) {
              log('warn', COMPONENT_NAME, `Duplicate hotkey binding "${binding}" for action "${actionDef.id}". Overwriting previous for action "${(shortcuts[binding] as any)?._actionId || 'unknown'}".`)
            }

            const handler = (event?: KeyboardEvent) => {
              // Retrieve the potentially profile-overridden action at execution time
              const currentAction = this.getAction(actionDef.id)
              if (!currentAction) {
                log('warn', COMPONENT_NAME, `Hotkey callback: Action '${actionDef.id}' not found at execution time.`)
                verboseLog(this.options, `Hotkey callback: Action '${actionDef.id}' not found at execution time.`)
                return
              }
              verboseLog(this.options, `Hotkey '${binding}' triggered for action '${currentAction.id}'. Evaluating...`)

              // 1. runInTextInput complex checks (function, array, 'only') handled here
              const { runInTextInput: currentRunInTextInput } = currentAction;
              if (typeof currentRunInTextInput === 'function' || Array.isArray(currentRunInTextInput) || currentRunInTextInput === 'only') {
                const activeElement = IS_CLIENT ? document.activeElement as HTMLElement | null : null;
                let allowExecution = false;
                if (typeof currentRunInTextInput === 'function') {
                  allowExecution = currentRunInTextInput(activeElement);
                } else if (currentRunInTextInput === 'only') {
                  allowExecution = !!(activeElement && (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName?.toUpperCase()) || activeElement.isContentEditable));
                } else if (Array.isArray(currentRunInTextInput)) {
                  allowExecution = currentRunInTextInput.some(matcher => {
                    if (activeElement && typeof activeElement.matches === 'function') {
                      return activeElement.matches(matcher) || (activeElement.closest && activeElement.closest(matcher) !== null);
                    }
                    return !!(activeElement && (activeElement as HTMLInputElement)?.name === matcher);
                  });
                }
                if (!allowExecution) {
                  verboseLog(this.options, `Action '${currentAction.id}': Hotkey blocked by runInTextInput (complex) evaluation.`);
                  return;
                }
              }
              // Simpler boolean/string runInTextInput are handled by useKeyBindings' `enabled` state for the shortcut itself.

              // 2. Disabled check
              if (currentAction.disabled === true || (isRef(currentAction.disabled) && currentAction.disabled.value)) {
                verboseLog(this.options, `Action '${currentAction.id}': Hotkey blocked because action.disabled.`)
                return
              }

              // 3. canExecute check
              const context: ActionContext = { trigger: 'hotkey', event }
              if (currentAction.canExecute) {
                try {
                  if (!currentAction.canExecute(context)) {
                    verboseLog(this.options, `Action '${currentAction.id}': Hotkey blocked because canExecute() returned false.`)
                    return
                  }
                } catch (e) {
                  log('error', COMPONENT_NAME, `Error in canExecute for "${currentAction.id}" by hotkey`, e)
                  return
                }
              }
              verboseLog(this.options, `Action '${currentAction.id}': All hotkey conditions passed. Executing action.`)
              this.executeAction(currentAction.id, context)
            }

            const { hotkeyOptions = {}, runInTextInput } = actionDef
            const shortcutUserConfig: ShortcutConfig = {
              handler,
              usingInput: this.getUsingInputForDefineShortcuts(runInTextInput),
              preventDefault: hotkeyOptions.preventDefault,
              stopPropagation: hotkeyOptions.stopPropagation,
            };
            (shortcutUserConfig as any)._actionId = actionDef.id;
            shortcuts[binding] = shortcutUserConfig
            verboseLog(this.options, `Prepared shortcut "${binding}" for action "${actionDef.id}" with usingInput:`, shortcutUserConfig.usingInput)
          }
        }
      }
    }
    return shortcuts
  }

  /**
   * Processes actions and (re)registers all hotkeys using useKeyBindings.
   */
  private processAndRegisterHotkeys (actionsToKeep: Readonly<ActionDefinition<any>[]>) {
    if (this.unregisterAllHotkeys) {
      verboseLog(this.options, 'Unregistering existing hotkeys before re-registration.')
      this.unregisterAllHotkeys()
      this.unregisterAllHotkeys = null
    }

    const shortcutsConfig = this.generateShortcutsConfig(actionsToKeep)

    if (Object.keys(shortcutsConfig).length > 0) {
      const defineShortcutsOpts: KeyBindingOptions = {}
      verboseLog(this.options, 'Calling useKeyBindings with config:', shortcutsConfig)
      this.unregisterAllHotkeys = useKeyBindings(shortcutsConfig, defineShortcutsOpts)
    } else {
      verboseLog(this.options, 'No hotkeys to register.')
    }
  }

  public registerActionsSource (source: ActionsSource): symbol {
    const key = Symbol('ActionSource')
    const newMap = new Map(this.registeredSources.value)
    newMap.set(key, source)
    this.registeredSources.value = newMap // This will trigger recomputation of allActions and hotkeys
    log('debug', COMPONENT_NAME, `Registered action source: ${key.toString()}`)
    return key
  }

  public unregisterActionsSource (key: symbol): boolean {
    const newMap = new Map(this.registeredSources.value)
    const deleted = newMap.delete(key)
    if (deleted) {
      this.registeredSources.value = newMap // This will trigger recomputation
      this.pendingAsyncSources.delete(key)
      log('debug', COMPONENT_NAME, `Unregistered action source: ${key.toString()}`)
    } else {
      log('warn', COMPONENT_NAME, `Attempted to unregister non-existent action source key: ${key.toString()}`)
    }
    return deleted
  }

  public getAction (actionId: string): ActionDefinition<any> | undefined {
    return this.allActions.value.find(action => action.id === actionId)
  }

  public async executeAction (actionId: string, invocationContext: ActionContext = {}): Promise<void> {
    const action = this.getAction(actionId) // Gets the effective (profiled) action
    if (!action) {
      log('error', COMPONENT_NAME, `execute action: Action with id "${actionId}" not found`)
      return
    }

    if (action.disabled === true || (isRef(action.disabled) && action.disabled.value)) {
      log('warn', COMPONENT_NAME, `Action "${actionId}" is disabled`)
      verboseLog(this.options, `Execution of action "${actionId}" blocked: action is disabled.`)
      return
    }

    const executionContext: ActionContext = { ...invocationContext }
    if (action.canExecute) {
      try {
        if (!action.canExecute(executionContext)) {
          log('warn', COMPONENT_NAME, `Action "${actionId}" cannot be executed due to canExecute returning false`, { context: executionContext })
          verboseLog(this.options, `Execution of action "${actionId}" blocked: canExecute() returned false.`)
          return
        }
      } catch (error: any) {
        log('error', COMPONENT_NAME, `canExecute check for action "${actionId}"`, error)
        verboseLog(this.options, `Execution of action "${actionId}" blocked: canExecute() threw an error.`, error)
        return
      }
    }

    if (typeof action.handler !== 'function') {
      if (typeof action.subItems === 'function') {
        log('debug', COMPONENT_NAME, `Action "${actionId}" is a group action, no direct handler called. SubItems might be used by UI.`)
        verboseLog(this.options, `Action "${actionId}" has subItems but no handler; not directly executable as a simple action.`)
        return
      }
      log('error', COMPONENT_NAME, `Action "${actionId}" has no handler or subItems to execute`)
      verboseLog(this.options, `Action "${actionId}" has no executable handler or subItems.`)
      return
    }

    this._isLoading.value = true
    try {
      verboseLog(this.options, `Executing handler for action: ${action.id}`, { context: executionContext })
      await action.handler(executionContext)
    } catch (error: any) {
      log('error', COMPONENT_NAME, `execute action "${actionId}"`, error)
    } finally {
      this._isLoading.value = false
    }
  }

  public destroy = () => {
    verboseLog(this.options, 'Destroying ActionCore instance')
    if (this.unregisterAllHotkeys) {
      this.unregisterAllHotkeys()
      this.unregisterAllHotkeys = null
    }
    this.pendingAsyncSources.clear()
    // Clear registeredSources, which should also clear allActions due to computed dependency
    this.registeredSources.value = new Map()
    this._activeProfile.value = null
    this._isLoading.value = false; // Reset loading state
    log('debug', COMPONENT_NAME, 'ActionCore instance destroyed')
  }

  public setActiveProfile (profileName: string | null): void {
    if (this._activeProfile.value !== profileName) {
      log('debug', COMPONENT_NAME, `Setting active profile to: ${profileName}`)
      this._activeProfile.value = profileName
      // Recomputation of allActions and hotkeys will be triggered by the watcher
    } else {
      log('debug', COMPONENT_NAME, `Profile already set to: ${profileName}, no change.`)
    }
  }
}

// Singleton management
let _actionCoreInstance: ActionCore | null = null

export function useActionCore (options?: ActionCoreInstanceOptions, app?: App): ActionCorePublicAPI {
  if (!_actionCoreInstance && IS_CLIENT) {
    log('debug', COMPONENT_NAME, 'Initializing new ActionCore singleton instance.', options)
    _actionCoreInstance = new ActionCore(options)
    if (getCurrentInstance()) {
      onScopeDispose(() => {
        // This log might be confusing if destroyActionCoreInstance is called explicitly before scope disposal
        if (_actionCoreInstance) { // Check if it hasn't been destroyed already
          log('debug', COMPONENT_NAME, 'ActionCore instance automatically disposed with component scope.')
          destroyActionCoreInstance()
        }
      })
    }
  } else if (!_actionCoreInstance) {
    // This block handles non-client or re-initialization scenarios
    if (!IS_CLIENT) {
      log('warn', COMPONENT_NAME, 'ActionCore accessed or initialized in a non-client environment. Hotkeys will be non-functional.')
    } else { // IS_CLIENT must be true here, but _actionCoreInstance was null (e.g. after explicit destroy)
      log('warn', COMPONENT_NAME, 'ActionCore singleton was previously destroyed or not initialized. Re-initializing.')
    }
    _actionCoreInstance = new ActionCore(options)
    // No onScopeDispose for re-initialization outside of a setup context here,
    // relies on explicit destroyActionCoreInstance or new useActionCore call with scope.
  }

  // Ensure an instance is always returned, even if it's a new one in SSR or after destruction.
  if (!_actionCoreInstance) {
      log('error', COMPONENT_NAME, 'ActionCore instance unexpectedly null after initialization attempts. Creating a fallback instance.');
      _actionCoreInstance = new ActionCore(options);
  }
  return _actionCoreInstance!
}

export function destroyActionCoreInstance (): void {
  if (_actionCoreInstance) {
    log('debug', COMPONENT_NAME, 'Explicitly destroying ActionCore singleton instance.')
    _actionCoreInstance.destroy()
    _actionCoreInstance = null
  } else {
    log('debug', COMPONENT_NAME, 'Attempted to destroy ActionCore instance, but no instance found.')
  }
}
