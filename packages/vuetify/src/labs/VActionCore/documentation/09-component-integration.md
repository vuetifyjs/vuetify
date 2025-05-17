# 9. Component Integration: Connecting Actions to Your UI

While ActionCore provides a powerful centralized system for defining and managing actions, its true value is realized when these actions are seamlessly connected to your Vuetify UI components. ActionCore offers an opt-in integration mechanism for components like `VBtn`, `VListItem`, etc., allowing them to directly execute actions.

This chapter explores how to use the `command` and `commandData` props to link UI elements to ActionCore actions, and the underlying mechanisms that enable this.

## The `command` Prop: Declarative Action Binding

Supported Vuetify components (initially `VBtn`, with others to follow) can be enhanced with a `command` prop. This prop allows you to declaratively link the component to an ActionCore action.

```typescript
// Props available on integrated components (e.g., VBtn)
interface CommandableProps {
  command?: string | ActionDefinition; // The action to execute
  commandData?: any; // Contextual data for the action
}
```

*   **`command?: string | ActionDefinition`**
    *   **`string` (Action ID):** You can pass the unique `id` of a globally registered action. When the component is interacted with (e.g., clicked), it will attempt to execute the action with this ID.
        ```vue
        <template>
          <VBtn command="file.save">Save File</VBtn>
          <VBtn command="theme.toggle">Toggle Theme</VBtn>
        </template>
        ```
    *   **`ActionDefinition` (Inline Object):** For actions that are highly specific to a single component instance or don't warrant global registration, you can pass an entire `ActionDefinition` object directly to the `command` prop. ActionCore (via the `useCommandable` composable) will temporarily register this inline action for the lifecycle of the component and execute it.
        ```vue
        <template>
          <VBtn :command="{
            id: 'local.component.action',
            title: 'Perform Local Task',
            handler: () => console.log('Local task executed!')
          }">
            Do It Locally
          </VBtn>
        </template>
        ```
        **Note:** Inline actions are auto-generated an internal ID if one isn't provided, but it's good practice to provide a descriptive one.

*   **`commandData?: any`**
    *   This prop allows you to pass specific contextual data to the action when it's executed by the component. This data will be available in the `ActionContext.data` property within the action's `handler` and `canExecute` functions.
    *   This is particularly useful for actions that operate on specific items, like in a list or a context menu.
    ```vue
    <template>
      <div v-for="item in items" :key="item.id">
        <span>{{ item.name }}</span>
        <VBtn
          command="item.delete"
          :command-data="{ itemId: item.id, itemName: item.name }"
          icon="mdi-delete"
        />
      </div>
    </template>

    // ActionDefinition for 'item.delete'
    // {
    //   id: 'item.delete',
    //   title: 'Delete Item',
    //   handler: (ctx) => {
    //     console.log('Deleting item:', ctx.data.itemId, ctx.data.itemName);
    //     // Call API to delete ctx.data.itemId
    //   }
    // }
    ```

## Enabling Component Integration (`ActionCoreOptions`)

Component integration with ActionCore is **opt-in** by default. To enable it, you need to configure `ActionCoreOptions` when initializing Vuetify.

```typescript
// In your Vuetify plugin setup (e.g., main.ts or plugins/vuetify.ts)
import { createVuetify } from 'vuetify';
import { useActionCore, ActionCoreSymbol } from '@/labs/action-core'; // Ensure path is correct
// ... other imports

const vuetify = createVuetify({
  // ... other Vuetify options
  actionCore: {
    // Option 1: Enable for all supported components
    componentIntegration: true,

    // Option 2: Enable per-component
    // componentIntegration: {
    //   VBtn: true,
    //   VListItem: true,
    //   // VSwitch: false, // Explicitly disable for VSwitch if needed
    // }
  }
});

// If not using createVuetify to provide, ensure you provide it if ActionCore is managed separately.
// const actionCoreInstance = useActionCore(vuetify.framework.options.actionCore ?? {});
// app.provide(ActionCoreSymbol, actionCoreInstance);
```

*   If `actionCore.componentIntegration` is `undefined` or `false` (the default if `actionCore` options are not provided or `componentIntegration` is omitted), the `command` prop on components will have no effect.
*   `true`: Enables integration for all components that support the `command` prop.
*   `Record<string, boolean>`: Allows fine-grained control, enabling or disabling integration for specific component names (e.g., `VBtn: true`).

ActionCore provides a method `isComponentIntegrationEnabled(componentName: string)` that components use internally to check if they should activate their `command` prop logic.

## `useCommandable` Composable: The Engine Behind Integration

The `command` prop functionality within components is powered by the `useCommandable` composable. This composable is used internally by Vuetify components and generally doesn't need to be called directly by application developers unless building custom commandable components.

Its responsibilities include:

*   Injecting the `ActionCore` service.
*   Checking if integration is enabled for the host component.
*   Watching the `command` and `commandData` props for changes.
*   If `props.command` is an `ActionDefinition` object, it registers this definition with `ActionCore` and unregisters it when the component unmounts or the prop changes.
*   Providing the resolved `ActionDefinition` (whether globally registered or inline) to the component.
*   Exposing an `executeCommand` function that the component calls on interaction (e.g., `onClick`). This function prepares an `ActionContext` (including `trigger: 'component-VBtn'` and `data: props.commandData`) and calls `actionCore.executeAction()`.

## Behavior and Precedence

When a component like `VBtn` has a `command` prop and integration is enabled:

1.  **Action Execution Takes Precedence:** If a valid `command` (either an ID of an existing action or an inline definition) is provided, its execution typically takes precedence over other default behaviors of the component (e.g., `href` navigation or `useGroupItem` toggling), though the component will still emit its standard events like `@click`.
2.  **`disabled` State:** The component's visual disabled state will often react to the `disabled` property or `canExecute` status of the resolved ActionCore action. If the action is disabled, the component should appear disabled.
3.  **`ActionContext`:** The `trigger` in the `ActionContext` will usually be a string identifying the component, like `'component-vbtn'` or `'component-vlistitem'`. The `commandData` prop is passed directly into `ActionContext.data`.

## Creating Commandable UIs

*   **Clarity is Key:** When a UI element is tied to an ActionCore command, ensure its text, icon, and tooltips (using `action.title`, `action.icon`, `action.description`) clearly reflect the action being performed.
*   **Contextual Data (`commandData`):** Use `commandData` effectively to make generic actions (e.g., "delete-item") operate on specific data instances without needing a unique action definition for every item.
*   **Fallback Behavior:** Be mindful that if `componentIntegration` is not enabled or if an invalid `command` ID is provided, the component will revert to its standard, non-ActionCore behavior.
*   **Progressive Enhancement:** ActionCore's component integration is designed as a progressive enhancement. Your application can function without it, and you can opt-in where it provides the most value.

By integrating ActionCore directly into your UI components, you create a highly consistent, maintainable, and powerful user interface where interactions are driven by a central, well-defined command system.

---

Next: [**Best Practices for Quality Actions**](./10-best-practices.md)
