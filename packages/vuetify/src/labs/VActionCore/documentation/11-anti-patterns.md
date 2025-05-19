# 11. Common Anti-Patterns to Avoid

While ActionCore is designed to be robust and flexible, like any powerful system, it can be misused. Adhering to best practices is key, but it's equally important to be aware of common anti-patterns – approaches that might seem intuitive or expedient but can lead to problems down the line. Recognizing and avoiding these will help you maintain a clean, performant, and understandable ActionCore implementation.

This section draws from internal development notes and real-world considerations.

## When **Not** to Use ActionCore (Or Use It More Lightly)

ActionCore excels at managing actions that benefit from centralization, shareability (hotkeys, palette, multiple UI triggers), or require complex contextual availability. However, forcing *every* conceivable user interaction through ActionCore can be an anti-pattern.

*   **Anti-Pattern:** Using ActionCore for highly localized, simple UI component interactions that have no need for global discoverability, hotkeys, command palette presence, or complex `canExecute` logic managed outside the component.
*   **Examples of Potentially Inappropriate Use:**
    *   **Internal Component State Toggles:** A purely visual toggle within a self-contained component (e.g., expanding/collapsing a panel section that has no other trigger or global relevance) is often better handled by local component state (`ref` or `reactive`) and a simple `@click` handler.
    *   **Basic Form Input Validation Feedback:** While a form *submission* might be an action, individual input field validation messages or simple CSS class changes on blur/focus are typically handled by form libraries (like VeeValidate) or direct component logic.
    *   **Purely Decorative Animations/Transitions:** Interactions that only trigger a visual effect without changing application state or business logic usually don't need the overhead of an ActionDefinition.
    *   **Hyper-Specific, One-Off Event Handling:** If a component has a unique, deeply nested interactive element that only ever responds to a click in that one place and has no broader implications, a direct `@click` handler might be simpler than defining a dedicated ActionCore action.

*   **Impact of Overuse:**
    *   **Unnecessary Boilerplate:** Defining `ActionDefinition` objects for trivial, localized interactions adds unnecessary code.
    *   **Bloated `allActions` List:** Pollutes the global action space with actions that have no business being there, potentially impacting command palette search performance and making it harder to find genuinely global/important actions.
    *   **Increased Complexity:** Can make simple component logic harder to follow if developers have to trace interactions through ActionCore unnecessarily.
    *   **Reduced Component Encapsulation:** Forcing purely internal component behaviors into a global system can break encapsulation.

*   **Recommendation: Exercise Discernment**
    *   **Ask "Why ActionCore for this?":**
        *   Does this action need a global hotkey?
        *   Should it appear in a command palette?
        *   Will it be triggered from multiple, disparate parts of the UI or programmatically in a way that benefits from a central ID?
        *   Does its `canExecute` logic depend on global state or context that ActionCore helps manage?
        *   Is it part of a user "command" or a significant application operation?
        *   Would Action Profiling be beneficial for this interaction?
    *   If the answers to most of these are "no," a simpler, more localized approach is likely better.
    *   **Prefer Standard Vue Patterns for Local Interactions:** For simple click handlers, local state changes, or basic event modifications within a component's scope, continue to use standard Vue `@click`, `ref`, `computed`, and methods.

ActionCore is a tool for managing "commands" and significant "actions" in a unified way. It's not intended to replace all basic event handling. A craftsman knows when to use a specialized tool and when a simpler one will suffice.

## 1. Overly Granular or Chatty Action Sources

*   **Anti-Pattern:** Defining too many small, frequently changing `ActionsSource` instances, especially if they are reactive `Ref<ActionDefinition[]>` that update very often or async functions that re-resolve frequently with only minor changes.
*   **Impact:** Increased computational overhead as `actionCore.allActions` (a `ComputedRef`) re-evaluates more often. Frequent re-processing and re-registration of hotkeys, potentially leading to performance degradation or subtle timing issues. Can make debugging harder due to the constant flux in the effective action list.
*   **Recommendation:** Group related actions into larger, more stable sources where possible. Use reactive sources (`Ref` or function returning a `Promise`) judiciously, primarily when the set of actions genuinely needs to change dynamically based on broader application state, not for micro-updates. Consider debouncing or throttling updates to reactive sources if they are inherently chatty.

## 2. Complex or Opaque `runInTextInput` Logic

*   **Anti-Pattern:** Implementing overly complex or difficult-to-understand logic within the `runInTextInput` function for an `ActionDefinition`.
*   **Impact:** Makes it hard to reason about when a hotkey will be active or blocked in input fields. Increases the likelihood of bugs where hotkeys are unexpectedly active or inactive. Can lead to inconsistent user experience if similar actions have vastly different input blocking behaviors.
*   **Recommendation:** Prefer simpler `runInTextInput` matchers: `true`, `false`, `'only'`, or specific input `name` strings/arrays. If a function is necessary, ensure it is well-documented, pure (no side effects), and as straightforward as possible. Strive for consistency in how `runInTextInput` is used across similar types of actions.

