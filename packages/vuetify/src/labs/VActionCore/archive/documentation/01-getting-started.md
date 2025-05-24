# 1. Getting Started with VCommandPalette

This guide will walk you through the initial setup of `VCommandPalette` in your Vuetify application. By the end, you'll have a working command palette with a few basic actions, including opening the palette itself with a hotkey.

## Prerequisites

Ensure you have Vuetify 3 and `VActionCore` set up in your project. If you're using a version of Vuetify that includes `VActionCore` (often in the `labs` section), it should be automatically available when you initialize Vuetify.

You'll need to enable `VActionCore` when creating your Vuetify instance:

```typescript
// src/plugins/vuetify.ts (or your Vuetify initialization file)
import { createVuetify } from 'vuetify'
// ... other imports

export default createVuetify({
  // ... other Vuetify options
  actionCore: true, // Enable ActionCore
})
```

If you need to pass specific options to ActionCore:
```typescript
// src/plugins/vuetify.ts
import { createVuetify } from 'vuetify'
// ... other imports

export default createVuetify({
  // ... other Vuetify options
  actionCore: {
    // verboseLogging: true, // Example option
  },
})
```

## Adding VCommandPalette to Your Template

The `VCommandPalette` component is straightforward to add. You typically control its visibility with a `v-model`.

```vue
<template>
  <div>
    <v-btn @click="isPaletteOpen = true">Open Command Palette (Click)</v-btn>
    <VCommandPalette v-model="isPaletteOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// Make sure to adjust the import path based on your project structure
// and how VCommandPalette is exported from Vuetify labs.
import { VCommandPalette } from 'vuetify/labs/VActionCore'; // Or specific path
import { VBtn } from 'vuetify/components';

const isPaletteOpen = ref(false);

// The action to open the palette via hotkey will be defined and registered
// within this component later in the "Putting It All Together" section.
</script>
```

## Registering Your First Actions

Actions are the commands that will appear in your palette. They are defined as JavaScript objects and registered with `ActionCore`.

1.  **Define Your Actions:**
    Create an array of `ActionDefinition` objects. Each action needs at least an `id` and a `title`. The `handler` function contains the logic to execute when the action is selected.

    For general application actions, you might define them in a separate file:
    ```typescript
    // src/actions/appSpecificActions.ts (example file)
    import type { ActionDefinition } from 'vuetify/labs/VActionCore'; // Adjust path

    export const appSpecificActions: ActionDefinition[] = [
      {
        id: 'app.greet',
        title: 'Say Hello',
        icon: 'mdi-hand-wave', // Optional: MDI icon
        handler: () => {
          alert('Hello from VCommandPalette!');
        }
      },
      {
        id: 'app.showInfo',
        title: 'Show Information',
        subtitle: 'Displays a piece of information', // Optional
        keywords: ['info', 'details'], // Optional: for searching
        handler: () => {
          console.log('VCommandPalette is a powerful tool!');
        }
      }
    ];
    ```
    **Note:** Actions that directly control component-specific state (like an action to open *this specific* command palette instance) are best defined within the component itself, as shown in the "Putting It All Together" section below.

2.  **Register Actions with ActionCore:**
    You need to access the `ActionCore` instance (usually via `useActionCore()`) and register your actions. This is often done in a main setup file (`main.ts` or a plugin) or a relevant composable/component.

    ```typescript
    // Example: Registering appSpecificActions in App.vue setup or a similar central place
    import { onMounted, onUnmounted } from 'vue';
    import { useActionCore } from 'vuetify/labs/VActionCore'; // Adjust path
    import { appSpecificActions } from '@/actions/appSpecificActions'; // Adjust path

    const actionCore = useActionCore();
    let appActionsSourceKey: symbol | null = null;
    onMounted(() => {
      if (actionCore) {
        appActionsSourceKey = actionCore.registerActionsSource(appSpecificActions);
      }
    });
    onUnmounted(() => {
      if (actionCore && appActionsSourceKey) {
        actionCore.unregisterActionsSource(appActionsSourceKey);
      }
    });
    ```
    **Important:** If you register actions within a component's lifecycle (like `onMounted`), remember to unregister them in `onUnmounted` to prevent memory leaks. For truly global actions that live as long as the app, you might register them once when your app initializes.

## Putting It All Together

Here's a more complete example for an `App.vue` or a view component. Notice how the `palette.open` action is defined *within this component* because its handler needs to modify the local `isPaletteOpen` ref.

```vue
<template>
  <v-app>
    <v-main>
      <v-container>
        <p>Press Cmd/Ctrl+Shift+P to open the palette, or click the button.</p>
        <v-btn @click="isPaletteOpen = true">Open Palette (Click)</v-btn>
        <VCommandPalette v-model="isPaletteOpen" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { VApp, VMain, VContainer, VBtn } from 'vuetify/components';
import { VCommandPalette, useActionCore, type ActionDefinition } from 'vuetify/labs/VActionCore'; // Adjust path

const isPaletteOpen = ref(false);
const actionCore = useActionCore();
let combinedActionsSourceKey: symbol | null = null;

// Define actions that are closely tied to this component's state or are primary for it.
const componentSpecificActions: ActionDefinition[] = [
  {
    id: 'palette.open', // Unique ID for the open palette action
    title: 'Open Command Palette', // Display title (though it won't show in palette)
    // Common hotkey: Cmd+Shift+P on Mac, Ctrl+Shift+P on Windows/Linux
    // 'meta' handles this platform difference automatically.
    hotkey: 'meta+shift+p',
    handler: () => {
      isPaletteOpen.value = true; // Directly controls the local ref
    },
    // This action is for opening the palette, so it shouldn't appear IN the palette list.
    meta: {
      paletteHidden: true
    }
  },
  {
    id: 'app.greetComponent', // Ensure ID is unique from any global actions
    title: 'Say Hello (Component)',
    icon: 'mdi-hand-wave-outline',
    handler: () => {
      alert('Hello from the App.vue component via Command Palette!');
    }
  },
  {
    id: 'app.logTimeComponent', // Ensure ID is unique
    title: 'Log Current Time (Component)',
    icon: 'mdi-clock-fast',
    keywords: ['date', 'timestamp', 'local'],
    handler: () => {
      console.log('Component generated time:', new Date().toLocaleTimeString());
    }
  }
];

// Imagine you also have globally defined actions from another file
// import { appSpecificActions } from '@/actions/appSpecificActions';

onMounted(() => {
  if (actionCore) {
    // You can register multiple sources, or combine actions into one array for a single source.
    // For simplicity here, we'll register the component-specific ones.
    // If you had global actions (like appSpecificActions), you might register them here too,
    // or in a more central part of your app.
    // const allAppActions = [...componentSpecificActions, ...appSpecificActions];
    // combinedActionsSourceKey = actionCore.registerActionsSource(allAppActions);

    combinedActionsSourceKey = actionCore.registerActionsSource(componentSpecificActions);
  }
});

onUnmounted(() => {
  if (actionCore && combinedActionsSourceKey) {
    actionCore.unregisterActionsSource(combinedActionsSourceKey);
  }
});
</script>
```

Now, when you run your application, you can press `Cmd+Shift+P` (on macOS) or `Ctrl+Shift+P` (on Windows/Linux) to open the command palette. The button will also work. Inside the palette, you should be able to search for and execute actions like "Say Hello (Component)" and "Log Current Time (Component)", but not the "Open Command Palette" action itself.

This demonstrates a more robust way to handle actions tied to component state while still allowing for globally registered actions.

---
Next: [**Defining Actions for the Command Palette**](./02-actions-for-command-palette.md)
