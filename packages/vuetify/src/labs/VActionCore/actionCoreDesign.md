# ActionCore Design Document

## This document captures the implementation design for ActionCore, separate from the requirements specification.

### Architecture Overview

ActionCore maintains two primary indexes to manage actions and key bindings:

1. **Action Index**: Maps action IDs to ActionDefinition objects
2. **Binding Index**: Maps hotkey strings to action IDs using a bucket strategy

### ActionDefinition Interface

```typescript
interface ActionDefinition {
  id: string;                    // Unique identifier (required)
  title: string;                 // Display title (required)
  description?: string;          // Optional description
  icon?: string;                 // Optional icon identifier
  category?: string;             // Optional category for grouping
  hotkey?: string;               // Optional hotkey binding
  disabled?: boolean;            // Optional disabled state
  visible?: boolean;             // Optional visibility state
  handler?: (context: ActionContext) => void | Promise<void>; // Handler function receives full context
  runInTextInput?: boolean | ((element: HTMLElement) => boolean); // Input context control
  preventDefault?: boolean;      // Prevent default browser behavior
  stopPropagation?: boolean;     // Stop event propagation
  subItems?: ActionDefinition[] | (() => Promise<ActionDefinition[]>); // Nested actions
}

interface ActionContext {
  trigger: 'keyboard' | 'ui' | 'programmatic' | 'search-result';
  event?: KeyboardEvent | MouseEvent;
  data?: any; // Additional context data
  searchResult?: SearchResult; // Available when triggered from search results
}
```

### Dual Index System

#### Action Index
- Simple Map: `actionId -> ActionDefinition`
- Provides O(1) lookup for action details
- Updated when actions are registered/unregistered

#### Binding Index (LIFO Bucket Strategy)
- Map: `hotkeyString -> actionId[]` (array acts as bucket)
- Last actionId added to bucket (LIFO) is the active binding
- Enables collision detection and resolution
- Example: `"Ctrl+s" -> ["save-file", "save-document"]` (save-document is active)

### Component Integration APIs

#### Query API
```typescript
interface ActionCorePublicAPI {
  getAction(actionId: string): ActionDefinition | undefined;
  getEffectiveHotkey(actionId: string): string | undefined;
  getAllActions(): readonly ActionDefinition[];
  getVisibleActions(): readonly ActionDefinition[];

  // Debugging and hotkey map support
  getAllActionsWithHotkeys(): readonly (ActionDefinition & { effectiveHotkey?: string })[];
  getHotkeyMap(): Record<string, ActionDefinition>; // hotkey -> action mapping
  getActionRegistry(): { actions: ActionDefinition[]; bindings: Record<string, string[]> }; // Complete registry state
  exportHotkeyData(): { actions: any[]; bindings: any[] }; // Export for documentation/debugging

  // Programmatic execution
  executeAction(actionId: string, context?: Partial<ActionContext>): Promise<void>;

  // Component action registration (general purpose)
  registerComponentActions(componentId: string, actions: ActionDefinition[]): void;
  unregisterComponentActions(componentId: string): void;
}
```

#### useKeyBindings Integration
- ActionCore uses useKeyBindings composable to manage its own hotkey bindings
- ActionCore maintains binding index and detects collisions through its useKeyBindings instance
- Binding context changes are applied through ActionCore's useKeyBindings configuration

### Binding Context System (Rework)

**Previous Term**: "Profiles" (acknowledged as poor terminology)
**Current Term**: "Binding Contexts"

#### Use Cases
1. User-customizable hotkey bindings
2. Keyboard layout adaptation (internationalization)
3. Context-dependent binding sets
4. Accessibility compliance modes

#### Design Approach
- ActionCore maintains base action definitions
- Binding contexts overlay modifications (hotkey overrides, disabled states)
- Components receive computed final state
- No context awareness needed in components or useKeyBindings

### Navigation Action Management

