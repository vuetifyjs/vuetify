# Vue CommandCore - Integration Proposal

**Date:** 5/15/2025

**Author:** Matthew Ary + Google Gemini 2.5

**Status:** Proposal

## 1. Goal

To integrate `CommandCore` into Vuetify as an optional, labs feature, providing centralized action/hotkey management with opt-in component integration and strong decoupling.

## 2. Core `CommandCore` System Initialization

The `CommandCore` service will be initialized and provided at the Vuetify app level.

### 2.1. Changes to `VuetifyOptions`

A new optional property `commandCore` will be added to the `VuetifyOptions` interface (defined in `packages/vuetify/src/framework.ts` and relevant type files).

```typescript
// In packages/vuetify/src/framework.ts (and/or types.ts)
// ... other imports ...
import type { CommandCoreOptions as ActualCommandCoreOptions, CommandCore, CommandCoreSymbol } from '@/labs/command-core'; // Adjust path as needed

export interface VuetifyOptions {
  // ... existing options (aliases, components, defaults, display, etc.)
  commandCore?: boolean | ActualCommandCoreOptions;
}
```

*   If `commandCore` is `true`, the service will be initialized with default internal options.
*   If `commandCore` is an `ActualCommandCoreOptions` object, these options will be passed to the `CommandCore` constructor.
*   If `commandCore` is `false` or `undefined`, the `CommandCore` service will not be initialized or provided.

### 2.2. Conditional Instantiation in `createVuetify`

Inside the `createVuetify` function in `packages/vuetify/src/framework.ts`:

```typescript
// In packages/vuetify/src/framework.ts, within scope.run(() => { ... })
// ... other service imports ...
import { useCommandCore, destroyCommandCoreInstance, CommandCoreSymbol, type CommandCoreOptions as ActualCommandCoreOptions } from '@/labs/command-core'; // Adjust path

// ... existing service creations (defaults, display, theme, etc.)

let commandCoreInstance: CommandCore | undefined = undefined;

if (options.commandCore) {
  const commandCoreOpts: ActualCommandCoreOptions = typeof options.commandCore === 'object' ? options.commandCore : {};
  commandCoreInstance = useCommandCore(commandCoreOpts);
  // useCommandCore itself handles onScopeDispose if called within createVuetify's effectScope
}

// Then, in the install function:
function install (app: App) {
  // ... existing app.provide calls for DefaultsSymbol, DisplaySymbol, etc.
  if (commandCoreInstance) {
    app.provide(CommandCoreSymbol, commandCoreInstance);
  }
  // ... rest of install
}

// In the return object of createVuetify:
return {
  // ... existing services (defaults, display, theme, etc.)
  commandCore: commandCoreInstance, // Expose the instance if created (optional)
  install,
  unmount, // current unmount calls scope.stop(), which should trigger CommandCore's onScopeDispose if initialized within this scope
}
```

This ensures `CommandCore` is only active if explicitly configured.

## 3. Candidate Components for Integration

Based on a review of `packages/vuetify/src/components/`, the following components (non-exhaustive) are primary candidates for `CommandCore` integration due to their action-oriented nature:

*   **Direct Action Execution:** `VBtn`, `VListItem` (non-nav), `VChip` (clickable/closable), `VFab`, `VSpeedDial` actions, `VCardActions` buttons, `VBanner` actions, `VAlert` actions, `VSnackbar` action, `VDialog` buttons.
*   **Navigation Actions:** `VListItem` (with `to`/`href`), `VBtn` (with `to`/`href`), `VTabs`/`VTab`, `VBreadcrumbsItem`, `VBottomNavigation` buttons, `VNavigationDrawer` items, `VAppBar` elements.
*   **State Toggle/Change:** `VSwitch`, `VCheckbox`, `VRadio`, `VExpansionPanelTitle`, interactive `VIcon`s.
*   **Form Submission:** `VForm` (on submit).

## 4. Component Integration Strategy (Decoupled & Opt-In)

Existing, mature components like `VBtn`, `VListItem`, etc., should not automatically change their behavior or require `CommandCore`. Integration will be opt-in via new props and controlled by a feature flag.

### 4.1. New Component Props
Target components (e.g., `VBtn`, `VListItem`) will receive new optional props:

```typescript
props: {
  // ... existing props
  command?: string | ActionDefinition;
  commandData?: any; // Data to be passed into ActionContext.data when the command is executed
}
```

