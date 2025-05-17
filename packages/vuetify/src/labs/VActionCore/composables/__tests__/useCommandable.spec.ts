import { ref, computed, nextTick, reactive, createApp, defineComponent } from 'vue';
import { describe, it, expect, beforeEach, afterEach, vi, type Mocked } from 'vitest';
import { useCommandable, type UseCommandableProps } from '../useCommandable'; // Adjust path if actual is different
import type { ActionCorePublicAPI, ActionDefinition, ActionsSource } from '../../types';

// --- Test Utils ---
/**
 * Helper to test composables that rely on lifecycle hooks or provide/inject.
 * Mounts a minimal component that uses the composable in its setup function.
 * @param composableFn A function that calls the composable and returns its result.
 * @returns {[ReturnType<typeof composableFn>, import('vue').App]} The result of the composable and the app instance.
 */
function withSetup<T>(composableFn: () => T): [T, import('vue').App] {
  let result: T;
  const app = createApp(defineComponent({
    setup() {
      result = composableFn();
      return () => {}; // Renderless component
    }
  }));
  app.mount(document.createElement('div'));
  // @ts-ignore: result is definitely assigned in setup
  return [result, app];
}

// Mock the ActionCore service with correct signatures using vi.fn<TFunc>()
const mockGetAction = vi.fn<ActionCorePublicAPI['getAction']>();
const mockExecuteAction = vi.fn<ActionCorePublicAPI['executeAction']>();
const mockRegisterActionsSource = vi.fn<ActionCorePublicAPI['registerActionsSource']>();
const mockUnregisterActionsSource = vi.fn<ActionCorePublicAPI['unregisterActionsSource']>();
const mockIsComponentIntegrationEnabled = vi.fn<ActionCorePublicAPI['isComponentIntegrationEnabled']>();
const mockDestroy = vi.fn<ActionCorePublicAPI['destroy']>();

const createMockCore = (): Mocked<ActionCorePublicAPI> => ({
  isLoading: ref(false),
  allActions: computed(() => []), // Use computed for correct type
  getAction: mockGetAction,
  executeAction: mockExecuteAction,
  registerActionsSource: mockRegisterActionsSource,
  unregisterActionsSource: mockUnregisterActionsSource,
  isComponentIntegrationEnabled: mockIsComponentIntegrationEnabled,
  destroy: mockDestroy,
});

