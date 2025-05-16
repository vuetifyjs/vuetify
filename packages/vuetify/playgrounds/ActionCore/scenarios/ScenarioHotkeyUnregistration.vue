<template>
  <scenario-card title="Hotkey Unregistration">
    <p>Demonstrates registering/unregistering a temporary action (Alt+T).</p>
    <v-btn @click="registerTemp" color="success" class="mr-2" :disabled="!!tempSourceKey">Register Temp Action</v-btn>
    <v-btn @click="unregisterTemp" color="error" :disabled="!tempSourceKey">Unregister Temp Action</v-btn>
  </scenario-card>
</template>

<script setup lang="ts">
import { ref, onUnmounted, inject } from 'vue'
import ScenarioCard from '../ScenarioCard.vue'
import { useActionCore, type ActionDefinition } from '../../../src/labs/action-core'

const actionCore = useActionCore()
const logAction: ((message: string, details?: any) => void) | undefined = inject('logAction')

const tempActionDef: ActionDefinition = {
  id: 'temp-action',
  title: 'Temporary Action (Alt+T)',
  hotkey: 'alt+t',
  description: 'This action can be registered and unregistered dynamically.',
  handler: () => {
    if (logAction) logAction('Temporary Action (Alt+T) Executed!')
  },
}

const tempSourceKey = ref<symbol | null>(null)

const registerTemp = () => {
  if (!tempSourceKey.value && actionCore) {
    tempSourceKey.value = actionCore.registerActionsSource([tempActionDef])
    if (logAction) logAction('Temporary action registered (Alt+T active)')
  }
}

const unregisterTemp = () => {
  if (tempSourceKey.value && actionCore) {
    actionCore.unregisterActionsSource(tempSourceKey.value)
    if (logAction) logAction('Temporary action unregistered (Alt+T inactive)')
    tempSourceKey.value = null
  }
}

onUnmounted(() => {
  if (tempSourceKey.value) unregisterTemp()
})
</script>
