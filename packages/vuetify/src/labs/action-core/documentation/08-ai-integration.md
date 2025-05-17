# 8. AI Integration: Empowering Intelligent Assistants

ActionCore is designed not only for direct user interaction but also to serve as a robust backend for intelligent assistants, such as AI-powered chatbots or voice command systems. By providing clear metadata and parameter definitions, you can make your application's capabilities discoverable and safely invocable by AI.

This empowers AI to understand what actions are available, what data they need, and how to request their execution, opening up new avenues for sophisticated user interaction.

## Key Components for AI Integration

Two main additions to `ActionDefinition` facilitate AI integration:

1.  **`parametersSchema?: Record<string, any>` (JSON Schema)**
2.  **`ai?: AIActionMetadata`**

### 1. `parametersSchema`: Defining Expected Data

*   **Purpose:** To describe the expected structure and types of the `data` object that an action's `handler` expects in its `ActionContext` when invoked by an AI.
*   **Type:** An object conforming to the [JSON Schema](https://json-schema.org/) specification.
*   **Importance:** This schema is crucial for an AI to understand what parameters it needs to extract from a user's natural language request and how to format them for the action.

*   **Example:** For an action like `"email.send"`:
    ```typescript
    parametersSchema: {
      type: 'object',
      properties: {
        recipient: {
          type: 'string',
          format: 'email',
          description: 'The email address of the primary recipient.'
        },
        subject: {
          type: 'string',
          description: 'The subject line of the email.'
        },
        body: {
          type: 'string',
          description: 'The main content of the email.'
        },
        priority: {
          type: 'integer',
          enum: [1, 2, 3], // 1=High, 2=Normal, 3=Low
          description: 'Optional priority for the email.'
        }
      },
      required: ['recipient', 'subject', 'body']
    }
    ```
    From this, an AI can understand that `recipient`, `subject`, and `body` are mandatory strings, and `recipient` should be a valid email format.

### 2. `ai?: AIActionMetadata`: Guiding AI Interaction

*   **Purpose:** To provide metadata specifically for AI interaction. If this block is absent, the action is generally considered not accessible or relevant to AI by default (unless `getDiscoverableActions` has a different fallback).
*   **Interface `AIActionMetadata`:**
    ```typescript
    interface AIActionMetadata {
      accessible?: boolean; // Default: true if 'ai' block exists & this is undefined
      scope?: string | string[]; // Scopes required/associated with this action
      usageHint?: string; // Detailed hint for AI on when/how to use
      examples?: Array<{ // Example invocations
        description?: string; // e.g., "Schedule a meeting for tomorrow at 2 PM"
        request?: Record<string, any>; // e.g., { "invitee": "Jane", "dateTime": "..." }
        responsePreview?: string; // e.g., "Meeting scheduled with Jane Doe."
      }>;
    }
    ```

    *   **`accessible?: boolean`**: Explicitly controls if the AI can discover/use this action. If the `ai` block exists but `accessible` is `undefined`, it defaults to `true`. Set to `false` to hide from AI even if other AI metadata is present.
    *   **`scope?: string | string[]`**: Defines one or more "scopes" or capabilities associated with this action. An AI client will typically query for actions matching its own `allowedScopes`. This is a primary filtering mechanism.
        *   **Example:** `scope: 'calendar.write'` or `scope: ['files.read', 'files.search']`.
    *   **`usageHint?: string`**: A natural language hint for the AI, more detailed than the action's general `description`. It can explain nuances, prerequisites, or effects specific to AI invocation. Markdown is allowed.
        *   **Example:** `"Use to schedule new appointments. Ensure dateTime is in ISO 8601 format. Will send notifications to attendees by default."`
    *   **`examples?: Array<{...}>`**: Provides concrete examples of how the action might be invoked by an AI, including a natural language `description` of the user's intent, the structured `request` data (which should conform to `parametersSchema`), and an optional `responsePreview`.
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

**Note on Action Profiles:** Both `parametersSchema` and the entire `ai` metadata block can be overridden by an active action profile if defined in `ActionDefinition.profiles[profileName].parametersSchema` or `.ai` respectively.

## Discovering Actions: `actionCore.getDiscoverableActions()`

ActionCore provides a dedicated method for AI clients to query for actions they are permitted to use:

```typescript
// From ActionCorePublicAPI interface
export interface ActionCorePublicAPI {
  // ... other methods
  getDiscoverableActions(aiContext: { allowedScopes?: string[] }): DiscoverableActionInfo[];
}

// Structure of returned information
export interface DiscoverableActionInfo {
  id: string;
  title: string;
  description?: string;
  parametersSchema?: Record<string, any>;
  ai?: {
    scope?: string | string[];
    usageHint?: string;
    examples?: AIActionExample[];
  };
}
```

*   **`aiContext.allowedScopes?: string[]`**: An array of scope strings that the AI is currently operating under. This is matched against `action.ai.scope`.
*   **Return Value:** An array of `DiscoverableActionInfo` objects. This is a **sanitized version** of `ActionDefinition`, containing only fields relevant and safe for AI consumption. Crucially, it **excludes** properties like `handler`, `subItems` functions, `canExecute` functions, `hotkey`, `hotkeyOptions`, and most general `meta` properties (unless explicitly part of the `ai` block like `usageHint`, `examples`).

**Logic of `getDiscoverableActions()`:**

1.  Iterates through all registered (and effective, considering profiles) actions.
2.  Filters actions based on:
    *   Presence of an `ai` metadata block (`action.ai` must be defined).
    *   `action.ai.accessible` must not be explicitly `false`.
    *   **Scope Matching:**
        *   If `action.ai.scope` is defined:
            *   If `aiContext.allowedScopes` is empty or undefined, the action is excluded (AI needs explicit scope permission for scoped actions).
            *   Otherwise, there must be at least one common scope between `action.ai.scope` (normalized to an array) and `aiContext.allowedScopes`.
        *   If `action.ai.scope` is undefined: The action is included if `ai.accessible` allows it (considered globally accessible to AI within its accessibility flag, provided the AI client doesn't *only* ask for specific scopes).
3.  Maps the filtered `ActionDefinition`s to `DiscoverableActionInfo`, selecting only the necessary and safe fields.

## Security & Execution Flow: A Craftsman's Duty

While ActionCore provides tools for AI discovery and invocation, **security remains paramount and is ultimately the developer's responsibility within the action handler.**

*   **Discovery vs. Execution:** `getDiscoverableActions()` and its scope mechanism control what an AI *knows about* and can *attempt to call*. They are **not** a substitute for robust security checks within the action's `handler`.
*   **`ActionCore.executeAction(actionId, context)`:** This remains the sole entry point for all action executions, including those triggered by AI.
    *   The AI client, after discovery, will formulate the `actionId` and the `context.data` payload (based on `parametersSchema`).
    *   The `context.trigger` should be set to a specific value like `'ai_assistant'` by the AI client.
*   **`canExecute` Still Applies:** The action's `canExecute(context)` method (if defined) will **still be checked by ActionCore** before running the handler. This provides an important layer of UI-state-based or fine-grained permission control that operates independently of AI discovery scopes.
*   **Handler-Level Validation & Authorization (CRITICAL):**
    *   Action handlers for any sensitive operations **must always** perform their own validation of `context.data` and conduct thorough authorization checks.
    *   If `context.trigger === 'ai_assistant'`, handlers might apply even stricter validation or require additional confirmation steps, depending on the action's nature.
    *   Never trust that data coming from an AI (even if it used `parametersSchema`) is inherently safe or that the AI's intent is always perfectly aligned with user expectations or security policies.

**In essence: AI discovery scopes limit awareness; action handlers ensure safety.**

## Crafting AI-Ready Actions

*   **Be Explicit:** Clearly define `parametersSchema` for all actions intended for AI.
*   **Write Helpful `usageHint`s:** Think from the AI's perspective. What does it need to know to use this action effectively and avoid mistakes?
*   **Provide Good `examples`:** Concrete examples are invaluable for AI to understand parameter structure and typical use cases.
*   **Scope Appropriately:** Use `ai.scope` to create logical capability groups. Don't grant overly broad scopes.
*   **Iterate and Test:** Simulate AI interactions (as seen in `ScenarioAIDiscovery.vue`) to verify that `getDiscoverableActions` returns what you expect and that your schemas and hints are effective.
*   **Prioritize Security in Handlers:** This cannot be overstated. All action handlers, especially those accessible to AI, must be robustly secured.

By thoughtfully integrating these AI-specific features, you can extend the power and reach of your ActionCore-managed functionalities, enabling novel and intelligent ways for users to interact with your application.

---

Next: [**Component Integration**](./09-component-integration.md)
