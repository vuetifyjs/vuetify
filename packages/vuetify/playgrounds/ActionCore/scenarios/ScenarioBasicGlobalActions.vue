<template>
  <scenario-card title="Basic Global Actions">
    <p>
      Hotkey:
      <VHotKey :hotkey="(Array.isArray(themeAction.hotkey) ? themeAction.hotkey[0] : themeAction.hotkey) || ''" />.
      Current theme: {{ currentThemeName }}
    </p>
    <v-btn command="toggle-theme">Toggle Theme via VBtn</v-btn>
  </scenario-card>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, inject } from 'vue'
import { useTheme } from 'vuetify'
import { type ActionDefinition, useActionCore, VHotKey } from '../../../src/labs/action-core'
import ScenarioCard from '../ScenarioCard.vue' // Path relative to this new component

const actionCore = useActionCore()
const theme = useTheme()
const logAction: any = inject('logAction')

const currentThemeName = computed(() => theme.global.name.value)

const themeAction: ActionDefinition = {
  id: 'toggle-theme',
  title: 'Toggle Theme',
  icon: 'mdi-theme-light-dark',
  hotkey: 'cmdorctrl+shift+t',
  description: 'Toggles between light and dark themes.',
  handler: () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    if (logAction) logAction(`Theme toggled to: ${theme.global.name.value}`)
  },
}

let sourceKey: symbol;
onMounted(() => {
  if (actionCore) {
    sourceKey = actionCore.registerActionsSource([themeAction]);
    if (logAction) logAction(`Registered: ${themeAction.title} (from ScenarioBasicGlobalActions)`)
  }
})

onUnmounted(() => {
  if (actionCore && sourceKey) {
    actionCore.unregisterActionsSource(sourceKey)
  }
})
</script>
