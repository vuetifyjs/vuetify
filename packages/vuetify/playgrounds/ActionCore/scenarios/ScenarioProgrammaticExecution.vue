<template>
  <scenario-card title="Programmatic Execution">
    <p>The action "Programmatic Action" is globally registered. Click the button to trigger it via its ID from this component.</p>
    <v-btn @click="triggerIt" color="deep-purple-accent-2">Trigger "prog-action"</v-btn>
  </scenario-card>
</template>

<script setup lang="ts">
import ScenarioCard from '../ScenarioCard.vue'
import { inject } from 'vue'
import { useActionCore } from '../../../src/labs/action-core'

const actionCore = useActionCore()
const logAction: ((message: string, details?: any) => void) | undefined = inject('logAction')

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