## 3. Inconsistent or Missing Action IDs

*   **Anti-Pattern:** Using non-unique action IDs across different sources or dynamically generated actions. Lack of a clear naming convention for action IDs, making them hard to reference or debug. Action IDs that change unexpectedly.
*   **Impact:** If IDs are not unique, `ActionCore` deduplicates by ID (last registered wins), which can lead to actions being unintentionally overridden. Difficult to programmatically execute or reference actions. Harder to track down issues related to specific actions.
*   **Recommendation:** Establish and enforce a clear, consistent naming convention for action IDs (e.g., `feature.subFeature.actionName`). Ensure IDs are globally unique. Avoid dynamically generating IDs in a way that they might change for the conceptually "same" action unless deliberate.

## 4. Over-reliance on `meta` Property for Core Logic

*   **Anti-Pattern:** Stuffing critical behavioral flags or complex state into the generic `meta: Record<string, any>` property when more specific, typed properties on `ActionDefinition` (or custom extensions if absolutely necessary and well-typed) would be appropriate.
*   **Impact:** Reduces type safety and discoverability; developers need to "know" the magic strings used as keys in `meta`. Makes actions harder to understand and maintain. Can lead to runtime errors if `meta` properties are misspelled or used inconsistently.
*   **Recommendation:** Use `meta` for truly custom, non-standard data that doesn't fit existing `ActionDefinition` fields. If a piece of metadata becomes widely used or dictates core action behavior, consider if it warrants being a first-class, typed property (potentially through a well-defined extension pattern if customizing ActionCore itself, though direct modification is not standard).

## 5. Abusing Action Profiles for Unrelated Action Sets

*   **Anti-Pattern:** Using the "profiles" feature to manage entirely different sets of actions rather than variations of the *same* conceptual actions. For instance, defining `profile: 'admin'` and `profile: 'user'` where the actions under each are largely disjoint.
*   **Impact:** Bloats individual `ActionDefinition` objects with many profile overrides that might not be true "overrides." Can make the base `ActionDefinition` less meaningful. Might be less clear than explicitly registering/unregistering different `ActionSource` instances based on user role or application mode.
*   **Recommendation:** Use profiles for their intended purpose: providing variations (e.g., different hotkeys, titles, handlers) for a conceptually consistent set of actions based on context. For largely distinct sets of actions, consider managing separate `ActionSource` instances and registering/unregistering them as needed.

## 6. Deeply Nested or Recursive `subItems`

*   **Anti-Pattern:** Creating action definitions with `subItems` that lead to excessively deep or potentially circular/recursive menu structures.
*   **Impact:** Poor user experience in command palettes or menus. Potential for performance issues if resolving `subItems` becomes too complex. Increased risk of stack overflows or infinite loops if recursion is not handled carefully.
*   **Recommendation:** Aim for relatively flat or shallow action hierarchies (1-2 levels of nesting is often ideal for UIs). If deep nesting seems necessary, re-evaluate if the actions can be reorganized or if a different UI paradigm is needed. Ensure any asynchronous `subItems` functions have clear termination conditions and handle errors gracefully.

## 7. Mismanagement of Asynchronous Operations (Sources & Handlers)

*   **Anti-Pattern:** Async action sources (`() => Promise<ActionDefinition[]>`) that never resolve or reject, or do so inconsistently. Action handlers (`(context: ActionContext) => Promise<void>`) that don't handle their own errors, potentially leaving `ActionCore.isLoading` state incorrect or causing unhandled promise rejections. Ignoring the `isLoading` state in the UI when long-running async handlers are executing.
*   **Impact:** Actions from an unresolved async source may never appear. Unhandled errors in handlers can disrupt application flow. UI might appear unresponsive if `isLoading` is not respected.
*   **Recommendation:** Ensure async action sources are robust, handle their own errors, and always resolve or reject. Implement proper error handling within async action handlers. Use the `ActionCore.isLoading` state (or custom loading states) to provide feedback to the user during action execution.

## 8. Ignoring `canExecute` or `disabled` in UI

*   **Anti-Pattern:** UI elements (buttons, list items) bound to actions that do not reflect the action's `disabled` state or respect its `canExecute` condition, allowing users to attempt to trigger actions that should not be available.
*   **Impact:** Poor user experience, leading to confusion when clicking an apparently active UI element does nothing or results in an error/warning. ActionCore's `executeAction` will prevent execution, but the UI should ideally preempt this by visually indicating unavailability.
*   **Recommendation:** UI components representing actions should reactively bind to the action's `disabled` status (considering both its `disabled` prop and `canExecute` result). Ensure custom displays of actions correctly reflect their enabled/disabled status.