*   `command: string | ActionDefinition`: Links to the action.
*   `commandData: any`: Provides specific data for the action's context, crucial for scenarios like context menus or actions on list items. This data will be passed to `ActionContext.data`.

### 4.2. Feature Flag Mechanism for Component Integration

To control whether the `command` prop is active on components, a feature flag will be used within the `CommandCoreOptions`.

```typescript
// In packages/vuetify/src/labs/command-core/types.ts
export interface CommandCoreOptions {
  // ... any other core CommandCore options ...

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

*   **Default:** If `options.commandCore.componentIntegration` is undefined or `false`, no component integration occurs even if `CommandCore` is globally enabled.
*   **Accessing the Flag:** The `CommandCore` class will store these `componentIntegration` settings from its constructor options. It will expose a method:
    ```typescript
    // In CommandCore class
    public isComponentIntegrationEnabled(componentName: string): boolean {
      if (!this.options.componentIntegration) return false;
      if (typeof this.options.componentIntegration === 'boolean') {
        return this.options.componentIntegration;
      }
      return !!this.options.componentIntegration[componentName];
    }
    ```
    Components will inject `CommandCoreSymbol` and call `core?.isComponentIntegrationEnabled('ComponentName')`.

### 4.3. Proposed `useCommandable` Composable
To encapsulate common logic for components integrating with `CommandCore`.

```typescript
// Potential structure in '@/labs/command-core/composables/useCommandable.ts'
import { ref, watch, onUnmounted, computed, type Ref } from 'vue';
import type { CommandCore, ActionDefinition, ActionContext } from '@/labs/command-core'; // Added ActionContext

export function useCommandable(
  props: { command?: string | ActionDefinition; commandData?: any }, // Added commandData to props type
  core: CommandCore | null,
  componentName: string
) {
  const commandProp = computed(() => props.command);
  const commandDataProp = computed(() => props.commandData); // Watch commandData for context
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
        localActionSourceKey = core.registerActionsSource([newCommand]); // Assumes newCommand is an array for registerActionsSource
        internalActionId.value = newCommand.id;
      } else if (typeof newCommand === 'string') {
        internalActionId.value = newCommand;
      } else {
        internalActionId.value = undefined;
      }
    }
  // Watch deep if commandProp is an object to react to its internal changes if necessary,
  // though replacing the object is cleaner for prop changes.
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
        data: commandDataProp.value, // Use commandData from props
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
// Props would include: command?: string | ActionDefinition; commandData?: any;

// ... imports ...
const core = inject(CommandCoreSymbol, null);
const { isCommandable, commandAction, executeCommand, effectiveActionId } =
  useCommandable(props, core, 'VBtn'); // props now includes commandData implicitly

// ... (isDisabled computed remains similar, potentially using commandAction.value.canExecute with a constructed context if feasible)

// onClick method in VBtn
function onClick (e: MouseEvent) {
  if (isDisabled.value) return;

  if (isCommandable.value && effectiveActionId.value) {
    emit('click', e);
    if (e.defaultPrevented) return;
    // executeCommand will now internally use props.commandData
    executeCommand({ /* any VBtn specific overrides for context */ }, e);
  } else {
    // Original VBtn click logic (link.navigate, group.toggle)
    emit('click', e); // Ensure click is still emitted if not a command
    // ... (original logic for link.navigate and group.toggle)
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

1.  **Feature Flag Granularity:** Is `commandCore.componentIntegration: { VBtn: true }` the right level, or should it be more/less granular?
2.  **`ActionDefinition` in Props:** Is passing full `ActionDefinition` objects directly to component props the best API, or should components always refer to globally registered action IDs? (The proposal supports both, but one might be preferred).
3.  **Context for `canExecute` in Components:** How much context should a simple component like `VBtn` try to gather for evaluating an action's `canExecute` for its own `disabled` state? Should it primarily rely on `action.disabled`?
4.  **Naming of the `command` prop:** Is `command` the clearest name? Alternatives: `action`, `commandCoreAction`.
5.  **Default `CommandCoreOptions`**: What should be the sensible defaults if `options.commandCore` is just `true`?

This proposal incorporates the `commandData` prop for better contextual action execution, making `CommandCore` more practical for list-based interactions and context menus.

---
*This proposal is a draft and subject to refinement based on team feedback and further analysis.*
