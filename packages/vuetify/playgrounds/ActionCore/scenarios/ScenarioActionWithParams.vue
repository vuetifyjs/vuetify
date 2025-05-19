<template>
  <scenario-card title="Action With Params">
    <p>Action "Open File by Name..." is in palette. It will prompt if no param.</p>
    <v-btn @click="triggerWithParamInternal" color="info" class="mr-2">Execute with Param ('budget.xlsx')</v-btn>
    <v-btn @click="() => actionCore.executeAction('open-file-with-param')">Execute from Palette (will prompt)</v-btn>
  </scenario-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, inject } from 'vue';
import { useActionCore, type ActionDefinition, type ActionContext } from '../../../src/labs/VActionCore';
import ScenarioCard from '../ScenarioCard.vue';

const actionCore = useActionCore();
const logAction: ((message: string, details?: any) => void) | undefined = inject('logAction');

const openFileAction: ActionDefinition = {
  id: 'open-file-with-param',
  title: 'Open File by Name...',
  icon: 'mdi-file-find',
  description: 'Opens a file. Can be passed a name or will prompt.',
  handler: (ctx?: ActionContext) => {
    const fileName = ctx?.data?.fileName || prompt('Enter filename to open (try "example.doc"):');
    if (fileName) {
      if (logAction) logAction('Opening file (from param/prompt):', fileName);
    } else {
      if (logAction) logAction('File open cancelled or no name provided.');
    }
  }
};

let sourceKey: symbol | undefined;
onMounted(() => {
  if (actionCore) {
    sourceKey = actionCore.registerActionsSource([openFileAction]);
    if (logAction) logAction(`Registered: ${String(openFileAction.title)} (from ScenarioActionWithParams)`);
  }
});

onUnmounted(() => {
  if (actionCore && sourceKey) {
    actionCore.unregisterActionsSource(sourceKey);
  }
});

const triggerWithParamInternal = () => {
  if (actionCore) {
    actionCore.executeAction('open-file-with-param', { data: { fileName: 'budget.xlsx' } });
  }
};
</script>