## 9. Hotkey Conflicts and Ambiguity

*   **Anti-Pattern:** Defining multiple actions with the same hotkey combination or sequence without a clear strategy for precedence or resolution, especially across different profiles or dynamically registered action sources.
*   **Impact:** Unpredictable behavior: users might trigger an unintended action. Debugging hotkey issues becomes difficult.
*   **Recommendation:** Carefully plan and document hotkey assignments. Use action profiles strategically to modify hotkeys for specific contexts, ensuring clarity. Provide users with a way to view active hotkeys. Test hotkey behavior thoroughly. If multiple actions *must* share a hotkey, ensure their `canExecute` conditions are mutually exclusive or that the simultaneous execution is intended and handled.

## 10. Inefficient `allActions` Computation

*   **Anti-Pattern:** Introducing expensive computations or side effects within action source functions or during the construction of `ActionDefinition` objects that are part of `registeredSources`.
*   **Impact:** Slows down the `allActions` computed property, which can impact UI responsiveness, especially if it's recomputed frequently (e.g., due to chatty reactive sources or profile changes).
*   **Recommendation:** Keep action source functions and `ActionDefinition` construction as lightweight as possible. Defer expensive operations to the action's `handler` or `subItems` function, which are only called upon execution or expansion.

## 11. Manually Unregistering/Re-registering to Simulate Profiles (Obsolete with Native Profiles)

*   **Anti-Pattern:** Unregistering an `ActionsSource` and immediately re-registering a different `ActionsSource` (often containing actions with the same IDs but different properties) to simulate different behavior modes. *This was an older workaround before native profiling was introduced.*
*   **Problem:** Verbose, error-prone, less efficient. Requires manual management of source keys and definitions.
*   **Recommendation:** **Use the native Action Profiling feature.** Define actions once with a `profiles` object. Use `actionCore.setActiveProfile('profileName')` to switch behavior globally. This is cleaner, centralized, and leverages built-in reactivity.

## 12. Missing or Poorly Defined AI Metadata

*   **Anti-Pattern:** Actions intended for AI interaction are defined without a `parametersSchema` or with an incomplete/misleading `ai` metadata block (`usageHint`, `examples`, `scope`, `accessible`).
*   **Impact:** AI assistant cannot reliably discover, understand parameters of, or determine the appropriate context for using the action. May lead to failed or incorrect AI-driven operations.
*   **Recommendation:** For AI-callable actions, meticulously define `parametersSchema`. Provide clear `ai.usageHint` and `ai.examples`. Assign appropriate `ai.scope`(s). Critically, ensure action handlers perform robust validation and authorization, especially if `context.trigger === 'ai_assistant'`. AI discovery is for visibility, not a replacement for handler security.

## 13. Synchronous Handlers for Potentially Long-Running Operations

*   **Anti-Pattern:** An `ActionDefinition.handler` performs a task that could take significant time (complex computations, multiple synchronous DOM manipulations) without being `async`.
*   **Impact:** Blocks the main JavaScript thread, freezing the UI.
*   **Recommendation:** Ensure handlers for potentially long operations are `async`. Use `await` for async operations. Break down long CPU-bound tasks or consider Web Workers.

## 14. Non-Descriptive Action Visuals or Missing Keywords

*   **Anti-Pattern:** Actions defined with generic/cryptic `title`, `subtitle`, `description`, or `icon`. Relevant `keywords` for palette searching are omitted.
*   **Impact:** Actions are hard for users to identify, understand, and discover.
*   **Recommendation:** Provide clear, concise, descriptive `title`s. Use `subtitle`/`description` for context. Assign appropriate `icon`s. Populate `keywords` for better searchability.

## 15. Leaking Action Sources (Improper Lifecycle Management)

*   **Anti-Pattern:** Dynamically registering `ActionsSource` instances (e.g., in component `setup` or `onMounted`) without ensuring they are reliably unregistered (e.g., in `onUnmounted`).
*   **Impact:** Accumulation of stale actions, potential hotkey conflicts, performance degradation, memory leaks.
*   **Recommendation:** Always pair `registerActionsSource` with `unregisterActionsSource` using the returned `symbol` key, especially for component-scoped or module-scoped actions.

By being mindful of these anti-patterns, you can build more robust, maintainable, and user-friendly applications with ActionCore, truly reflecting the principles of software craftsmanship.

---

End of ActionCore Documentation series.
