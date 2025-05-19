# 8. AI Integration: Empowering Intelligent Assistants (Experimental)

**Status: Experimental**

> The AI integration features within ActionCore are currently experimental and **not recommended for production use**. They are subject to change, and their stability is not guaranteed.

ActionCore is designed with future AI-driven interaction in mind. This document outlines how to prepare your actions for potential AI consumption and how such integration might work, **if enabled**.

## Enabling AI Features (Feature Flag)

To use any AI-related capabilities of ActionCore, you **must** explicitly enable them via the `ai` option in `ActionCoreOptions` during initialization:

```typescript
import { useActionCore } from '@/labs/VActionCore'; // Adjust path as needed

// When initializing ActionCore (e.g., in a Vuetify plugin or global setup)
const actionCore = useActionCore({
  // Option 1: Simple boolean
  ai: true,

  // Option 2: Object with enabled flag (allows for future AI-specific sub-configurations)
  // ai: { enabled: true },

  // ... other ActionCore options
});
```

If the `ai` option is not provided, is set to `false`, or if `ai.enabled` is `false`, all AI-specific functionalities within ActionCore (such as `getDiscoverableActions`) will be disabled and typically return empty results or perform no AI-specific operations.

## Core Concepts for AI Discoverability

When AI features are enabled, ActionCore can expose certain actions to an AI system, allowing the AI to understand what actions are available and potentially trigger them based on user intent.

### 1. `ActionDefinition.ai` Metadata Block

To make an action potentially discoverable by an AI, you add an `ai` metadata block to its `ActionDefinition`:

```typescript
// From types.ts (illustrative)
interface AIActionExample {
  description?: string; // e.g., "Schedule a meeting for tomorrow at 2 PM with Jane"
  request?: Record<string, any>; // e.g., { "invitee": "Jane", "dateTime": "YYYY-MM-DDTHH:mm:ss" }
  responsePreview?: string; // e.g., "Meeting scheduled with Jane Doe."
}

interface AIActionMetadata {
  accessible?: boolean;      // Default: true if 'ai' block exists and this is undefined.
  scope?: string | string[]; // e.g., 'user', 'admin', 'document-editing'. For filtering.
  usageHint?: string;        // Brief phrase for AI to understand when this action is relevant (e.g., "saves the current work").
  examples?: AIActionExample[]; // Structured examples for AI understanding.
}

interface ActionDefinition {
  // ... other properties: id, title, handler, etc.
  ai?: AIActionMetadata;
  parametersSchema?: Record<string, any>; // JSON Schema for handler parameters
}
```

*   **`accessible?: boolean`**: Explicitly controls if the AI can discover/use this action. If the `ai` block exists but `accessible` is `undefined`, it defaults to `true`. Set to `false` to hide from AI even if other AI metadata is present.
*   **`scope?: string | string[]`**: Defines one or more "scopes" or capabilities associated with this action (e.g., `'calendar.write'`, `['files.read', 'files.search']`). An AI client can query for actions matching its own `allowedScopes`.
*   **`usageHint?: string`**: A natural language hint for the AI, more detailed than the action's general `description`. It can explain nuances, prerequisites, or effects specific to AI invocation (e.g., `"Use to schedule new appointments. Ensure dateTime is in ISO 8601 format."`).
*   **`examples?: AIActionExample[]`**: Provides concrete, structured examples of how the action might be invoked. This helps the AI map user intent to specific actions and understand parameter structures.
    *   **Example:**
        ```typescript
        examples: [{
          description: "Email Bob about the project update for tomorrow's meeting",
          request: {
            recipient: "bob@example.com",
            subject: "Project Update for Tomorrow's Meeting",
            body: "Hi Bob, quick reminder about the project update..."
          }
        }]
        ```

### 2. `ActionDefinition.parametersSchema`

If an action's `handler` expects specific input data (via `ActionContext.data`), you define its structure using a JSON Schema object in the `parametersSchema` property. This allows an AI to understand what data is needed, validate it, and potentially gather it from the user before execution.

