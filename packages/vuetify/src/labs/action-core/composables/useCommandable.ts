import { ref, watch, onUnmounted, computed, readonly, type WatchStopHandle, getCurrentInstance } from 'vue';
import type { ActionDefinition, ActionContext, ActionCorePublicAPI } from '../types';

/**
 * @file useCommandable.ts Composable to provide ActionCore integration logic for Vuetify components.
 */

export interface UseCommandableProps {
  command?: string | ActionDefinition;
  commandData?: any;
}

/**
 * Composable for Vuetify components to integrate with ActionCore.
 * It handles the `command` and `commandData` props, manages the lifecycle of inline actions,
 * and provides reactive state and an execution function.
 *
 * @param {UseCommandableProps} props - Component props including `command` and `commandData`.
 * @param {ActionCorePublicAPI | null} core - The injected ActionCore service instance (or null if not available).
 * @param {string} componentName - The name of the component using this composable (e.g., 'VBtn'), used for context.
 * @returns {object} Reactive properties and functions for command integration.
 * @property {ComputedRef<boolean>} isCommandable - True if ActionCore is available and integration is enabled for this component.
 * @property {ComputedRef<ActionDefinition | undefined>} commandAction - The resolved ActionDefinition if a command is active.
 * @property {(contextOverrides?: Partial<ActionContext>, domEvent?: Event) => Promise<void>} executeCommand - Function to execute the current command.
 * @property {Readonly<Ref<string | undefined>>} effectiveActionId - The ID of the action to be executed.
 */
export function useCommandable(
  props: UseCommandableProps,
  core: ActionCorePublicAPI | null,
  componentName: string
) {
  const commandDataProp = computed(() => props.commandData);

  let localActionSourceKey: symbol | null = null;
  const internalActionId = ref<string | undefined>(undefined);
  let unwatchCommandProp: WatchStopHandle | null = null;

  const isIntegrationEnabled = computed(() => core?.isComponentIntegrationEnabled(componentName) ?? false);

  const setupWatchers = () => {
    if (unwatchCommandProp) unwatchCommandProp();

    unwatchCommandProp = watch(
      () => props.command,
      (newCommand, oldCommand) => {
        if (isIntegrationEnabled.value && core) {
          const oldRegisteredSourceKey = localActionSourceKey;
          let newRegisteredSourceKey: symbol | null = null;
          let newEffectiveActionId: string | undefined = undefined;

          if (typeof newCommand === 'object' && newCommand?.id) {
            newEffectiveActionId = newCommand.id;
            newRegisteredSourceKey = core.registerActionsSource([newCommand]);
          } else if (typeof newCommand === 'string') {
            newEffectiveActionId = newCommand;
            // No new source key for string commands
          }
          // If newCommand is undefined, newEffectiveActionId is undefined, newRegisteredSourceKey is null

          // If there was a previously registered inline action (oldRegisteredSourceKey exists)
          // and it's different from any newly registered one (or no new one was registered),
          // then unregister the old one.
          if (oldRegisteredSourceKey && oldRegisteredSourceKey !== newRegisteredSourceKey) {
            core.unregisterActionsSource(oldRegisteredSourceKey);
          }

          internalActionId.value = newEffectiveActionId;
          localActionSourceKey = newRegisteredSourceKey; // Store the new key (or null)

        } else {
          clearWatchersAndState();
        }
      },
      { immediate: true, deep: true }
    );
  };

  const clearWatchersAndState = () => {
    if (unwatchCommandProp) {
      unwatchCommandProp();
      unwatchCommandProp = null;
    }
    if (localActionSourceKey && core) {
      core.unregisterActionsSource(localActionSourceKey);
      localActionSourceKey = null;
    }
    internalActionId.value = undefined;
  };

  watch(isIntegrationEnabled, (enabled) => {
    if (enabled && core) {
      setupWatchers();
    } else {
      clearWatchersAndState();
    }
  }, { immediate: true });

  if (getCurrentInstance()) {
    onUnmounted(() => {
      clearWatchersAndState();
    });
  }

  const action = computed<ActionDefinition | undefined>(() => {
    if (isIntegrationEnabled.value && core && internalActionId.value) {
      return core.getAction(internalActionId.value);
    }
    return undefined;
  });

  const execute = (contextOverrides?: Partial<ActionContext>, domEvent?: Event): Promise<void> => {
    if (isIntegrationEnabled.value && core && internalActionId.value) {
      const eventContext: ActionContext = {
        trigger: `component-${componentName.toLowerCase()}`,
        event: domEvent,
        data: commandDataProp.value,
        ...(contextOverrides || {}),
      };
      return core.executeAction(internalActionId.value, eventContext);
    }
    return Promise.resolve();
  };

  return {
    isCommandable: isIntegrationEnabled,
    commandAction: action,
    executeCommand: execute,
    effectiveActionId: readonly(internalActionId),
  };
}
