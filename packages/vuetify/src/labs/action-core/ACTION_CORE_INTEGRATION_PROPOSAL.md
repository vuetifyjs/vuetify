# Vue ActionCore - Integration Proposal

**Date:** 5/15/2025

**Author:** Matthew Ary + Google Gemini 2.5

**Status:** Revised Draft - Core Initialization Complete

## 1. Goal

To integrate `ActionCore` into Vuetify as an optional, labs feature, providing centralized action/hotkey management with opt-in component integration and strong decoupling.

## 2. Core `ActionCore` System Initialization

This step is **COMPLETED**. `ActionCore` is initialized in `framework.ts` and provided to the application based on `VuetifyOptions`.

### 2.1. Changes to `VuetifyOptions`

A new optional property `actionCore` will be added to the `VuetifyOptions` interface (defined in `packages/vuetify/src/framework.ts` and relevant type files).

```typescript
// In packages/vuetify/src/framework.ts (and/or types.ts)
// ... other imports ...
import type { ActionCoreOptions as ActualActionCoreOptions, ActionCore, ActionCoreSymbol } from '@/labs/action-core'; // Adjust path as needed

export interface VuetifyOptions {
  // ... existing options (aliases, components, defaults, display, etc.)
  actionCore?: boolean | ActualActionCoreOptions;
}
```

*   If `actionCore` is `true`, the service will be initialized with default internal options.
*   If `actionCore` is an `ActualActionCoreOptions` object, these options will be passed to the `ActionCore` constructor.
*   If `actionCore` is `false` or `undefined`, the `ActionCore` service will not be initialized or provided.

### 2.2. Conditional Instantiation in `createVuetify`

Inside the `createVuetify` function in `packages/vuetify/src/framework.ts`:

```typescript
// In packages/vuetify/src/framework.ts, within scope.run(() => { ... })
// ... other service imports ...
import { useActionCore, destroyActionCoreInstance, ActionCoreSymbol, type ActionCoreOptions as ActualActionCoreOptions } from '@/labs/action-core'; // Adjust path

// ... existing service creations (defaults, display, theme, etc.)

let actionCoreInstance: ActionCore | undefined = undefined;

if (options.actionCore) {
  const actionCoreOpts: ActualActionCoreOptions = typeof options.actionCore === 'object' ? options.actionCore : {};
  actionCoreInstance = useActionCore(actionCoreOpts);
  // useActionCore itself handles onScopeDispose if called within createVuetify's effectScope
}

// Then, in the install function:
function install (app: App) {
  // ... existing app.provide calls for DefaultsSymbol, DisplaySymbol, etc.
  if (actionCoreInstance) {
    app.provide(ActionCoreSymbol, actionCoreInstance);
  }
  // ... rest of install
}

// In the return object of createVuetify:
return {
  // ... existing services (defaults, display, theme, etc.)
  actionCore: actionCoreInstance, // Expose the instance if created (optional)
  install,
  unmount, // current unmount calls scope.stop(), which should trigger ActionCore's onScopeDispose if initialized within this scope
}
```

This ensures `ActionCore` is only active if explicitly configured.

## 3. Candidate Components for Integration

Based on a review of `packages/vuetify/src/components/`, the following components (non-exhaustive) are primary candidates for `ActionCore` integration due to their action-oriented nature:

*   **Direct Action Execution:** `VBtn`, `VListItem` (non-nav), `VChip` (clickable/closable), `VFab`, `VSpeedDial` actions, `VCardActions` buttons, `VBanner` actions, `VAlert` actions, `VSnackbar` action, `VDialog` buttons.
*   **Navigation Actions:** `VListItem` (with `to`/`href`), `VBtn` (with `to`/`href`), `VTabs`/`VTab`, `VBreadcrumbsItem`, `VBottomNavigation` buttons, `VNavigationDrawer` items, `VAppBar` elements.
*   **State Toggle/Change:** `VSwitch`, `VCheckbox`, `VRadio`, `VExpansionPanelTitle`, interactive `VIcon`s.
*   **Form Submission:** `VForm` (on submit).

