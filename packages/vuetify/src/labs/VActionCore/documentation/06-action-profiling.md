# 6. Action Profiling (Modes & Overrides)

Modern applications often require different sets of behaviors or presentations based on user expertise, application mode, or other contextual factors. ActionCore's "Profiling" feature provides an elegant and centralized way to manage these variations without duplicating action definitions or resorting to complex conditional logic within your components or action sources.

Action Profiling allows a single `ActionDefinition` to have multiple behavior variations (e.g., different hotkeys, titles, handlers, or even `canExecute` logic) that can be switched globally.

## The Concept of Profiles

Imagine your application has:

*   **Beginner Mode vs. Advanced Mode:** Simplifies UI, uses more verbose titles, and offers different hotkey sets based on user expertise.
*   **Debug Mode:** Shows internal diagnostic actions or actions with modified behavior for testing.
*   **Internationalization (i18n) & Localization (l10n):**
    *   Action `title`s, `subtitle`s, and `description`s change based on the selected application language.
    *   Hotkeys might be adjusted to be more ergonomic or conventional for specific language keyboard layouts (e.g., a key easily accessible on a QWERTY layout might be awkward on an AZERTY layout for a common shortcut).
*   **Keyboard Layout Adaptations:** Beyond just language, specific hotkeys could be altered for substantially different physical keyboard layouts (e.g., Dvorak vs. QWERTY) if a user indicates such a preference, ensuring common actions remain accessible.
*   **Platform-Specific Nuances (Beyond Default Handling):** While ActionCore handles common `meta` vs. `ctrl` normalization, profiles could be used for more granular platform-specific hotkey overrides if needed for edge cases not covered by default normalization.

Instead of registering entirely different sets of actions for each mode or localization, Action Profiling allows you to define a single base action and then specify overrides for each relevant profile.

## Defining Profile Overrides

Profiles are defined within an `ActionDefinition` using the optional `profiles` property. This property is an object where:

*   **Keys** are profile names (e.g., `'beginner'`, `'advanced'`, `'debugMode'`).
*   **Values** are `ActionProfileOverride` objects.

```typescript
// From types.ts (ActionDefinition)
export interface ActionDefinition<T extends ActionContext = ActionContext> {
  // ... other base properties (id, title, handler, etc.)
  profiles?: Record<string, ActionProfileOverride<T>>;
}

// From types.ts (ActionProfileOverride)
export interface ActionProfileOverride<T extends ActionContext = ActionContext> {
  title?: string | Ref<string>;
  subtitle?: string | Ref<string>;
  icon?: string | Ref<string>;
  keywords?: string | string[];
  handler?: (context: T) => void | Promise<void>;
  hotkey?: string | string[];
  hotkeyOptions?: { /* ... */ };
  runInTextInput?: boolean | 'only' | RunInTextInputMatcher;
  canExecute?: (context: T) => boolean;
  subItems?: (context: T) => ActionDefinition<T>[] | Promise<ActionDefinition<T>[]>;
  meta?: Record<string, any>; // Profile-specific meta; deep merged with base meta
  order?: number;
  disabled?: boolean | Ref<boolean>;
  description?: string;
  group?: string;
  parametersSchema?: Record<string, any>; // Profile can override schema for programmatic use
  ai?: AIActionMetadata; // Profile can override AI metadata (experimental, custom setup)
}
```

The `ActionProfileOverride` interface mirrors many properties of `ActionDefinition`. When a profile is active, any properties defined in its `ActionProfileOverride` will take precedence over the base `ActionDefinition`'s properties.

**Example:**

```typescript
import type { ActionDefinition, ActionContext } from '@/labs/action-core';
import { ref } from 'vue';

const saveAction: ActionDefinition = {
  id: 'document.save',
  title: 'Save', // Base title
  icon: 'mdi-content-save',
  hotkey: 'meta+s', // Base hotkey
  handler: (ctx: ActionContext) => console.log('Document saved (Standard Mode)', ctx.data),
  meta: { baseFeature: true, commonSetting: 'A' },
  profiles: {
    beginner: {
      title: 'Save Your Work',
      description: 'Click here to save all your changes to the document.',
      // No hotkey override, so 'meta+s' from base is used.
      // No handler override, so base handler is used.
      meta: { beginnerHint: 'Make sure to save often!', commonSetting: 'B_Beginner' },
    },
    advanced: {
      title: 'Save & Commit',
      icon: 'mdi-content-save-all',
      hotkey: 'meta+shift+s', // Advanced users get a different hotkey
      handler: async (ctx: ActionContext) => {
        console.log('Document saved and committed (Advanced Mode)', ctx.data);
        // await gitService.commitChanges();
      },
      canExecute: (ctx: ActionContext) => {
        // return project.hasValidGitRepo && !project.isConflicted;
        return true; // Simplified for example
      },
      meta: { advancedFeatureFlag: true, commonSetting: 'C_Advanced' },
    },
  },
};
```

