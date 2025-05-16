<template>
  <scenario-card title="Undo / Redo">
    <v-btn @click="doSomething" color="primary" class="mr-2">Perform Undoable Action</v-btn>
    <v-btn @click="undoSomething" color="secondary">Undo Last Action</v-btn>
  </scenario-card>
</template>

<script setup lang="ts">
import ScenarioCard from '../ScenarioCard.vue'
import { inject } from 'vue'
import { useActionCore } from '../../../src/labs/action-core'

const actionCore = useActionCore()
const logAction: ((message: string, details?: any) => void) | undefined = inject('logAction')

const doSomething = () => {
  if (actionCore) {
    actionCore.executeAction('do-something-undoable', { trigger: 'component-button' })
  }
}

const undoSomething = () => {
  if (actionCore) {
    actionCore.executeAction('undo-the-something', { trigger: 'component-button' })
  }
}
</script>
