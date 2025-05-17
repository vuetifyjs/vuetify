<template>
  <scenario-card title="Context Menu Actions">
    <p>Select an item and choose an action:</p>
    <v-list density="compact">
      <v-list-item v-for="item in items" :key="item.id">
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <template #append>
          <v-btn
            icon="mdi-dots-vertical"
            @click="showContextMenu(item)"
            density="compact"
            aria-label="Open context menu"
            aria-haspopup="true"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </scenario-card>
</template>

<script setup lang="ts">
import { ref, inject, onMounted, onUnmounted } from 'vue'
import ScenarioCard from '../ScenarioCard.vue'
import { type ActionDefinition, ActionCoreSymbol } from '@/labs/action-core'

const actionCore = inject(ActionCoreSymbol)
type LogActionFn = (message: string, details?: any) => void
const logAction = inject<LogActionFn>('logAction')

// --- Logic moved from Playground.actionCore.vue ---
const editItemAction: ActionDefinition = {
  id: 'ctx-edit-item',
  title: 'Edit Item',
  icon: 'mdi-pencil',
  description: 'Edit the selected item (contextual).',
  handler: (ctx) => { if (logAction) logAction('Context Menu: Edit Item triggered for', ctx?.data); }
}

const deleteItemAction: ActionDefinition = {
  id: 'ctx-delete-item',
  title: 'Delete Item',
  icon: 'mdi-delete',
  description: 'Delete the selected item (contextual).',
  handler: (ctx) => { if (logAction) logAction('Context Menu: Delete Item triggered for', ctx?.data); }
}

let scenario14SourceKey: symbol | undefined;

onMounted(() => {
  if (actionCore) {
    scenario14SourceKey = actionCore.registerActionsSource([editItemAction, deleteItemAction]);
    if (logAction) logAction('Registered: Context Menu Actions (from ScenarioContextMenu component)');
  }
})

onUnmounted(() => {
  if (actionCore && scenario14SourceKey) {
    actionCore.unregisterActionsSource(scenario14SourceKey);
    if (logAction) logAction('Unregistered: Context Menu Actions (from ScenarioContextMenu component)');
  }
})
// --- End of moved logic ---

const items = ref([
  { id: 1, name: 'Alpha Document' },
  { id: 2, name: 'Beta Spreadsheet' },
])

interface Item {
  id: number
  name: string
  [key: string]: any // For any additional properties
}

const showContextMenu = (item: Item) => {
   if (logAction) logAction(`Simulated context menu for: ${item.name}. You would typically show a VMenu here with actions like Edit and Delete.`)
   // For this playground, we'll just log and offer a way to trigger them if they were in a menu.
   // For example, if a user clicked "Edit" in a real context menu:
   // actionCore.executeAction('ctx-edit-item', { trigger: 'context-menu', data: item })
   // Or for "Delete":
   // actionCore.executeAction('ctx-delete-item', { trigger: 'context-menu', data: item })

   // The buttons in the template could be modified to execute these directly if desired for quick demo,
   // or a more complex VMenu could be built that uses actionCore.getAvailableActions(context) for example.
}
</script>
