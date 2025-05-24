<template>
  <ScenarioCard title="Active Hotkeys Display">
    <template #subtitle>
      Lists all registered actions that have hotkeys and their current status. This list is reactive to action registrations/unregistrations and profile changes.
    </template>
    <v-list-item v-if="!actionCore">
      <v-list-item-title class="text-error">ActionCore not available.</v-list-item-title>
    </v-list-item>
    <v-list lines="three" density="compact" v-else-if="hotkeyedActions.length > 0">
      <template v-for="(action, index) in hotkeyedActions" :key="action.id">
        <v-list-item>
          <v-list-item-title>
            {{ action.title }}
            <v-chip
              v-if="(typeof action.disabled === 'boolean' ? action.disabled : action.disabled?.value) || !action.resolvedCanExecute"
              color="grey"
              size="x-small"
              variant="tonal"
              class="ml-2"
            >
              Disabled
            </v-chip>
          </v-list-item-title>
          <v-list-item-subtitle>
            ID: <code>{{ action.id }}</code>
            <div v-if="action.description" class="text-caption mt-1 text-medium-emphasis">{{ action.description }}</div>
          </v-list-item-subtitle>

          <template #append>
            <div class="d-flex flex-column align-end">
              <VHotKey v-for="hk in action.hotkeyArray" :key="hk" :hotkey="hk" class="my-1" />
            </div>
          </template>
        </v-list-item>
        <v-divider v-if="index < hotkeyedActions.length - 1" />
      </template>
    </v-list>
    <v-list-item v-else>
      <v-list-item-title>No actions with hotkeys are currently registered.</v-list-item-title>
    </v-list-item>
  </ScenarioCard>
</template>

<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'
import { ActionCoreSymbol, type ActionDefinition, type ActionCorePublicAPI } from '@/labs/VActionCore/archive'
import ScenarioCard from '../ScenarioCard.vue'
import { VHotKey } from '@/labs/VActionCore/archive/components/VHotKey/VHotKey'

const actionCore = inject(ActionCoreSymbol) as ActionCorePublicAPI | null

// Changed to intersection type
type DisplayableHotkeyAction = ActionDefinition & {
  title: string; // Explicitly state title is resolved to string here
  resolvedCanExecute: boolean;
  hotkeyArray: string[];
  // disabled property is inherited from ActionDefinition (boolean | Ref<boolean> | undefined)
}

const hotkeyedActions = computed<DisplayableHotkeyAction[]>(() => {
  if (!actionCore) return []
  return actionCore.allActions.value
    .filter((action: Readonly<ActionDefinition>) => action.hotkey && (Array.isArray(action.hotkey) ? action.hotkey.length > 0 : action.hotkey))
    .map((action: Readonly<ActionDefinition>) => {
      let canExecuteValue = true
      const isDisabledByRefOrValue = typeof action.disabled === 'boolean' ? action.disabled : (action.disabled?.value ?? false);

      if (!isDisabledByRefOrValue && typeof action.canExecute === 'function') {
        try {
          canExecuteValue = action.canExecute({ trigger: 'hotkey-display' })
        } catch (e) {
          console.warn(`[ScenarioActiveHotkeys] Error evaluating canExecute for action "${action.id}":`, e)
          canExecuteValue = false
        }
      } else if (isDisabledByRefOrValue) {
        canExecuteValue = false
      }

      const hotkeyArray = Array.isArray(action.hotkey) ? action.hotkey : (action.hotkey ? [action.hotkey] : [])
      const displayTitle = typeof action.title === 'string' ? action.title : (action.title as Ref<string>)?.value ?? 'Untitled Action';

      return {
        ...(action as ActionDefinition),
        title: displayTitle, // Override with resolved string title
        // disabled is carried from original action (can be boolean | Ref<boolean> | undefined)
        resolvedCanExecute: canExecuteValue,
        hotkeyArray: hotkeyArray,
      } as DisplayableHotkeyAction
    })
    .sort((a: DisplayableHotkeyAction, b: DisplayableHotkeyAction) => a.title.localeCompare(b.title)) // a.title and b.title are now strings
})

// Optional: log when the component is mounted or when the list of actions changes
// import { onMounted, watch } from 'vue'
// const log = inject('logAction') as ((message: string, details?: any) => void) | undefined
// onMounted(() => {
//   if (log) {
//     log('ScenarioActiveHotkeys mounted', { count: hotkeyedActions.value.length })
//   }
// })
// watch(hotkeyedActions, (newList) => {
//   if (log) {
//     log('ScenarioActiveHotkeys list updated', { count: newList.length })
//   }
// })

</script>

<style scoped>
code {
  font-family: monospace;
  background-color: rgba(var(--v-theme-on-surface), 0.05);
  padding: 0.1em 0.3em;
  border-radius: 3px;
  font-size: 0.9em;
}
.v-list-item-subtitle code {
  font-size: 0.85em;
}
.text-medium-emphasis {
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}
</style>
