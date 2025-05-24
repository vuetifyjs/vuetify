<template>
  <scenario-card title="Action With Sub-Items">
    <p>Action "Navigation Menu" is in palette. It will prompt if no param or you can execute it from here.</p>
    <v-btn @click="handleOpenNavMenu">Open Nav Menu (via VBtn)</v-btn>
    <p class="text-caption mt-2">The "Go to Settings" sub-item has hotkey <VHotKey :hotkey="settingsActionHotkey" />.</p>
  </scenario-card>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, inject, ref } from 'vue';
import { useActionCore, type ActionDefinition, type ActionContext, VHotKey, ShowSubItemsUISymbol } from '@/labs/VActionCore/archive';
import ScenarioCard from '../ScenarioCard.vue';

const actionCore = useActionCore();
const logAction: ((message: string, details?: any) => void) | undefined = inject('logAction');
// Inject the function to open the command palette for sub-items
const openPaletteDirectly: ((actionDef: ActionDefinition) => void) | undefined = inject(ShowSubItemsUISymbol);

const settingsActionHotkey = ref('alt_s');

// Define settingsAction separately to register its hotkey globally
const settingsAction: ActionDefinition = {
  id: 'sub-settings', // Keep original ID for consistency if palette refers to it
  title: 'Go to Settings',
  icon: 'mdi-cog',
  hotkey: settingsActionHotkey.value,
  runInTextInput: true,
  hotkeyOptions: { preventDefault: true },
  handler: () => {
    console.log('--- SETTINGS ACTION HANDLER CALLED (SCENARIO) ---');
    if (logAction) logAction('Navigated to Settings (via global hotkey or direct execution)');
  }
};

const parentActionWithSubs: ActionDefinition = {
  id: 'parent-with-subs',
  title: 'Navigation Menu',
  icon: 'mdi-menu',
  description: 'Access various navigation links.',
  // No direct handler; subItems are meant to be shown in a UI like the command palette
  subItems: (ctx: ActionContext) => {
    if (logAction) logAction('Fetching subItems for Navigation Menu...', { context: ctx });
    return new Promise(resolve => setTimeout(() => {
      resolve([
        { id: 'sub-home', title: 'Go Home', icon: 'mdi-home', handler: () => { if (logAction) logAction('Navigated to Home'); } },
        // Reference the standalone settingsAction definition here for the subItems list
        // Or, if preferred, redefine it here but without the hotkey if the global one should be sole source of truth for hotkey
        // For simplicity and ensuring hotkey is tied to the globally registered one:
        settingsAction, // Include the globally registered action in the sub-items list
        {
          id: 'sub-profile',
          title: 'User Profile',
          icon: 'mdi-account',
          description: 'View or edit your profile.',
          subItems: (sCtx: ActionContext) => {
            if (logAction) logAction('Fetching subItems for User Profile...', { context: sCtx });
            return [
              { id: 'sub-profile-view', title: 'View Profile', handler: () => { if (logAction) logAction('Viewed Profile'); } },
              { id: 'sub-profile-edit', title: 'Edit Profile', handler: () => { if (logAction) logAction('Editing Profile'); } },
            ];
          }
        }
      ]);
    }, 300));
  }
};

const handleOpenNavMenu = () => {
  if (openPaletteDirectly) {
    // The `parentActionWithSubs` ActionDefinition is defined in this component's scope.
    // It has subItems that the command palette (openPaletteDirectly) knows how to display.
    openPaletteDirectly(parentActionWithSubs);
  } else {
    logAction?.('Error: UI function to show sub-items (openPaletteDirectly) not injected. Cannot open nav menu UI.');
    // As a fallback, one could try actionCore.executeAction, but it won't open the palette UI by itself
    // for an action that only has subItems and no handler.
    // actionCore.executeAction('parent-with-subs');
  }
};

let sourceKey: symbol | undefined;
onMounted(() => {
  if (actionCore) {
    // Register both the parent and the specific sub-item that has a global hotkey
    sourceKey = actionCore.registerActionsSource([parentActionWithSubs, settingsAction]);
    if (logAction) logAction(`Registered: ${String(parentActionWithSubs.title)} and ${settingsAction.title} (from ScenarioActionWithSubItems)`);
  }
});

onUnmounted(() => {
  if (actionCore && sourceKey) {
    actionCore.unregisterActionsSource(sourceKey);
  }
});
</script>