Components may register temporary actions that are automatically cleaned up when the component unmounts. These actions follow the same registration and execution patterns as regular actions.

### Collision Detection Algorithm

1. **Registration Phase**:
   - Check if hotkey already exists in binding index
   - If exists, add actionId to bucket (LIFO)
   - Emit warning about collision

2. **Resolution Phase**:
   - Always use last actionId in bucket (most recent registration)
   - Provide utilities to query collision status

3. **Binding Context Application**:
   - Apply binding context changes to effective bindings
   - Re-evaluate collisions with new hotkey assignments

### Performance Considerations

- **Search Debouncing**: Configurable delays for search queries
- **Result Caching**: Cache search results with context-aware invalidation
- **Lazy Loading**: Support pagination for large result sets
- **Memory Management**: Cleanup of search subscriptions and cached results

### Error Handling Strategy

- **Provider Isolation**: Search provider errors don't affect other providers or ActionCore
- **Graceful Degradation**: System continues to work if some providers fail
- **Timeout Handling**: Configurable timeouts prevent hanging searches
- **Action Error Handling**: Action execution errors are handled by individual action handlers

### Search Provider System

#### Search Provider Interface
```typescript
interface SearchProvider {
  id: string; // Unique provider identifier
  search(query: string, context: ApplicationContext): Promise<SearchResult[]>;
  getActions?(result: SearchResult, context: ApplicationContext): ActionDefinition[];
  priority?: number | ((context: ApplicationContext) => number); // Static or context-dependent priority
  timeout?: number; // Query timeout in ms
  groups?: SearchProviderGroup[]; // Available result groups
  componentId?: string; // Optional component ID for lifecycle management
}

interface SearchProviderGroup {
  id: string;
  title: string;
  priority?: number;
  icon?: string;
  separator?: boolean;
}

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  category?: string;
  type: string; // user, issue, team, project, etc.
  data: any; // Provider-specific data
  actions?: string[]; // ActionIDs that can be executed with this result as context
  priority?: number;
  group?: string; // Group ID for organizing results
}

interface ApplicationContext {
  view?: string; // Current view/page
  selectedItems?: any[];
  currentUser?: any;
  permissions?: string[];
  entityContext?: { [key: string]: any }; // Current issue, project, etc.
  custom?: { [key: string]: any }; // Application-specific context
}
```

#### Search Orchestration
- ActionCore maintains registry of search providers and provides them to VCommandPalette
- VCommandPalette coordinates parallel execution of provider queries with timeout handling
- Result merging with configurable priority and grouping rules
- Error isolation - failed providers don't break other results

#### Component-Based Provider Management
```typescript
// Component registration pattern
const useContextualSearch = (componentId: string, providers: SearchProvider[]) => {
  onMounted(() => {
    providers.forEach(provider => {
      actionCore.registerSearchProvider({
        ...provider,
        componentId: componentId
      });
    });
  });

  onUnmounted(() => {
    actionCore.unregisterSearchProvidersByComponent(componentId);
  });
};

// Usage in components
export default defineComponent({
  setup() {
    useContextualSearch('issue-detail-page', [
      {
        id: 'issue-comments',
        search: (query, context) => searchIssueComments(query, context.currentIssue),
        priority: (context) => context.view === 'issue-detail' ? 10 : 1,
        groups: [{ id: 'comments', title: 'Comments', priority: 1 }]
      }
    ]);
  }
});
```

#### Context-Aware Result Ordering
```typescript
// Dynamic priority calculation based on context
interface PriorityCalculator {
  calculateProviderPriority(provider: SearchProvider, context: ApplicationContext): number;
  calculateResultPriority(result: SearchResult, context: ApplicationContext): number;
  mergeResults(providerResults: Map<SearchProvider, SearchResult[]>, context: ApplicationContext): SearchResult[];
}

// Example context-aware ordering
const orderResults = (results: SearchResult[], context: ApplicationContext) => {
  const priorityMap = {
    'issue-detail': { issues: 10, comments: 9, users: 8, teams: 7 },
    'team-view': { teams: 10, users: 9, issues: 8, comments: 7 },
    'user-profile': { users: 10, issues: 9, teams: 8, comments: 7 }
  };

  const contextPriorities = priorityMap[context.view] || {};

  return results.sort((a, b) => {
    const aPriority = contextPriorities[a.type] || 5;
    const bPriority = contextPriorities[b.type] || 5;
    return bPriority - aPriority;
  });
};
```

