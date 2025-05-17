# 10. Best Practices for Quality Actions

ActionCore provides a powerful foundation for managing application interactions. To truly harness its potential and build software that reflects quality craftsmanship, consider these best practices when designing and implementing your actions.

These guidelines aim to help you create actions that are not only functional but also clear, maintainable, robust, and user-friendly.

## 1. Clarity and Expressiveness in Definitions

*   **Meaningful IDs (`id`):**
    *   Use a consistent, namespaced convention (e.g., `feature.subFeature.actionName`, `ui.theme.toggle`, `document.file.saveAs`).
    *   IDs should clearly indicate the action's purpose and origin.
*   **Descriptive Titles (`title`):**
    *   The `title` is what users see. Make it concise, intuitive, and action-oriented (e.g., "Open File," "Toggle Dark Mode," "Submit Application").
    *   Use `Ref<string>` for titles that need to change dynamically (e.g., "Pause Playback" vs. "Resume Playback").
*   **Informative Descriptions & Subtitles (`description`, `subtitle`):**
    *   Use `description` for tooltips, accessibility, or extended info in command palettes. Explain what the action does or any important consequences.
    *   `subtitle` can provide brief additional context in UIs.
*   **Strategic Keywords (`keywords`):**
    *   Think like your users. Include synonyms, related concepts, or common tasks that would lead a user to search for this action in a command palette.
*   **Appropriate Icons (`icon`):**
    *   Visual cues enhance recognition. Use icons consistently and ensure they match the action's intent.
*   **Logical Grouping (`group`, `order`):**
    *   Use `group` to cluster related actions in UIs like command palettes.
    *   Use `order` to influence the display sequence, especially for frequently used or logically ordered actions.

## 2. Robust and Well-Behaved Handlers (`handler`)

*   **Single Responsibility:** Aim for handlers that do one thing well. If an action involves multiple distinct steps, consider breaking it into smaller, chained actions or helper services.
*   **Asynchronous Operations:** For any I/O-bound or potentially long-running task (API calls, complex calculations), ensure your `handler` is `async` and correctly uses `await`. This prevents UI freezes.
*   **Error Handling:** Implement robust error handling within your handlers. Catch exceptions, log them appropriately, and provide user feedback if an action fails.
    ```typescript
    async handler: async (ctx) => {
      actionCore.isLoading.value = true; // If managing isLoading manually for sub-steps
      try {
        // const result = await someApiService.doWork(ctx.data);
        // updateUserInterface(result);
      } catch (error) {
        console.error(`Action '${ctx.id}' failed:`, error); // Assumes id is on context, or use a known id.
        // notifyUserOfError('Failed to complete the action. Please try again.');
      } finally {
        actionCore.isLoading.value = false; // If managing isLoading manually
      }
    }
    ```
*   **Idempotency (where applicable):** If an action might be triggered multiple times accidentally, design the handler to be idempotent if the operation allows (i.e., having the same effect whether called once or multiple times).
*   **Clear Side Effects:** Be explicit about the side effects of an action. If it modifies global state, navigates, or has significant consequences, this should be clear from its definition or documentation.

## 3. Effective Use of Context (`ActionContext`)

*   **Leverage `trigger`:** Use `ActionContext.trigger` if an action needs to behave slightly differently based on how it was invoked (e.g., more verbose logging if triggered programmatically for debug, or different UI feedback if triggered by AI).
*   **Utilize `data` for Contextual Operations:** Pass specific data (e.g., item IDs, form values) via `ActionContext.data` to make generic actions operate on specific targets. This is cleaner than creating numerous highly specialized action definitions.
*   **Access Original Event (`event`):** Only use `ActionContext.event` if you need low-level details from the original DOM event that aren't already abstracted by ActionCore (e.g., precise mouse coordinates for a context menu not handled by the UI framework).

## 4. Precise Conditional Logic (`canExecute`, `disabled`)

