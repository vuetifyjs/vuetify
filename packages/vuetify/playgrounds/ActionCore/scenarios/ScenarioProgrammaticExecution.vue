<template>
  <scenario-card title="Programmatic Execution">
    <p>The "Programmatic Action" can be triggered via code or by using the button below.</p>
    <v-btn @click="triggerProgrammatic" color="primary">Trigger Programmatically</v-btn>
  </scenario-card>
</template>

<script setup lang="ts">
import ScenarioCard from '../ScenarioCard.vue'
import { inject } from 'vue'
import { useActionCore } from '../../../src/labs/action-core'

const actionCore = useActionCore()
const logAction: ((message: string, details?: any) => void) | undefined = inject('logAction')

const triggerProgrammatic = () => {
  if (actionCore) {
    actionCore.executeAction('prog-action', { trigger: 'programmatic-component', data: { source: 'ScenarioProgrammaticExecution' } })
    if (logAction) logAction('Programmatic action triggered from component')
  }
}
</script>
