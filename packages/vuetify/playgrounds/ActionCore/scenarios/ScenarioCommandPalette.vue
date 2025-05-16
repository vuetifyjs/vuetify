<template>
  <scenario-card title="Command Palette">
    <p>Hotkey: Meta+K (Mac) / Ctrl+K (Win/Linux) - or your configured default (e.g., Ctrl+Shift+P).</p>
    <v-btn command="open-command-palette">Open Palette via VBtn</v-btn>
  </scenario-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, inject } from 'vue';
import { useActionCore, type ActionDefinition } from '../../../src/labs/action-core';
import ScenarioCard from '../ScenarioCard.vue';

const actionCore = useActionCore();
const logAction: ((message: string, details?: any) => void) | undefined = inject('logAction');
const openPaletteProvided: (() => void) | undefined = inject('openPalette');

const openPaletteActionDef: ActionDefinition = {
  id: 'open-command-palette',
  title: 'Open Command Palette', // Plain string title
  icon: 'mdi-magnify',
  hotkey: 'meta+k', // Defaulting to meta+k, can be overridden by user setup
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
    if (logAction) logAction(`Registered: ${openPaletteActionDef.title} (from ScenarioCommandPalette)`);
  }
});

onUnmounted(() => {
  if (actionCore && sourceKey) {
    actionCore.unregisterActionsSource(sourceKey);
  }
});
</script>