### Context Management System

#### Context State Management
```typescript
interface ContextManager {
  current: Ref<ApplicationContext>;
  updateContext(updates: Partial<ApplicationContext>): void;
  subscribeToUpdates(callback: (context: ApplicationContext) => void): () => void;
  mergeContexts(base: ApplicationContext, override: Partial<ApplicationContext>): ApplicationContext;
}
```

#### Context Update Strategies
- **Immediate**: Context changes trigger immediate search provider updates
- **Debounced**: Context changes are debounced to avoid excessive queries
- **Manual**: Applications control when context updates trigger searches

### Result Integration and Ordering

#### Result Merging Strategy
1. **Provider Priority**: Each provider has configurable priority
2. **Result Priority**: Individual results can override provider priority
3. **Type Grouping**: Results grouped by type (actions, users, issues, etc.)
4. **Custom Sorting**: Developers can provide custom sort functions

#### Ordering Configuration
```typescript
interface ResultOrdering {
  groupBy?: 'type' | 'provider' | 'category' | ((result: SearchResult | ActionDefinition) => string);
  sortBy?: 'priority' | 'relevance' | 'alphabetical' | ((a: any, b: any) => number);
  actionPriority?: 'first' | 'last' | 'mixed';
  customGroups?: { [groupKey: string]: { title: string; priority: number } };
}
```

### Component Integration Points

#### VCommandPalette Integration
- VCommandPalette can request application context from ActionCore
- VCommandPalette can execute actions through ActionCore
- VCommandPalette can get search providers from ActionCore when integrated, or manage them independently via props
- Handles dynamic action execution through ActionCore

#### Search Provider Registration
```typescript
// In ActionCore
interface ActionCorePublicAPI {
  // ... existing methods ...

  // Context management
  getContext(): ApplicationContext;
  updateContext(updates: Partial<ApplicationContext>): void;

  // Search provider integration
  registerSearchProvider(provider: SearchProvider): void;
  unregisterSearchProvider(providerId: string): void;
  unregisterSearchProvidersByComponent(componentId: string): void;
  getActiveSearchProviders(): readonly SearchProvider[];

  // External action execution
  executeActionWithContext(actionId: string, context: Partial<ActionContext>): Promise<void>;
}
```

#### Dynamic Action Generation
```typescript
// Search result specifies actionIds that can be executed
{
  id: "user-john-doe",
  title: "John Doe",
  type: "user",
  data: { userId: "123", email: "john@example.com" },
  actions: ["assign-issue", "view-user-issues", "navigate-to-user"]
}

// ActionCore validates actionIds exist and executes with context
actionCore.executeAction("assign-issue", {
  trigger: "search-result",
  searchResult: result,
  targetUser: result.data
});
```

#### Search Provider Grouping Integration
```typescript
// Search providers can define groups that integrate with ActionCore groups
const issueSearchProvider: SearchProvider = {
  id: 'issue-search',
  groups: [
    { id: 'current-sprint', title: 'Current Sprint', priority: 10 },
    { id: 'backlog', title: 'Backlog', priority: 5 },
    { id: 'archived', title: 'Archived', separator: true, priority: 1 }
  ],
  search: async (query, context) => {
    const results = await searchIssues(query);
    return results.map(issue => ({
      ...issue,
      group: issue.sprint === context.currentSprint ? 'current-sprint' :
             issue.status === 'archived' ? 'archived' : 'backlog'
    }));
  }
};
```
