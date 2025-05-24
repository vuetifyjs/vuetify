<template>
  <scenario-card title="Sequence Hotkey (Konami Code)">
    <p>Try the Konami Code: ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, B, A</p>
    <p class="text-caption mt-1"> (Note: May require clicking into the app/window first for key events to be captured if not already focused.) An alert will appear on success.</p>
  </scenario-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, inject } from 'vue'
import type { ActionDefinition } from '@/labs/VActionCore/archive'
import { ActionCoreSymbol } from '@/labs/VActionCore/archive'
import ScenarioCard from '../ScenarioCard.vue'

const logAction = inject<(message: string, details?: any) => void>('logAction')
const actionCore = inject(ActionCoreSymbol)

const konamiAction: ActionDefinition = {
  id: 'konami',
  title: 'Konami Code!',
  hotkey: 'arrowup-arrowup-arrowdown-arrowdown-arrowleft-arrowright-arrowleft-arrowright-b-a',
  description: 'The classic cheat code.',
  hotkeyOptions: { preventDefault: true },
  handler: () => {
    if (logAction) logAction('KONAMI CODE ACTIVATED! +30 Lives!')
    alert('Konami Code Activated!')
  }
}

let scenario7SourceKey: symbol | undefined;

onMounted(() => {
  if (actionCore) {
    scenario7SourceKey = actionCore.registerActionsSource([konamiAction]);
    if (logAction) logAction(`Registered: ${konamiAction.title} (from ScenarioSequenceHotkey component)`);
  }
})

onUnmounted(() => {
  if (actionCore && scenario7SourceKey) {
    actionCore.unregisterActionsSource(scenario7SourceKey);
    if (logAction) logAction(`Unregistered: ${konamiAction.title} (from ScenarioSequenceHotkey component)`);
  }
})
</script>
