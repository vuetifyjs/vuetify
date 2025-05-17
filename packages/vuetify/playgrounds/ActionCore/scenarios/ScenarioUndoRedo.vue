<template>
  <scenario-card title="Undo / Redo">
    <p>Click the button below. The "Undo Last Action" can also be triggered with <VHotKey :hotkey="(Array.isArray(undoSomethingAction.hotkey) ? undoSomethingAction.hotkey[0] : undoSomethingAction.hotkey) || ''" />.</p>
    <v-btn @click="doSomething" color="primary" class="mr-2">Perform Undoable Action</v-btn>
    <v-btn @click="undoSomething" color="secondary" :disabled="!canUndo">Undo Last Action</v-btn>
  </scenario-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject, computed } from 'vue'
import ScenarioCard from '../ScenarioCard.vue'
import { useActionCore, type ActionDefinition, type ActionContext, VHotKey } from '../../../src/labs/action-core'

const actionCore = useActionCore()
const logAction: ((message: string, details?: any) => void) | undefined = inject('logAction')

// Local state for this scenario's undo capability
const lastActionData = ref<any>(null)
const canUndo = computed(() => !!lastActionData.value)

// Define actions here to access their hotkey in the template
const doSomethingAction: ActionDefinition = {
  id: 'do-something-undoable',
  title: 'Perform Undoable Action',
  icon: 'mdi-target-variant',
  description: 'Performs an action that can be "undone".',
  meta: { undoActionId: 'undo-the-something' }, // Meta for external undo manager if used
  handler: (ctx?: ActionContext) => {
    const data = { item: `Item ${Date.now()}`, previousState: Math.random() > 0.5 ? 'State A' : 'State B' }
    if (logAction) logAction('Performed undoable action:', data)
    lastActionData.value = data // This component manages its own undo state for the POC
  }
}

const undoSomethingAction: ActionDefinition = {
  id: 'undo-the-something',
  title: 'Undo Last Action',
  hotkey: 'ctrl+z',
  icon: 'mdi-undo-variant',
  description: 'Undoes the last "Perform Undoable Action".',
  hotkeyOptions: { preventDefault: true },
  canExecute: () => canUndo.value, // ActionCore will respect this
  handler: () => {
    if (logAction) logAction('Undoing action. Previous data was:', lastActionData.value)
    lastActionData.value = null
  }
}

let sourceKey: symbol | undefined
onMounted(() => {
  if (actionCore) {
    sourceKey = actionCore.registerActionsSource([doSomethingAction, undoSomethingAction])
    if (logAction) logAction('Registered: Undo/Redo Actions (from ScenarioUndoRedo)')
  }
})

onUnmounted(() => {
  if (actionCore && sourceKey) {
    actionCore.unregisterActionsSource(sourceKey)
  }
})

// Methods called by buttons, which trigger globally registered actions by ID
const doSomething = () => {
  if (actionCore) {
    actionCore.executeAction(doSomethingAction.id, { trigger: 'component-button' })
  }
}

const undoSomething = () => {
  if (actionCore) {
    actionCore.executeAction(undoSomethingAction.id, { trigger: 'component-button' })
  }
}
</script>