## 4. Component Integration Strategy (Decoupled & Opt-In)

Existing, mature components like `VBtn`, `VListItem`, etc., should not automatically change their behavior or require `ActionCore`. Integration will be opt-in via new props and controlled by a feature flag.

### 4.1. New Component Props
Target components (e.g., `VBtn`, `VListItem`) will receive new optional props:

```typescript
props: {
  // ... existing props
  command?: string | ActionDefinition;
  commandData?: any;
}
```

*   `command: string | ActionDefinition`: Links to the action.
*   `commandData: any`: Provides specific data for the action's context, crucial for scenarios like context menus or actions on list items. This data will be passed to `ActionContext.data`.

### 4.2. Feature Flag Mechanism for Component Integration

To control whether the `command` prop is active on components, a feature flag will be used within the `ActionCoreOptions`.

```typescript
// In packages/vuetify/src/labs/action-core/types.ts
export interface ActionCoreOptions {
  // ... any other core ActionCore options ...

  /**
   * Controls whether Vuetify components (like VBtn, VListItem) integrate their `command` prop.
   * If `true`, all supported components attempt integration.
   * If an object, specifies per-component opt-in.
   * Defaults to `false` if not specified, meaning no automatic component integration.
   */
  componentIntegration?: boolean | {
    VBtn?: boolean;
    VListItem?: boolean;
    VSwitch?: boolean;
    VTab?: boolean;
    // ... other components as support is added
  };
}
```

*   **Default:** If `options.actionCore.componentIntegration` is undefined or `false`, no component integration occurs even if `ActionCore` is globally enabled.
*   **Accessing the Flag:** The `ActionCore` class will store these `componentIntegration` settings from its constructor options. It will expose a method:
    ```typescript
    // In ActionCore class
    public isComponentIntegrationEnabled(componentName: string): boolean {
      if (!this.options.componentIntegration) return false;
      if (typeof this.options.componentIntegration === 'boolean') {
        return this.options.componentIntegration;
      }
      return !!this.options.componentIntegration[componentName];
    }
    ```
    Components will inject `ActionCoreSymbol` and call `core?.isComponentIntegrationEnabled('ComponentName')`.

### 4.3. Proposed `useCommandable` Composable
*   **Status:** Implemented in `packages/vuetify/src/labs/action-core/composables/useCommandable.ts`.
*   **Unit Tests:** `useCommandable.spec.ts` is partially passing. Remaining failures (3 out of 12) appear related to the complexities of testing reactive watchers and lifecycle hooks in a direct composable testing environment using `withSetup`. These may require further test refinement or be better validated through component-level integration tests once `useCommandable` is used in actual components.
*   **Functionality:** (Keep the existing description of what it does).

```typescript
// Potential structure in '@/labs/action-core/composables/useCommandable.ts'
import { ref, watch, onUnmounted, computed, type Ref } from 'vue';
import type { ActionCore, ActionDefinition, ActionContext } from '@/labs/action-core';

export function useCommandable(
  props: { command?: string | ActionDefinition; commandData?: any },
  core: ActionCore | null,
  componentName: string
) {
  const commandProp = computed(() => props.command);
  const commandDataProp = computed(() => props.commandData);
  let localActionSourceKey: symbol | null = null;
  const internalActionId = ref<string | undefined>(undefined);

  const isIntegrationEnabled = computed(() => core?.isComponentIntegrationEnabled(componentName) ?? false);

  watch(commandProp, (newCommand) => {
    if (isIntegrationEnabled.value && core) {
      if (localActionSourceKey) {
        core.unregisterActionsSource(localActionSourceKey);
        localActionSourceKey = null;
        internalActionId.value = undefined;
      }
      if (typeof newCommand === 'object' && newCommand?.id) {
        localActionSourceKey = core.registerActionsSource([newCommand as ActionDefinition]);
        internalActionId.value = newCommand.id;
      } else if (typeof newCommand === 'string') {
        internalActionId.value = newCommand;
      } else {
        internalActionId.value = undefined;
      }
    }
  }, { immediate: true, deep: computed(() => typeof commandProp.value === 'object').value });

  onUnmounted(() => {
    if (localActionSourceKey && core) {
      core.unregisterActionsSource(localActionSourceKey);
    }
  });

  const action = computed<ActionDefinition | undefined>(() => {
    if (isIntegrationEnabled.value && core && internalActionId.value) {
      return core.getAction(internalActionId.value);
    }
    return undefined;
  });

  const execute = (contextOverrides?: Partial<ActionContext>, domEvent?: Event) => {
    if (isIntegrationEnabled.value && core && internalActionId.value) {
      const eventContext: ActionContext = {
        trigger: `component-${componentName.toLowerCase()}`,
        event: domEvent,
        data: commandDataProp.value,
        ...(contextOverrides || {}),
      };
      return core.executeAction(internalActionId.value, eventContext);
    }
    return Promise.resolve();
  };

  return {
    isCommandable: isIntegrationEnabled,
    commandAction: action,
    executeCommand: execute,
    effectiveActionId: internalActionId,
  };
}
```

