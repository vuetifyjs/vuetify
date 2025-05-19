# Vuetify ActionCore Documentation

Welcome to the official documentation for ActionCore, Vuetify's powerful and flexible system for managing user interactions, commands, and application-wide actions.

ActionCore is designed for developers who strive for excellence in user experience, offering a centralized, robust, and highly configurable approach to handling everything from simple button clicks and hotkeys to complex, context-aware command execution. Whether you're building a simple utility or a feature-rich professional application, ActionCore provides the tools to implement sophisticated interactions with clarity and precision.

## Philosophy

At its heart, ActionCore embodies the principles of:

*   **Centralization:** Manage all user-triggerable operations from a single, coherent system.
*   **Decoupling:** Separate action definitions and their logic from the UI components that trigger them.
*   **Reusability:** Define an action once and invoke it from multiple places – buttons, list items, hotkeys, a command palette, or even programmatically.
*   **Testability:** Simplify testing of action logic independent of UI rendering.
*   **User Empowerment:** Enable rich keyboard-driven interactions, accessibility, and consistent command patterns across your application.
*   **Developer Craftsmanship:** Provide a system that encourages thoughtful design of user interactions and promotes clean, maintainable code.

## Table of Contents

This documentation is structured to guide you from foundational concepts to advanced techniques:

1.  [**Introduction to ActionCore**](./01-introduction.md)
    *   What is ActionCore? Why use it? Core benefits and guiding principles.
2.  [**Defining Actions (`ActionDefinition`)**](./02-defining-actions.md)
    *   A deep dive into the `ActionDefinition` interface, the cornerstone of ActionCore. Covers all properties, reactive capabilities, and examples of simple and asynchronous handlers.
3.  [**Action Sources (`ActionsSource`)**](./03-action-sources.md)
    *   Understanding how actions are provided to ActionCore, including static arrays, reactive `Ref`s, and dynamic functions. Covers registration, unregistration, and lifecycle management.
4.  [**Mastering Hotkeys**](./04-hotkeys.md)
    *   Comprehensive guide to defining hotkeys: single keys, combinations, sequences, platform-specific considerations (`meta` vs. `ctrl`), advanced options, and behavior in text inputs.
5.  [**Executing Actions & Context**](./05-action-execution.md)
    *   How actions are invoked via `actionCore.executeAction()`, understanding the `ActionContext`, and patterns for programmatic execution.
6.  [**Action Profiling (Modes & Overrides)**](./06-action-profiling.md)
    *   Leveraging ActionCore's profiling feature to create different behavior modes (e.g., beginner/advanced) by overriding action properties like hotkeys, titles, or handlers.
7.  [**Sub-Items & Nested Commands**](./07-sub-items-and-nesting.md)
    *   Creating actions that act as groups or menus, exposing `subItems` for UIs like command palettes or nested menus.
8.  [**AI Integration**](./08-ai-integration.md)
    *   Making your actions discoverable and invocable by AI assistants, including parameter definitions (`parametersSchema`) and AI-specific metadata.
9.  [**Component Integration**](./09-component-integration.md)
    *   Recommended application-level strategies for connecting ActionCore to your UI. Covers triggering actions, reflecting action state, and detailed patterns for navigation, buttons, list items, and batch operations.
10. [**Best Practices for Quality Actions**](./10-best-practices.md)
    *   Principles and tips for designing robust, user-friendly, and maintainable actions.
11. [**Common Anti-Patterns**](./11-anti-patterns.md)
    *   Pitfalls to avoid when working with ActionCore, ensuring your implementation remains clean, performant, and predictable.

We encourage you to explore these documents thoroughly. By understanding the depth and capabilities of ActionCore, you can significantly elevate the interactivity and professional quality of your Vuetify applications.