describe('useCommandable', () => {
  let app: import('vue').App | null = null;
  let props: UseCommandableProps; // Define as reactive object type
  let mockCore: Mocked<ActionCorePublicAPI> | null;

  // Reactive ref to control the mock return value for isComponentIntegrationEnabled
  const mockIntegrationStatus = ref(true);

  beforeEach(() => {
    mockCore = createMockCore();
    // Reset all mock implementations and call counts before each test
    mockGetAction.mockReset();
    mockExecuteAction.mockReset();
    mockExecuteAction.mockResolvedValue(undefined);
    mockRegisterActionsSource.mockReset().mockReturnValue(Symbol('testSourceKey'));
    mockUnregisterActionsSource.mockReset();

    // Set up the mock for isComponentIntegrationEnabled to use the reactive ref
    // Also reset the ref's value for test isolation.
    mockIntegrationStatus.value = true;
    if (mockCore) { // Guard because mockCore is nullable in the outer scope, though always set here
      mockCore.isComponentIntegrationEnabled.mockImplementation(() => mockIntegrationStatus.value);
    }
    // mockIsComponentIntegrationEnabled.mockReset().mockReturnValue(true); // Old way, remove/replace

    mockDestroy.mockReset();
    props = reactive<UseCommandableProps>({});
  });

  afterEach(async () => {
    if (app) {
      app.unmount();
      app = null;
    }
    mockCore = null;
    await nextTick(); // Ensure any final effects from unmount are flushed
  });

  it('should initialize with non-commandable state if core is null', async () => {
    let composableResult;
    [, app] = withSetup(() => {
      composableResult = useCommandable(props, null, 'TestComponent');
      return composableResult;
    });
    const { isCommandable, commandAction, effectiveActionId, executeCommand } = composableResult!;

    expect(isCommandable.value).toBe(false);
    expect(commandAction.value).toBeUndefined();
    expect(effectiveActionId.value).toBeUndefined();
    await executeCommand();
    expect(mockExecuteAction).not.toHaveBeenCalled();
  });

  it('should initialize with non-commandable state if componentIntegration is disabled', async () => {
    mockIsComponentIntegrationEnabled.mockReturnValue(false);
    props.command = 'testAction'; // Modify reactive props directly
    let composableResult;
    [, app] = withSetup(() => {
      composableResult = useCommandable(props, mockCore, 'TestComponent');
      return composableResult;
    });
    const { isCommandable, commandAction, effectiveActionId, executeCommand } = composableResult!;

    expect(isCommandable.value).toBe(false);
    expect(commandAction.value).toBeUndefined();
    expect(effectiveActionId.value).toBeUndefined();
    await executeCommand();
    expect(mockExecuteAction).not.toHaveBeenCalled();
    expect(mockRegisterActionsSource).not.toHaveBeenCalled(); // Should not attempt to register if not commandable
  });

  describe('when command is a string (actionId)', () => {
    const actionId = 'myAction';
    const mockActionDef: ActionDefinition = { id: actionId, title: 'My Action', handler: vi.fn() };

    beforeEach(() => {
      mockGetAction.mockReset(); // Reset before each test in this describe block
      mockGetAction.mockReturnValue(mockActionDef); // Default for this block
      props.command = actionId;
    });

    it('should set effectiveActionId and resolve commandAction', async () => {
      let composableResult;
      [, app] = withSetup(() => {
        composableResult = useCommandable(props, mockCore, 'TestComponent');
        return composableResult;
      });
      const { isCommandable, commandAction, effectiveActionId } = composableResult!;

      await nextTick(); // Allow immediate watchers to run and set initial internalActionId

      expect(isCommandable.value).toBe(true);
      expect(effectiveActionId.value).toBe(actionId);

      // Access commandAction.value to ensure the computed property runs and calls getAction
      const resolvedAction = commandAction.value;
      await nextTick(); // Allow any chained effects from computed evaluation

      expect(mockGetAction).toHaveBeenCalledWith(actionId);
      expect(resolvedAction).toEqual(mockActionDef);
    });

    it('executeCommand should call core.executeAction with correct context', async () => {
      props.commandData = { custom: 'data' }; // Set commandData on reactive props
      let composableResult;
      [, app] = withSetup(() => {
        composableResult = useCommandable(props, mockCore, 'TestComponent');
        return composableResult;
      });
      const { executeCommand } = composableResult!;
      await nextTick();

      const domEvent = new MouseEvent('click');
      const contextOverrides = { trigger: 'override' as const }; // Test override
      await executeCommand(contextOverrides, domEvent);

      expect(mockExecuteAction).toHaveBeenCalledWith(actionId, {
        trigger: 'override', // Overridden
        event: domEvent,
        data: { custom: 'data' },
      });
    });

    it('should not register or unregister sources for string commands', async () => {
      let composableResult;
      [, app] = withSetup(() => {
        composableResult = useCommandable(props, mockCore, 'TestComponent');
        return composableResult;
      });
      await nextTick();

      props.command = 'otherAction'; // Modify reactive props
      await nextTick();
      props.command = undefined; // Modify reactive props
      await nextTick();

      expect(mockRegisterActionsSource).not.toHaveBeenCalled();
      expect(mockUnregisterActionsSource).not.toHaveBeenCalled();
      // Call unmount manually if using a helper that doesn't auto-unmount like in Vue Test Utils
      // For this direct composable test, onUnmounted hooks into Vue's lifecycle if run in setup.
      // To test onUnmounted directly here, we might need to simulate a component lifecycle.
    });
  });

  describe('when command is an ActionDefinition object (inline action)', () => {
    const inlineAction: ActionDefinition = { id: 'inlineAct', title: 'Inline Action', handler: vi.fn() };
    const anotherInlineAction: ActionDefinition = { id: 'anotherInline', title: 'Another Inline', handler: vi.fn() };

    it('should register the action with core on setup and set effectiveActionId', async () => {
      props.command = inlineAction; // Set reactive props
      mockGetAction.mockImplementation(id => id === inlineAction.id ? inlineAction : undefined);
      let composableResult;
      [, app] = withSetup(() => {
        composableResult = useCommandable(props, mockCore, 'TestComponent');
        return composableResult;
      });
      const { effectiveActionId, commandAction } = composableResult!;
      await nextTick();

      expect(mockRegisterActionsSource).toHaveBeenCalledTimes(1);
      expect(mockRegisterActionsSource).toHaveBeenCalledWith([inlineAction]);
      expect(effectiveActionId.value).toBe(inlineAction.id);
      expect(commandAction.value).toEqual(inlineAction);
    });

    it('executeCommand should call core.executeAction for the inline action', async () => {
      props.command = inlineAction;
      props.commandData = { item: 1 };
      mockGetAction.mockReturnValue(inlineAction); // Assume getAction will find it after registration
      let composableResult;
      [, app] = withSetup(() => {
        composableResult = useCommandable(props, mockCore, 'TestComponent');
        return composableResult;
      });
      const { executeCommand } = composableResult!;
      await nextTick();
      await executeCommand();

      expect(mockExecuteAction).toHaveBeenCalledWith(inlineAction.id, expect.objectContaining({ data: { item: 1 } }));
    });

    it('should unregister previous inline action and register new one if command prop object changes', async () => {
      props.command = inlineAction; // Initial value
      const symbol1 = Symbol('key1');
      const symbol2 = Symbol('key2');
      mockRegisterActionsSource.mockReturnValueOnce(symbol1).mockReturnValueOnce(symbol2);
      mockGetAction.mockImplementation(id => {
        if (id === inlineAction.id) return inlineAction;
        if (id === anotherInlineAction.id) return anotherInlineAction;
        return undefined;
      });

      let composableResult;
      [, app] = withSetup(() => {
        composableResult = useCommandable(props, mockCore, 'TestComponent');
        return composableResult;
      });
      const { effectiveActionId, commandAction } = composableResult!;
      await nextTick();
      expect(effectiveActionId.value).toBe(inlineAction.id);
      expect(mockRegisterActionsSource).toHaveBeenCalledWith([inlineAction]);

      props.command = anotherInlineAction; // Change reactive prop
      await nextTick();

      expect(mockUnregisterActionsSource).toHaveBeenCalledTimes(1);
      expect(mockUnregisterActionsSource).toHaveBeenCalledWith(symbol1);
      expect(mockRegisterActionsSource).toHaveBeenCalledTimes(2);
      expect(mockRegisterActionsSource).toHaveBeenCalledWith([anotherInlineAction]);
      expect(effectiveActionId.value).toBe(anotherInlineAction.id);
      expect(commandAction.value).toEqual(anotherInlineAction);
    });

    it('should unregister inline action when command prop becomes undefined', async () => {
      props.command = inlineAction;
      const symbolKey = Symbol('unmountKey');
      mockRegisterActionsSource.mockReturnValue(symbolKey);
      let composableResult;
      [, app] = withSetup(() => {
        composableResult = useCommandable(props, mockCore, 'TestComponent');
        return composableResult;
      });
      await nextTick();

      props.command = undefined; // Change reactive prop
      await nextTick();
      expect(mockUnregisterActionsSource).toHaveBeenCalledWith(symbolKey);
    });

     it('should unregister if isIntegrationEnabled becomes false', async () => {
      props.command = inlineAction;
      const symbolKey = Symbol('integrationToggleKey');
      mockRegisterActionsSource.mockReturnValue(symbolKey);

      let composableResult;
      let isCommandableRef: any; // To store the computed ref

      [, app] = withSetup(() => {
        composableResult = useCommandable(props, mockCore, 'TestComponent');
        isCommandableRef = composableResult.isCommandable; // Capture the computed
        return composableResult;
      });
      await nextTick(); // Initial setup watchers
      expect(mockRegisterActionsSource).toHaveBeenCalledTimes(1);
      expect(isCommandableRef.value).toBe(true); // Check initial state

      mockUnregisterActionsSource.mockClear();

      // mockIsComponentIntegrationEnabled.mockReturnValue(false); // Old way
      mockIntegrationStatus.value = false; // New way: Change via reactive system

      await nextTick(); // Allow Vue to re-evaluate computed props dependent on the mock

      expect(isCommandableRef.value).toBe(false); // Assert the computed prop has updated

      await nextTick(); // This nextTick is for the watcher on isCommandableRef
                         // to fire and call clearWatchersAndState

      expect(mockUnregisterActionsSource).toHaveBeenCalledTimes(1);
      expect(mockUnregisterActionsSource).toHaveBeenCalledWith(symbolKey);
    });

    // Test for deep watch on command object is tricky without knowing what ActionCore does
    // with mutated ActionDefinitions. Current composable logic re-registers if object ref changes.

    it('should unregister active inline action on component unmount', async () => {
      props.command = inlineAction; // Uses 'inlineAction' from this describe block's scope
      const symbolKeyOnMount = Symbol('mountUnmountKey');
      mockRegisterActionsSource.mockReturnValue(symbolKeyOnMount);

      // app is managed globally and set by withSetup
      [, app] = withSetup(() => {
        return useCommandable(props, mockCore, 'TestComponentLifecycle');
      });

      await nextTick(); // Allow command registration

      expect(mockRegisterActionsSource).toHaveBeenCalledWith([inlineAction]);
      // Ensure unregister hasn't been called prematurely
      const unregisterCallsBeforeUnmount = mockUnregisterActionsSource.mock.calls.length;

      if (!app) throw new Error("Test setup error: app instance not found for unmount.");
      app.unmount();
      app = null; // Prevent global afterEach from trying to unmount again

      await nextTick(); // Allow onUnmounted hook to run

      expect(mockUnregisterActionsSource).toHaveBeenCalledTimes(unregisterCallsBeforeUnmount + 1);
      expect(mockUnregisterActionsSource).toHaveBeenLastCalledWith(symbolKeyOnMount);
    });

    it('should re-process when a property of an inline ActionDefinition object (props.command) is mutated (deep watch)', async () => {
      const initialActionDef: ActionDefinition = { id: 'deepWatchAct', title: 'Initial Title', handler: vi.fn() };
      props.command = initialActionDef;

      // Simple mock store for actions that register/get operate on, make it reactive
      const mockActionStore = reactive<Record<string, ActionDefinition>>({});

      // Reset mocks for this specific test to use the mockActionStore
      mockRegisterActionsSource.mockReset().mockImplementation((source: ActionsSource) => {
        if (Array.isArray(source)) { // Check if it's the ActionDefinition[] case
          source.forEach(action => {
            mockActionStore[action.id] = { ...action }; // Store a copy
          });
        } else {
          // Handle or ignore other ActionsSource types if not relevant for this specific test
          // In the context of useCommandable, it always passes ActionDefinition[] for object commands.
          // So, other types aren't expected here unless the test is fundamentally changed.
          console.warn('[Test Mock] mockRegisterActionsSource in deepWatch test received non-array source type');
        }
        return Symbol('mockSourceKeyFromStoreImpl');
      });

      mockGetAction.mockReset().mockImplementation(id => {
        return mockActionStore[id] ? { ...mockActionStore[id] } : undefined; // Retrieve a copy
      });

      let composableResult;
      [, app] = withSetup(() => {
        composableResult = useCommandable(props, mockCore, 'TestComponentDeepWatch');
        return composableResult;
      });
      const { effectiveActionId, commandAction } = composableResult!;

      await nextTick(); // Initial registration due to immediate watcher

      // Check initial state in store and from composable
      expect(mockActionStore['deepWatchAct']?.title).toBe('Initial Title');
      expect(effectiveActionId.value).toBe('deepWatchAct');
      expect(commandAction.value?.title).toBe('Initial Title');

      const unregisterCallsBeforeMutation = mockUnregisterActionsSource.mock.calls.length;
      const registerCallsBeforeMutation = mockRegisterActionsSource.mock.calls.length;

      // Mutate the object referenced by props.command
      if (typeof props.command === 'object' && props.command !== null) {
        (props.command as ActionDefinition).title = 'Mutated Title!'; // Ensure type for mutation
      } else {
        throw new Error("Test setup error: props.command is not an object for mutation.");
      }

      await nextTick(); // Allow deep watcher to fire and re-process (calls unregister then register)

      // Check that unregister was called for the old source key (if any)
      // This part is tricky because the symbol is dynamic. We mostly care it was called once more.
      expect(mockUnregisterActionsSource).toHaveBeenCalledTimes(unregisterCallsBeforeMutation + 1);

      // Check that register was called again
      expect(mockRegisterActionsSource).toHaveBeenCalledTimes(registerCallsBeforeMutation + 1);

      // Check store and commandAction after mutation and re-registration
      expect(mockActionStore['deepWatchAct']?.title).toBe('Mutated Title!');
      expect(effectiveActionId.value).toBe('deepWatchAct'); // ID should remain the same
      expect(commandAction.value?.title).toBe('Mutated Title!');
    });
  });

  it('should update commandAction reactively when actionId changes or core.getAction updates', async () => {
    const action1: ActionDefinition = { id: 'action1', title: 'Action 1', handler: vi.fn() };
    const action2: ActionDefinition = { id: 'action2', title: 'Action 2', handler: vi.fn() };

    props.command = 'action1'; // Initial command
    mockGetAction.mockReturnValueOnce(action1); // For the first call

    let composableResult;
    [, app] = withSetup(() => {
      composableResult = useCommandable(props, mockCore, 'TestComponent');
      return composableResult;
    });
    const { commandAction, effectiveActionId } = composableResult!;
    await nextTick();
    expect(effectiveActionId.value).toBe('action1');
    expect(commandAction.value).toEqual(action1); // Initial state check
    expect(mockGetAction).toHaveBeenCalledWith('action1');

    // Change the command prop
    mockGetAction.mockClear(); // Clear previous calls
    mockGetAction.mockReturnValueOnce(action2); // Setup mock for the next call
    props.command = 'action2';
    await nextTick(); // Allow watcher for props.command to update internalActionId

    expect(effectiveActionId.value).toBe('action2'); // Check internalActionId updated

    // Access commandAction.value to trigger re-computation if lazy
    const updatedAction = commandAction.value;
    await nextTick(); // Allow computed to re-evaluate and call getAction

    expect(mockGetAction).toHaveBeenCalledWith('action2');
    expect(updatedAction).toEqual(action2);
  });

  it('should correctly use commandData from props when executing', async () => {
    const actionId = 'dataAction';
    const initialCommandData = { info: 'test data' };
    props.command = actionId;
    props.commandData = initialCommandData;

    let composableResult;
    [, app] = withSetup(() => {
      composableResult = useCommandable(props, mockCore, 'TestComponent');
      return composableResult;
    });
    const { executeCommand } = composableResult!;
    await nextTick();

    await executeCommand();
    expect(mockExecuteAction).toHaveBeenCalledWith(actionId, expect.objectContaining({ data: initialCommandData }));

    const newCommandData = { info: 'new data' };
    props.commandData = newCommandData; // Change reactive props
    await nextTick();
    await executeCommand();
    expect(mockExecuteAction).toHaveBeenCalledWith(actionId, expect.objectContaining({ data: newCommandData }));
  });

});
