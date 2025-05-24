<template>
  <scenario-card title="Programmatic Execution">
    <p>The action "Programmatic Action" is globally registered. Click the button to trigger it via its ID from this component.</p>
    <v-btn @click="triggerIt" color="deep-purple-accent-2">Trigger "prog-action"</v-btn>
  </scenario-card>
</template>

<script setup lang="ts">
import ScenarioCard from '../ScenarioCard.vue'
import { inject, onMounted, onUnmounted } from 'vue'
import { type ActionDefinition, ActionCoreSymbol } from '@/labs/VActionCore/archive'

const actionCore = inject(ActionCoreSymbol)
const logAction = inject<(message: string, details?: any) => void>('logAction')

const programmaticActionDef: ActionDefinition = {
  id: 'prog-action',
  title: 'Programmatic Action',
  icon: 'mdi-play-circle-outline',
  description: 'An action meant to be called by code.',
  handler: (ctx) => {
    if (logAction) logAction('Programmatic Action Triggered (PROGRAMMATIC SCENARIO HANDLER)', { context: ctx });
  }
}

let scenario10SourceKey: symbol | undefined;

onMounted(() => {
  if (actionCore) {
    scenario10SourceKey = actionCore.registerActionsSource([programmaticActionDef]);
    if (logAction) logAction(`Registered: ${programmaticActionDef.title} (from ScenarioProgrammaticExecution component)`);
  }
})

onUnmounted(() => {
  if (actionCore && scenario10SourceKey) {
    actionCore.unregisterActionsSource(scenario10SourceKey);
    if (logAction) logAction(`Unregistered: ${programmaticActionDef.title} (from ScenarioProgrammaticExecution component)`);
  }
})

const triggerIt = () => {
  if (actionCore) {
    actionCore.executeAction('prog-action', {
      trigger: 'component-button-programmatic-scenario',
      data: { from: 'ScenarioProgrammaticExecutionComponent' }
    })
    // The handler for 'prog-action' in Playground.actionCore.vue will log the execution.
  } else {
    if (logAction) logAction('ActionCore not available in ScenarioProgrammaticExecution')
  }
}
</script>
