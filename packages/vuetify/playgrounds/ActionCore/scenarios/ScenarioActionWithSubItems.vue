<template>
  <scenario-card title="Action With Sub-Items">
    <p>Action "Navigation Menu" is in palette. Try executing it, or click the button below.</p>
    <v-btn command="parent-with-subs">Open Nav Menu (via VBtn)</v-btn>
    <p class="text-caption mt-2">This button uses the 'command' prop to trigger the action. If the action has subItems, ActionCore typically expects UI (like a command palette) to handle displaying them. The mock palette in the playground does this.</p>
  </scenario-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, inject } from 'vue';
import { useActionCore, type ActionDefinition, type ActionContext } from '../../../src/labs/action-core';
import ScenarioCard from '../ScenarioCard.vue';

const actionCore = useActionCore();
const logAction: ((message: string, details?: any) => void) | undefined = inject('logAction');

const parentActionWithSubs: ActionDefinition = {
  id: 'parent-with-subs',
  title: 'Navigation Menu', // Plain string
  icon: 'mdi-menu',
  description: 'Access various navigation links.',
  subItems: (ctx: ActionContext) => {
    if (logAction) logAction('Fetching subItems for Navigation Menu...', { context: ctx });
    return new Promise(resolve => setTimeout(() => {
      resolve([
        { id: 'sub-home', title: 'Go Home', icon: 'mdi-home', handler: () => { if (logAction) logAction('Navigated to Home'); } },
        { id: 'sub-settings', title: 'Go to Settings', icon: 'mdi-cog', hotkey: 'alt+s', handler: () => { if (logAction) logAction('Navigated to Settings'); } },
        {
          id: 'sub-profile',
          title: 'User Profile',
          icon: 'mdi-account',
          description: 'View or edit your profile.',
          subItems: (sCtx: ActionContext) => { // Nested sub-items
            if (logAction) logAction('Fetching subItems for User Profile...', { context: sCtx });
            return [
              { id: 'sub-profile-view', title: 'View Profile', handler: () => { if (logAction) logAction('Viewed Profile'); } },
              { id: 'sub-profile-edit', title: 'Edit Profile', handler: () => { if (logAction) logAction('Editing Profile'); } },
            ];
          }
        }
      ]);
    }, 300)); // Simulate async fetch slightly faster for testing
  }
};

let sourceKey: symbol | undefined;
onMounted(() => {
  if (actionCore) {
    sourceKey = actionCore.registerActionsSource([parentActionWithSubs]);
    if (logAction) logAction(`Registered: ${String(parentActionWithSubs.title)} (from ScenarioActionWithSubItems)`);
  }
});

onUnmounted(() => {
  if (actionCore && sourceKey) {
    actionCore.unregisterActionsSource(sourceKey);
  }
});
</script>
