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
import { ref, inject } from 'vue'
import ScenarioCard from '../ScenarioCard.vue'
import { useActionCore } from '../../../src/labs/action-core'

const actionCore = useActionCore()
type LogActionFn = (message: string, details?: any) => void
const logAction = inject<LogActionFn>('logAction')

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
   if (logAction) logAction(`Simulated context menu for: ${item.name}`)
   // In a real app we would open a VMenu or similar; here we just provide quick triggers
  try {
    actionCore.executeAction('ctx-edit-item', { trigger: 'context-menu-sim', data: item })
  } catch (error) {
    console.error('Failed to execute context menu action:', error)
    if (logAction) logAction(`Error executing action for: ${item.name}`, error)
  }
}
</script>
