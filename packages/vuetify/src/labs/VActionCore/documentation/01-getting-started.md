# 1. Getting Started with VCommandPalette

This guide will walk you through the initial setup of `VCommandPalette` in your Vuetify application. By the end, you'll have a working command palette with a few basic actions.

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
    <v-btn @click="isPaletteOpen = true">Open Command Palette</v-btn>
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
</script>
```

## Registering Your First Actions

Actions are the commands that will appear in your palette. They are defined as JavaScript objects and registered with `ActionCore`.

1.  **Define Your Actions:**
    Create an array of `ActionDefinition` objects. Each action needs at least an `id` and a `title`. The `handler` function contains the logic to execute when the action is selected.

    ```typescript
    // src/actions/globalActions.ts (example file)
    import type { ActionDefinition } from 'vuetify/labs/VActionCore'; // Adjust path as needed

    export const myGlobalActions: ActionDefinition[] = [
      {
        id: 'app.greet',
        title: 'Say Hello',
        icon: 'mdi-hand-wave', // Optional: MDI icon
        handler: ()_ => {
          alert('Hello from VCommandPalette!');
        }
      },
      {
        id: 'app.showInfo',
        title: 'Show Information',
        subtitle: 'Displays a piece of information', // Optional
        keywords: ['info', 'details'], // Optional: for searching
        handler: ()_ => {
          console.log('VCommandPalette is a powerful tool!');
          // You could open a dialog, navigate, etc.
        }
      }
    ];
    ```

2.  **Register Actions with ActionCore:**
    You need to access the `ActionCore` instance (usually via `useActionCore()`) and register your actions. This is often done in a main setup file (`main.ts` or a plugin) or a relevant composable/component.

    ```typescript
    // In a component's setup, or a composable, or your main.ts/app.vue
    import { onMounted } from 'vue';
    import { useActionCore } from 'vuetify/labs/VActionCore'; // Adjust path
    import { myGlobalActions } from '@/actions/globalActions'; // Adjust path

    // Example: Registering in App.vue setup
    // export default {
    //   setup() {
    //     const actionCore = useActionCore();
    //
    //     onMounted(() => {
    //       if (actionCore) {
    //         actionCore.registerActionsSource(myGlobalActions);
    //       }
    //     });
    //   }
    // }

    // Or in a composable:
    // export function useAppActions() {
    //   const actionCore = useActionCore();
    //   let sourceKey: symbol | null = null;
    //
    //   onMounted(() => {
    //     if (actionCore) {
    //       sourceKey = actionCore.registerActionsSource(myGlobalActions);
    //     }
    //   });
    //
    //   onUnmounted(() => {
    //     if (actionCore && sourceKey) {
    //       actionCore.unregisterActionsSource(sourceKey);
    //     }
    //   });
    // }
    ```
    **Important:** If you register actions within a component's lifecycle (like `onMounted`), remember to unregister them in `onUnmounted` to prevent memory leaks and duplicate actions if the component is created multiple times. `registerActionsSource` returns a `symbol` key used for unregistration. For truly global actions that live as long as the app, you might register them once when your app initializes.

## Putting It All Together

Here's a more complete example for an `App.vue` or a view component:

```vue
<template>
  <v-app>
    <v-main>
      <v-container>
        <v-btn @click="isPaletteOpen = true">Open Palette</v-btn>
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
let actionsSourceKey: symbol | null = null;

const appActions: ActionDefinition[] = [
  {
    id: 'app.greet',
    title: 'Say Hello',
    icon: 'mdi-hand-wave',
    handler: () => {
      alert('Hello from the Command Palette!');
    }
  },
  {
    id: 'app.logTime',
    title: 'Log Current Time',
    icon: 'mdi-clock-outline',
    keywords: ['date', 'timestamp'],
    handler: () => {
      console.log('Current time:', new Date().toLocaleTimeString());
    }
  }
];

onMounted(() => {
  if (actionCore) {
    actionsSourceKey = actionCore.registerActionsSource(appActions);
  }
});

onUnmounted(() => {
  if (actionCore && actionsSourceKey) {
    actionCore.unregisterActionsSource(actionsSourceKey);
  }
});
</script>
```

Now, when you run your application and click the "Open Palette" button, `VCommandPalette` will appear, and you should be able to search for and execute "Say Hello" and "Log Current Time".

This is just the beginning! The next sections will show you how to define more complex actions, add hotkeys, and customize the palette's behavior.

---
Next: [**Defining Actions for the Command Palette**](./02-actions-for-command-palette.md)
