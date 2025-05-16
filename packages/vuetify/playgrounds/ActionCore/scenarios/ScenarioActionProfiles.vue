<template>
  <scenario-card title="Action Profiles (Beginner vs Advanced)">
    <p>Select mode to change active save action:</p>
    <v-btn-toggle v-model="currentMode" class="mb-2" density="compact" divided>
      <v-btn value="beginner">Beginner</v-btn>
      <v-btn value="advanced">Advanced</v-btn>
    </v-btn-toggle>
    <p class="text-caption">Try pressing the hotkey shown in the current profile to observe different behaviors.</p>
  </scenario-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject, watch } from 'vue'
import ScenarioCard from '../ScenarioCard.vue'
import { useActionCore, type ActionDefinition } from '../../../src/labs/action-core'

const actionCore = useActionCore()
const logAction: ((message: string, details?: any) => void) | undefined = inject('logAction')

const currentMode = ref<'beginner' | 'advanced'>('beginner')
let activeProfileKey: symbol | null = null

const beginnerSaveAction: ActionDefinition = {
  id: 'beginner-save',
  title: 'Simple Save',
  hotkey: 'ctrl+s',
  meta: { mode: 'beginner' },
  handler: () => {
    if (logAction) logAction('Beginner Save (Ctrl+S) done')
  },
}

const advancedSaveAction: ActionDefinition = {
  id: 'advanced-save',
  title: 'Advanced Save + Commit',
  hotkey: 'ctrl+shift+s',
  meta: { mode: 'advanced' },
  handler: () => {
    if (logAction) logAction('Advanced Save and Commit (Ctrl+Shift+S) done')
  },
}

const applyProfile = (mode: 'beginner' | 'advanced') => {
  if (activeProfileKey && actionCore) {
    actionCore.unregisterActionsSource(activeProfileKey)
  }
  if (!actionCore) return
  if (mode === 'beginner') {
    activeProfileKey = actionCore.registerActionsSource([beginnerSaveAction])
  } else {
    activeProfileKey = actionCore.registerActionsSource([advancedSaveAction])
  }
  if (logAction) logAction(`Mode set to: ${mode}. Relevant hotkeys now active.`)
}

watch(currentMode, (val) => applyProfile(val))

onMounted(() => {
  applyProfile(currentMode.value)
  if (logAction) logAction('Registered: Profile-based Save Actions (from ScenarioActionProfiles)')
})

onUnmounted(() => {
  if (activeProfileKey && actionCore) actionCore.unregisterActionsSource(activeProfileKey)
})
</script>