### 4.4. `VBtn` Integration Sketch using `useCommandable`

```typescript
// Simplified VBtn.tsx setup
// Props definition for VBtn would now include:
// command?: string | ActionDefinition;
// commandData?: any;

// ... imports (inject, computed, ActionCoreSymbol, useCommandable, useLink, useGroupItem)

const core = inject(ActionCoreSymbol, null);
// props would be available in setup context
const { isCommandable, commandAction, executeCommand, effectiveActionId } =
  useCommandable(props, core, 'VBtn');

// ... (link, group, isDisabled computed as before)

// onClick method in VBtn
function onClick (e: MouseEvent) {
  if (isDisabled.value) return;

  if (isCommandable.value && effectiveActionId.value) {
    emit('click', e);
    if (e.defaultPrevented) return;
    // executeCommand will now internally use props.commandData passed to useCommandable
    executeCommand({ /* any VBtn specific overrides for context.data if needed */ }, e);
  } else {
    // Original VBtn click logic
    // ... (original logic for link.navigate and group.toggle needs to be preserved here)
    emit('click', e); // Ensure click is still emitted if not a command
  }
}
```
**Example Usage with `command-data`:**
```html
<v-btn command="deleteUser" :command-data="{ userId: user.id }">Delete {{ user.name }}</v-btn>
```
This makes it clear how item-specific data is passed to a generic `deleteUser` action.

## 5. Benefits

*   **Centralized Logic:** Actions and hotkeys managed in one place.
*   **Enhanced Accessibility:** Keyboard-first interactions become easier to implement consistently.
*   **Developer Experience:** Simplified way to add complex interactions to components.
*   **User Customization:** Users can potentially redefine actions or hotkeys globally (future capability).
*   **Progressive Adoption:** Feature flags allow safe, gradual rollout.

## 6. Open Questions & Discussion Points for the Team

1.  **Feature Flag Granularity:** Is `actionCore.componentIntegration: { VBtn: true }` the right level, or should it be more/less granular?
2.  **`ActionDefinition` in Props:** Is passing full `ActionDefinition` objects directly to component props the best API, or should components always refer to globally registered action IDs? (The proposal supports both, but one might be preferred).
3.  **Context for `canExecute` in Components:** How much context should a simple component like `VBtn` try to gather for evaluating an action's `canExecute` for its own `disabled` state? Should it primarily rely on `action.disabled`?
4.  **Naming of the `command` prop:** Is `command` the clearest name? Alternatives: `action`, `actionCoreAction`.
5.  **Default `ActionCoreOptions`**: What should be the sensible defaults if `options.actionCore` is just `true`?

This proposal outlines the integration strategy. Core service initialization is complete. The `useCommandable` composable has been created, with next steps focusing on ensuring its full testability or moving to component integration.

---
*This proposal is a draft and subject to refinement based on team feedback and further analysis.*
