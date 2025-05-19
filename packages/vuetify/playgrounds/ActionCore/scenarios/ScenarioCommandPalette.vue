<template>
  <scenario-card title="Command Palette">
    <p>Hotkey: <VHotKey :hotkey="(Array.isArray(openPaletteActionDef.hotkey) ? openPaletteActionDef.hotkey[0] : openPaletteActionDef.hotkey) || ''" />.</p>
    <v-btn @click="() => actionCore.executeAction('open-command-palette')">Open Palette via VBtn</v-btn>
  </scenario-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, inject } from 'vue';
import { useActionCore, type ActionDefinition, VHotKey } from '@/labs/VActionCore';
import ScenarioCard from '../ScenarioCard.vue';

const actionCore = useActionCore();
const logAction: ((message: string, details?: any) => void) | undefined = inject('logAction');
const openPaletteProvided: (() => void) | undefined = inject('openPalette');

const openPaletteActionDef: ActionDefinition = {
  id: 'open-command-palette',
  title: 'Open Command Palette',
  icon: 'mdi-magnify',
  hotkey: 'meta+k',
  hotkeyOptions: { preventDefault: true },
  description: 'Opens the main command palette for searching actions.',
  handler: () => {
    if (openPaletteProvided) {
      openPaletteProvided();
    } else if (logAction) {
      logAction("Error: openPalette function not provided to ScenarioCommandPalette");
    }
  },
};

let sourceKey: symbol | undefined;
onMounted(() => {
  if (actionCore) {
    sourceKey = actionCore.registerActionsSource([openPaletteActionDef]);
    if (logAction) logAction(`Registered: ${String(openPaletteActionDef.title)} (from ScenarioCommandPalette)`);
  }
});

onUnmounted(() => {
  if (actionCore && sourceKey) {
    actionCore.unregisterActionsSource(sourceKey);
  }
});
</script>