In this example:
*   The `document.save` action has a base definition.
*   The `beginner` profile overrides `title`, `description`, and merges/overrides `meta`.
*   The `advanced` profile overrides `title`, `icon`, `hotkey`, `handler`, `canExecute`, and merges/overrides `meta`.

**Meta Property Merging:**
When a profile provides a `meta` object, it is **deep merged** with the base action's `meta` object. Profile-specific `meta` properties will overwrite base `meta` properties if they share the same key at any level of nesting.

## Activating a Profile

ActionCore provides a global way to set the active profile:

*   **`actionCore.setActiveProfile(profileName: string | null): void`**
    *   Call this method with the name of the profile you want to activate (e.g., `'beginner'`, `'advanced'`).
    *   Calling it with `null` (or a profile name not defined for any action) deactivates any active profile, causing all actions to revert to their base definitions.

*   **`actionCore.activeProfile: Readonly<Ref<string | null>>`**
    *   A read-only `Ref` that holds the name of the currently active profile, or `null` if no profile is active. You can watch this `Ref` to react to profile changes in your UI or other services.

**Example of Activating a Profile:**

```typescript
import { useActionCore } from '@/labs/action-core';
import { ref } from 'vue';

const actionCore = useActionCore();
const currentAppMode = ref<'beginner' | 'advanced' | null>('beginner');

function toggleMode() {
  currentAppMode.value = currentAppMode.value === 'beginner' ? 'advanced' : 'beginner';
  actionCore.setActiveProfile(currentAppMode.value);
  console.log(`Action profile set to: ${actionCore.activeProfile.value}`);
}

// Initialize with the default mode
if (actionCore) {
  actionCore.setActiveProfile(currentAppMode.value);
}
```

## How Profiling Affects Actions

When `actionCore.setActiveProfile()` is called:

1.  ActionCore recomputes its internal list of *effective* actions (`actionCore.allActions`).
2.  For each registered base `ActionDefinition`:
    *   It checks if the action has a `profiles` object and if that object contains an entry for the newly active `profileName`.
    *   If a matching profile override exists, the base action definition is merged with the `ActionProfileOverride`. Properties from the override take precedence.
    *   If no matching profile override exists for that action, or if no profile is active (`null`), the action's base definition is used as the effective action.
3.  **Hotkeys are automatically updated:** ActionCore detects changes in the `hotkey` property of the effective actions and re-registers them with the underlying `useKeyBindings` system. This means hotkeys can dynamically change when the profile changes.
4.  **`actionCore.getAction(actionId)` will always return the *effective* action definition** (base, or base merged with the active profile's overrides).
5.  UI elements (like `<VHotKey>` or components using `useCommandable`) that react to `actionCore.allActions` or specific actions retrieved via `getAction()` will dynamically update to reflect the changes in title, icon, disabled state, etc.

## Benefits of Action Profiling

*   **Reduced Redundancy:** Define the core of an action once and only specify the differences for each profile.
*   **Centralized Mode Management:** Application modes affecting actions are managed globally within ActionCore, rather than scattered across components.
*   **Dynamic UI and Behavior:** Hotkeys, titles, and even action handlers can change on-the-fly in response to profile changes, providing a tailored user experience.
*   **Improved Maintainability:** Easier to understand and manage action variations compared to complex conditional logic within action handlers or component templates.

Action Profiling is a powerful tool for creating adaptable and user-centric applications. By thoughtfully designing your base actions and their profile overrides, you can significantly enhance the sophistication and usability of your ActionCore-powered features.

---

Next: [**Sub-Items & Nested Commands**](./07-sub-items-and-nesting.md)
