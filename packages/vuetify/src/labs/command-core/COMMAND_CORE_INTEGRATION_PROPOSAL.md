# Vue CommandCore - Integration Proposal

**Date:** [Current Date]
**Author:** Gemini AI (in collaboration with User)
**Status:** Revised Draft

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

Existing, mature components like `VBtn`, `VListItem`, etc., should not automatically change their behavior or require `CommandCore`. Integration will be opt-in via a new prop and controlled by a feature flag.

### 4.1. New `command` Prop
Target components (e.g., `VBtn`, `VListItem`) will receive a new optional prop:

```typescript
props: {
  // ... existing props
  command?: string | ActionDefinition;
}
```

*   `string`: Interpreted as an `actionId` to be executed from the global `CommandCore` instance.
*   `ActionDefinition`: An inline `ActionDefinition` object. The component would be responsible for registering this action (likely scoped to its lifecycle) and triggering it.

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
To encapsulate common logic for components integrating with `CommandCore` via the `command` prop.

```typescript
// Potential structure in '@/labs/command-core/composables/useCommandable.ts'
import { ref, watch, onUnmounted, computed, type Ref } from 'vue';
import type { CommandCore, ActionDefinition } from '@/labs/command-core';

export function useCommandable(props: { command?: string | ActionDefinition }, core: CommandCore | null, componentName: string) {
  const commandProp = computed(() => props.command);
  let localActionSourceKey: symbol | null = null;
  const internalActionId = ref<string | undefined>(undefined);

  const isIntegrationEnabled = computed(() => core?.isComponentIntegrationEnabled(componentName) ?? false);

  watch(commandProp, (newCommand, oldCommand) => {
    if (isIntegrationEnabled.value && core) {
      // Unregister old inline action if it existed
      if (localActionSourceKey) {
        core.unregisterActionsSource(localActionSourceKey);
        localActionSourceKey = null;
        internalActionId.value = undefined;
      }
      // Register new inline action if it exists
      if (typeof newCommand === 'object' && newCommand?.id) {
        localActionSourceKey = core.registerActionsSource([newCommand]);
        internalActionId.value = newCommand.id;
      } else if (typeof newCommand === 'string') {
        internalActionId.value = newCommand;
      } else {
        internalActionId.value = undefined;
      }
    }
  }, { immediate: true, deep: typeof props.command === 'object' }); // Deep watch if object initially

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
        // data: { /* component-specific data if needed */ }
        ...(contextOverrides || {}),
      };
      return core.executeAction(internalActionId.value, eventContext);
    }
    return Promise.resolve();
  };

  return {
    isCommandable: isIntegrationEnabled, // to easily check if command logic should run
    commandAction: action, // the resolved ActionDefinition from core
    executeCommand: execute,
    effectiveActionId: internalActionId, // ID to use for executeAction
  };
}
```

### 4.4. Revised `VBtn` Integration Sketch using `useCommandable`

```typescript
// Simplified VBtn.tsx setup
import { inject, computed } from 'vue';
import { CommandCoreSymbol } from '@/labs/command-core';
import { useCommandable } from '@/labs/command-core/composables/useCommandable'; // New composable
import { useLink } from '@/composables/router';
import { useGroupItem } from '@/composables/group';

// props: makeVBtnProps() will include command?: string | ActionDefinition;

const core = inject(CommandCoreSymbol, null);
const { isCommandable, commandAction, executeCommand, effectiveActionId } = useCommandable(props, core, 'VBtn');

const link = useLink(props, attrs);
const group = useGroupItem(props, props.symbol, false);

const isDisabled = computed(() => {
  if (props.disabled) return true;
  if (group?.disabled.value) return true;
  if (isCommandable.value && commandAction.value) {
    // Prefer action's disabled state if command is active
    if (typeof commandAction.value.disabled === 'boolean') return commandAction.value.disabled;
    if (commandAction.value.disabled?.value) return commandAction.value.disabled.value;
    // Evaluating canExecute here is complex; defer to action's internal logic or explicit disabled state.
  }
  return false;
});

// onClick method in VBtn
function onClick (e: MouseEvent) {
  if (isDisabled.value) return;

  // If command is active and an action ID is resolved, CommandCore takes precedence.
  if (isCommandable.value && effectiveActionId.value) {
    emit('click', e); // Emit original click event first
    if (e.defaultPrevented) return;
    executeCommand({ /* any VBtn specific context */ }, e);
  } else {
    // Original VBtn click logic (including link.navigate and group.toggle)
    // This part of original onClick remains:
    if (link.isLink.value && (e.metaKey || e.ctrlKey || e.shiftKey || (e.button !== 0) || attrs.target === '_blank')) {
        // Let browser handle link opening in new tab/window
    } else {
        link.navigate?.(e);
    }
    group?.toggle();
    emit('click', e); // Ensure click is emitted if not handled by command
  }
}
```
This sketch prioritizes the command if active. The exact interaction with `link.navigate` and `group.toggle` when a command *also* executes needs careful consideration to prevent double actions or unintended side effects. The principle is that if `command` is used and active, its handler dictates the primary outcome.

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

This revised proposal attempts to align more closely with Vuetify's patterns by introducing a dedicated composable (`useCommandable`) for component-side logic and clarifying the feature flag access. It also expands the list of candidate components.

---
*This proposal is a draft and subject to refinement based on team feedback and further analysis.*