*   **`canExecute` for Synchronous, Contextual Checks:** Use `canExecute` for conditions that depend on the `ActionContext` of the *current invocation* and can be determined synchronously (e.g., "is a specific element focused?", "does `ctx.data` contain required fields?").
*   **`disabled` for Reactive State:** Use the `disabled` property (boolean or `Ref<boolean>`) for conditions based on global reactive state that might change independently of an action invocation (e.g., "is the system busy?", "is the user logged out?", "are there unsaved changes?").
*   **Complementary, Not Conflicting:** `disabled` and `canExecute` work together. An action is blocked if its `disabled` state is true *or* if `canExecute` returns `false`.
*   **Keep `canExecute` Lean:** Avoid computationally expensive operations in `canExecute` as it might be called frequently by UIs to update an action's display state.

## 5. Thoughtful Hotkey Design

*Refer to the [Mastering Hotkeys](./04-hotkeys.md) guide for comprehensive details.*
*   **Follow Platform Conventions:** Use `meta+s` for save, `meta+c` for copy, etc., to provide a familiar experience.
*   **Prioritize User Workflows:** Assign memorable and ergonomic hotkeys to frequently used actions.
*   **Avoid Conflicts:** Test hotkeys to ensure they don't clash with browser, OS, or other application shortcuts.
*   **`runInTextInput` with Care:** Be deliberate about which hotkeys should function within text inputs. Use specific matchers (input name, predicate function) for fine-grained control.
*   **`ignoreKeyRepeat: true` for Most Actions:** Prevent actions from firing repeatedly when keys are held down, unless the action is explicitly designed for repeated invocation (e.g., incrementing a value).
*   **`preventDefault: true` Judiciously:** Only use it when necessary to stop default browser behavior that conflicts with your action.

## 6. Lifecycle Management of Action Sources

*Refer to the [Action Sources](./03-action-sources.md) guide for comprehensive details.*
*   **Unregister Dynamically Added Sources:** For actions registered within a component's lifecycle or by a dynamic module, always unregister the `ActionsSource` when the component is unmounted or the module is torn down. This prevents memory leaks, stale actions, and hotkey conflicts.
*   **Use `Ref<ActionDefinition[]>` for Reactive Sets:** If a set of actions needs to change reactively, provide it as a `Ref` to `registerActionsSource`. ActionCore will handle updates automatically.

## 7. Design for Testability

*   **Decouple Logic:** ActionCore promotes separating action logic (`handler`, `canExecute`) from UI components. This makes your core business logic easier to unit test independently.
*   **Mock `ActionContext`:** When testing handlers or `canExecute` functions, create mock `ActionContext` objects to simulate different invocation scenarios.

## 8. Consider User Experience (UX)

*   **Feedback:** Ensure users receive clear feedback when actions are executed, especially for asynchronous operations (use `actionCore.isLoading` or provide custom loading states) or if an action fails.
*   **Discoverability:** Make actions and their hotkeys discoverable through intuitive UI (menus, tooltips, command palettes with good search).
*   **Consistency:** Actions that perform similar functions should have consistent naming, icons, and behavior patterns.
*   **Avoid Overly Nested `subItems`:** While nesting is supported, deep hierarchies can be confusing. Aim for 1-2 levels of nesting in most UIs.

## 9. AI Integration - Use with Care

*Refer to the [AI Integration](./08-ai-integration.md) guide for comprehensive details.*
*   **Schema First (`parametersSchema`):** Meticulously define the expected data for AI-invocable actions.
*   **Clear Guidance (`ai.usageHint`, `ai.examples`):** Help the AI understand when and how to use the action correctly.
*   **Security in Handlers:** **Critically important.** Always validate and authorize data received from AI in your action handlers. AI discovery scopes are for visibility, not security.

By adhering to these best practices, you can leverage ActionCore to build applications that are not only powerful and feature-rich but also a testament to software craftsmanship – delighting users and being a pleasure to maintain and extend.

---

Next: [**Common Anti-Patterns**](./11-anti-patterns.md)