```typescript
// Example: parametersSchema for an action that creates a calendar event
parametersSchema: {
  type: 'object',
  properties: {
    eventName: { type: 'string', description: 'The name or title of the event' },
    date: { type: 'string', format: 'date', description: 'The date of the event' },
    time: { type: 'string', format: 'time', description: 'The time the event starts' },
    attendees: { type: 'array', items: { type: 'string', format: 'email' }, description: 'List of attendee email addresses' }
  },
  required: ['eventName', 'date']
}
```

### 3. Discovering Actions: `actionCore.getDiscoverableActions()`

When AI features are enabled, this method is the primary way for an AI system to query ActionCore for available commands.

```typescript
// Method signature from ActionCorePublicAPI
// getDiscoverableActions(aiContext: { allowedScopes?: string[] }): DiscoverableActionInfo[];

// AI orchestrator calls this (assuming AI features are enabled in ActionCore options)
const discoverableActions = actionCore.getDiscoverableActions({
  // Optionally filter by scope, if the AI knows the current context
  // allowedScopes: ['document-editing', 'user.profile']
});
```

**Logic of `getDiscoverableActions()`:**

1.  **Checks AI Feature Flag:** If AI features are not enabled in `ActionCoreOptions`, returns an empty array.
2.  **Iterates Effective Actions:** Considers all registered actions, with any active profile overrides applied.
3.  **Filters based on AI Metadata:**
    *   Action must have an `ai` metadata block defined.
    *   `action.ai.accessible` must not be explicitly `false`.
    *   **Scope Matching:** If `action.ai.scope` is defined, there must be at least one common scope between the action's declared scopes and the `aiContext.allowedScopes` provided by the AI. If `action.ai.scope` is undefined, it's considered globally accessible (subject to `ai.accessible`). If `aiContext.allowedScopes` is empty or undefined, only actions without a specific scope (or globally accessible ones) might be returned, depending on interpretation.
4.  **Maps to `DiscoverableActionInfo`:** Filtered actions are mapped to the `DiscoverableActionInfo` format.

### 4. `DiscoverableActionInfo` Structure

This is a sanitized and simplified version of `ActionDefinition`, designed for AI consumption. It excludes sensitive or irrelevant information like `handler` functions, `hotkey` details, or `subItems` functions.

```typescript
// From types.ts (illustrative)
interface DiscoverableActionInfo {
  id: string;
  title: string; // Resolved title (if Ref)
  description?: string; // Resolved description (if Ref)
  parametersSchema?: Record<string, any>;
  ai?: { // Subset of AIActionMetadata relevant for discovery
    scope?: string | string[];
    usageHint?: string;
    examples?: AIActionExample[];
  };
}
```

## Security and Authorization

*   **Discovery vs. Execution:** The `ai` metadata (like `scope` and `accessible`) and `getDiscoverableActions` primarily control what an AI *knows about* and can *attempt to call*. They are **not** a substitute for robust security checks within each action's `handler` or `canExecute` function.
*   **Handler-Level Validation (CRITICAL):** Action handlers **must always** perform their own validation of `ActionContext.data` and conduct thorough authorization checks before executing any sensitive operations, especially if the `context.trigger` indicates an AI source.
*   Never trust that data coming from an AI (even if it used `parametersSchema`) is inherently safe.

## Best Practices for AI-Ready Actions

*   **Be Explicit:** Clearly define `parametersSchema` for all actions intended for AI.
*   **Write Helpful `usageHint`s:** Think from the AI's perspective. What does it need to know to use this action effectively?
*   **Provide Good `examples`:** Structured `AIActionExample` objects are invaluable for AI to understand parameters and typical use cases.
*   **Scope Appropriately:** Use `ai.scope` to create logical capability groups. Don't grant overly broad scopes.
*   **Prioritize Security in Handlers:** This cannot be overstated. All action handlers must be robustly secured.

## Future Possibilities (Conceptual)

*   AI automatically prompting users for missing parameters based on `parametersSchema`.
*   AI chaining multiple actions together to fulfill complex user requests.
*   Natural language invocation of actions through a central AI interface.

By structuring your actions with these AI considerations (and enabling the feature flag when ready to experiment), you make them more robust and prepare your application for more advanced interaction models.

---

Next: [**Component Integration (Revised)**](./09-component-integration.md)
