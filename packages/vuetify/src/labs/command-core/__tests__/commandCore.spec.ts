import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ref, computed, nextTick, watch } from 'vue';
import { useCommandCore, destroyCommandCoreInstance } from '../commandCore';
import type { CommandCoreOptions } from '../commandCore';
import type { ActionDefinition, ActionContext, ActionsSource } from '../types';
import { useKeyBindings } from '../useKeyBindings';

// Mock useKeyBindings
// We need to be able to assert that its methods (like on, stop) are called,
// and control what its reactive properties return if needed.
const mockKeyBindingsOn = vi.fn();
const mockKeyBindingsStop = vi.fn();
const mockKeyBindingsInstance = {
  on: mockKeyBindingsOn,
  stop: mockKeyBindingsStop,
  keys: new Proxy({}, { get: () => ref(false) }), // Default proxy for keys.*.value
  pressedKeys: ref(new Set()),
  currentSequence: ref([]),
  getKeyState: vi.fn(() => ref(false)),
  isCombinationActive: vi.fn(() => computed(() => false)),
  isListening: ref(true),
  start: vi.fn(), // Though commandCore calls it internally, not directly tested via commandCore
};

vi.mock('../useKeyBindings', () => ({
  useKeyBindings: vi.fn(() => mockKeyBindingsInstance),
}));

// This will now be the primary helper for all tests in this file.
const createActionDef = (id: string, props: Partial<ActionDefinition> = {}): ActionDefinition => ({
  id,
  title: `Action ${id}`,
  handler: vi.fn(),
  keywords: undefined,
  description: undefined,
  subtitle: undefined,
  icon: undefined,
  hotkey: undefined,
  runInTextInput: undefined, // Default to undefined, which is a valid assignable type to the field
  canExecute: undefined,
  subItems: undefined,
  meta: undefined,
  order: undefined,
  disabled: undefined,
  ...props, // User-provided props will override defaults
});

describe('CommandCore', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    destroyCommandCoreInstance();
    mockKeyBindingsOn.mockClear().mockReturnValue(() => {});
    mockKeyBindingsStop.mockClear();
    mockKeyBindingsInstance.getKeyState.mockClear().mockReturnValue(ref(false));
    mockKeyBindingsInstance.isCombinationActive.mockClear().mockReturnValue(computed(() => false));
    // Ensure any shared mock state for activeElement used by the mocked useKeyBindings is null by default
    // This is relevant if the mocked useKeyBindings's inputBlockerFn is ever called by commandCore's hotkey logic implicitly
    // However, commandCore's hotkey callback does its own activeElement check for runInTextInput rules.
    // For safety, ensure the concept of a focused input isn't bleeding into these tests via the mock.
    // If useKeyBindings mock doesn't use a global mockActiveElementValue, this isn't strictly needed here.
    // But if it did, this would be a place to control it for commandCore tests.
  });

  afterEach(() => {
    destroyCommandCoreInstance();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should initialize a singleton instance via useCommandCore', () => {
    const core1 = useCommandCore();
    const core2 = useCommandCore();
    expect(core1).toBe(core2);
    expect(core1).toBeDefined();
  });

  it('destroyCommandCoreInstance should call internal destroy and keyBindings.stop', () => {
    const core = useCommandCore(); // Initialize
    const destroySpy = vi.spyOn(core, 'destroy');

    destroyCommandCoreInstance();

    expect(destroySpy).toHaveBeenCalledTimes(1);
    expect(mockKeyBindingsStop).toHaveBeenCalledTimes(1);

    // After destruction, calling useCommandCore again should give a new instance (if designed to re-initialize)
    // or a defined non-functional one. Our current useCommandCore re-initializes.
    const newCore = useCommandCore();
    expect(newCore).not.toBe(core);
  });

  describe('Action Source Management', () => {
    it('should register and unregister an array action source', async () => {
      const core = useCommandCore();
      const action1 = createActionDef('act1');
      const sourceArray: ActionDefinition[] = [action1];

      const sourceKey = core.registerActionsSource(sourceArray);
      await nextTick(); // allActions is computed, allow it to update
      expect(core.allActions.value.length).toBe(1);
      expect(core.getAction('act1')).toEqual(action1);

      core.unregisterActionsSource(sourceKey);
      await nextTick();
      expect(core.allActions.value.length).toBe(0);
    });

    it('should register a function action source and call it', async () => {
      const core = useCommandCore();
      const action1 = createActionDef('actFun1');
      const sourceFn = vi.fn(() => [action1]);

      core.registerActionsSource(sourceFn);
      // Access .value to ensure the computed property is evaluated
      expect(core.allActions.value.length).toBe(1); // This will trigger the computed
      await nextTick(); // Allow for any reactive effects if computed was async (though ours is sync)

      expect(sourceFn).toHaveBeenCalled();
      expect(core.getAction('actFun1')).toEqual(action1);
    });

    it('should register a Ref<ActionDefinition[]> source and react to its changes', async () => {
      const core = useCommandCore();
      const action1 = createActionDef('actRef1');
      const action2 = createActionDef('actRef2');
      const sourceRef = ref<ActionDefinition[]>([action1]);

      core.registerActionsSource(sourceRef);
      await nextTick();
      expect(core.allActions.value.length).toBe(1);
      expect(core.getAction('actRef1')).toBeDefined();

      sourceRef.value = [action1, action2];
      await nextTick();
      expect(core.allActions.value.length).toBe(2);
      expect(core.getAction('actRef2')).toBeDefined();
    });

    it('allActions should deduplicate actions by ID, last one wins', async () => {
      const core = useCommandCore();
      const actionV1 = createActionDef('dupAct');
      const actionV2 = createActionDef('dupAct', { title: 'Action dupAct V2' });

      core.registerActionsSource([actionV1]);
      await nextTick();
      core.registerActionsSource([actionV2]);
      await nextTick();

      expect(core.allActions.value.length).toBe(1);
      expect(core.getAction('dupAct')?.title).toBe('Action dupAct V2');
    });
  });

  describe('executeAction', () => {
    it('should call the action handler and set isLoading state', async () => {
      const core = useCommandCore();
      const handlerMock = vi.fn();
      const action = createActionDef('execAction1', { handler: handlerMock });
      core.registerActionsSource([action]);
      await nextTick();

      expect(core.isLoading.value).toBe(false);
      const executionPromise = core.executeAction('execAction1');
      expect(core.isLoading.value).toBe(true); // Should be true immediately
      await executionPromise;
      expect(handlerMock).toHaveBeenCalledTimes(1);
      expect(core.isLoading.value).toBe(false);
    });

    it('should not call handler if action is disabled (boolean) and warn', async () => {
      const core = useCommandCore();
      const handlerMock = vi.fn();
      const action = createActionDef('disabledAction1', { handler: handlerMock, disabled: true });
      core.registerActionsSource([action]);
      await nextTick();

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {}); // Mock impl to suppress actual console output if needed by global spy

      await core.executeAction('disabledAction1');
      expect(handlerMock).not.toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[CommandCore]',
        'Action "disabledAction1" is disabled.'
      );
      expect(core.isLoading.value).toBe(false);
      consoleWarnSpy.mockRestore();
    });

    it('should not call handler if action is disabled (Ref) and warn', async () => {
      const core = useCommandCore();
      const handlerMock = vi.fn();
      const disabledState = ref(true);
      const action = createActionDef('disabledAction2', { handler: handlerMock, disabled: disabledState });
      core.registerActionsSource([action]);
      await nextTick();
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      await core.executeAction('disabledAction2');
      expect(handlerMock).not.toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[CommandCore]',
        'Action "disabledAction2" is disabled.'
      );
      consoleWarnSpy.mockClear(); // Clear for next call within same test

      disabledState.value = false;
      await nextTick();
      await core.executeAction('disabledAction2');
      expect(handlerMock).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).not.toHaveBeenCalled(); // Should not warn when not disabled
      consoleWarnSpy.mockRestore();
    });

    it('should not call handler if canExecute returns false and warn', async () => {
      const core = useCommandCore();
      const handlerMock = vi.fn();
      const canExecuteMock = vi.fn(() => false);
      const action = createActionDef('canExecAction1', { handler: handlerMock, canExecute: canExecuteMock });
      core.registerActionsSource([action]);
      await nextTick();
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const context = { trigger: 'test' };
      await core.executeAction('canExecAction1', context);
      expect(handlerMock).not.toHaveBeenCalled();
      expect(canExecuteMock).toHaveBeenCalledWith(context);
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[CommandCore]',
        'Action "canExecAction1" cannot be executed due to canExecute returning false.',
        { context }
      );
      expect(core.isLoading.value).toBe(false);
      consoleWarnSpy.mockRestore();
    });

    it('should call handler if canExecute returns true', async () => {
      const core = useCommandCore();
      const handlerMock = vi.fn();
      const canExecuteMock = vi.fn(() => true);
      const action = createActionDef('canExecAction2', { handler: handlerMock, canExecute: canExecuteMock });
      core.registerActionsSource([action]);
      await nextTick();

      await core.executeAction('canExecAction2');
      expect(handlerMock).toHaveBeenCalledTimes(1);
      expect(canExecuteMock).toHaveBeenCalled();
    });

    it('should not call handler for a group action (has subItems, no handler) and debug log', async () => {
      const core = useCommandCore();
      const groupAction = createActionDef('groupAct1', { subItems: () => [], handler: undefined });
      core.registerActionsSource([groupAction]);
      await nextTick();
      const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      await core.executeAction('groupAct1');
      expect(consoleDebugSpy).toHaveBeenCalledWith(
        '[CommandCore]',
        'Action "groupAct1" is a group action, no direct handler called. SubItems might be used by UI.'
      );
      consoleDebugSpy.mockRestore();
    });

    it('should log an error if action not found', async () => {
      const core = useCommandCore();
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      await core.executeAction('nonExistentAction');
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[CommandCore]',
        'Failed to execute action: Action with id "nonExistentAction" not found.'
      );
      consoleErrorSpy.mockRestore();
    });

    it('should log an error if action has no handler or subItems (effectively becomes action not found due to filtering)', async () => {
      const core = useCommandCore();
      // This action will be filtered out by isActionDefinition because it has no handler and no subItems
      const action = createActionDef('noHandlerAction', { handler: undefined, subItems: undefined });
      core.registerActionsSource([action]);
      await nextTick();
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await core.executeAction('noHandlerAction');
      // Because it's filtered out, it will be reported as "not found"
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[CommandCore]',
        'Failed to execute action: Action with id "noHandlerAction" not found.'
      );
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Hotkey Registration and Triggering', () => {
    it('should register hotkeys with keyBindings.on when actions with hotkeys are processed', async () => {
      const core = useCommandCore();
      // Define actions directly to ensure exact type matching for runInTextInput
      const action1: ActionDefinition = createActionDef('hkAction1', { hotkey: 'ctrl+k' }); // runInTextInput is undefined by default
      const action2: ActionDefinition = createActionDef('hkAction2', { hotkey: 'g-d' });    // runInTextInput is undefined by default

      const action3: ActionDefinition = {
        id: 'hkAction3',
        title: 'Action hkAction3',
        hotkey: 'alt+t',
        runInTextInput: true, // Explicitly boolean
        handler: vi.fn(),
      };

      const action4: ActionDefinition = {
        id: 'hkAction4',
        title: 'Action hkAction4',
        hotkey: 'ctrl+i',
        runInTextInput: 'only', // Explicitly 'only'
        handler: vi.fn(),
      };

      core.registerActionsSource([action1, action2, action3, action4]);
      const resolvedActions = core.allActions.value;
      expect(resolvedActions.length).toBe(4);
      await nextTick();
      expect(mockKeyBindingsOn).toHaveBeenCalledWith('ctrl+k', expect.any(Function), { ignoreInputBlocker: false });
      expect(mockKeyBindingsOn).toHaveBeenCalledWith('g-d', expect.any(Function), { ignoreInputBlocker: false });
      expect(mockKeyBindingsOn).toHaveBeenCalledWith('alt+t', expect.any(Function), { ignoreInputBlocker: true });
      expect(mockKeyBindingsOn).toHaveBeenCalledWith('ctrl+i', expect.any(Function), { ignoreInputBlocker: false });
    });

    it('should call action handler and log debug messages when its hotkey is invoked', async () => {
      const core = useCommandCore();
      const executeActionSpy = vi.spyOn(core, 'executeAction');
      const actionHandlerMock = vi.fn();
      const canExecuteTrue = vi.fn(() => true);
      const actionToTest = createActionDef('hkExec', {
        hotkey: 'ctrl+e',
        handler: actionHandlerMock,
        canExecute: canExecuteTrue,
      });
      core.registerActionsSource([actionToTest]);
      const resolvedActions = core.allActions.value; // Trigger allActions computation
      await nextTick(); // Allow hotkey registration

      const onCall = mockKeyBindingsOn.mock.calls.find(call => call[0] === 'ctrl+e');
      expect(onCall).toBeDefined();
      const hotkeyCallback = onCall![1] as (event: KeyboardEvent) => void;
      const mockEvent = new KeyboardEvent('keydown', { key: 'e', ctrlKey: true });

      const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      hotkeyCallback(mockEvent);
      await nextTick(); // Allow executeAction to be called
      // await vi.advanceTimersByTime(1); // If executeAction had internal async beyond nextTick

      // Corrected assertions based on actual log messages from commandCore.ts
      expect(consoleDebugSpy).toHaveBeenCalledWith('[CommandCore]', 'Hotkey "ctrl+e" executing action "hkExec"');
      // The detailed [HK DEBUG] logs were removed from commandCore.ts, so we only expect the general ones.
      // If specific internal steps of the hotkey callback need checking, they are implicitly tested by whether executeAction is called.
      expect(consoleDebugSpy).toHaveBeenCalledWith('[CommandCore]', 'Executing handler for action: hkExec');

      expect(canExecuteTrue).toHaveBeenCalled();
      expect(executeActionSpy).toHaveBeenCalledWith('hkExec', { trigger: 'hotkey', event: mockEvent });
      expect(actionHandlerMock).toHaveBeenCalledTimes(1);

      executeActionSpy.mockRestore();
      consoleDebugSpy.mockRestore();
    });

    it('should NOT call executeAction if hotkey callback checks fail', async () => {
      const core = useCommandCore();
      const actionHandler = vi.fn();
      const canExecuteFalse = vi.fn(() => false);
      // Explicitly define this action to ensure runInTextInput is correctly typed or undefined.
      const action: ActionDefinition = {
        id: 'hkNoExec',
        title: 'Action hkNoExec',
        hotkey: 'ctrl+n',
        handler: actionHandler,
        canExecute: canExecuteFalse,
        runInTextInput: undefined, // Explicitly undefined, was false in a previous version which might have caused issues
      };
      core.registerActionsSource([action]);
      let resolvedActions = core.allActions.value;
      await nextTick();
      const onCallCtrlN = mockKeyBindingsOn.mock.calls.find(call => call[0] === 'ctrl+n');
      const hotkeyCallbackCtrlN = onCallCtrlN![1] as (event: KeyboardEvent) => void;
      const executeActionSpy = vi.spyOn(core, 'executeAction');
      hotkeyCallbackCtrlN(new KeyboardEvent('keydown', { key: 'n', ctrlKey: true }));
      await nextTick();
      expect(canExecuteFalse).toHaveBeenCalled();
      expect(executeActionSpy).not.toHaveBeenCalled();
      executeActionSpy.mockClear();
      mockKeyBindingsOn.mockClear();

      const actionDisabled = createActionDef('hkNoExecDisabled', {
        hotkey: 'ctrl+d',
        handler: vi.fn(),
        disabled: true,
        canExecute: () => true
      });
      core.registerActionsSource([actionDisabled]);
      resolvedActions = core.allActions.value;
      await nextTick();
      const onCallCtrlD = mockKeyBindingsOn.mock.calls.find(call => call[0] === 'ctrl+d');
      const hotkeyCallbackDisabled = onCallCtrlD![1] as (event: KeyboardEvent) => void;
      hotkeyCallbackDisabled(new KeyboardEvent('keydown', { key: 'd', ctrlKey: true }));
      await nextTick();
      expect(executeActionSpy).not.toHaveBeenCalled();
      executeActionSpy.mockRestore();
    });

    it('should unregister hotkeys when an action source is unregistered', async () => {
      const core = useCommandCore();
      const action1 = createActionDef('hkUnreg1', { hotkey: 'ctrl+x' });
      const mockUnregisterFn1 = vi.fn();

      // Reset mockKeyBindingsOn for this specific test to use mockImplementationOnce cleanly
      mockKeyBindingsOn.mockReset();
      mockKeyBindingsOn.mockImplementationOnce((trigger, cb, opts) => mockUnregisterFn1);

      const sourceKey = core.registerActionsSource([action1]);
      // Ensure allActions is evaluated to trigger processAndRegisterHotkeys
      let currentActions = core.allActions.value;
      expect(currentActions.length).toBeGreaterThanOrEqual(1);
      expect(mockKeyBindingsOn).toHaveBeenCalledWith('ctrl+x', expect.any(Function), expect.any(Object));

      core.unregisterActionsSource(sourceKey);
      // Ensure allActions re-evaluates, which should call unregister for removed actions' hotkeys
      currentActions = core.allActions.value;
      expect(currentActions.find(a => a.id === 'hkUnreg1')).toBeUndefined();
      await nextTick(); // Allow effects from computed property change

      expect(mockUnregisterFn1).toHaveBeenCalledTimes(1);
    });

    it('should re-register hotkeys when an action definition is updated', async () => {
      const core = useCommandCore();
      const actionV1 = createActionDef('hkUpdate', { hotkey: 'ctrl+u' });
      const mockUnregisterFnV1 = vi.fn();
      const mockUnregisterFnV2 = vi.fn();

      mockKeyBindingsOn.mockImplementationOnce((t,c,o) => mockUnregisterFnV1);
      const source = ref([actionV1]);
      core.registerActionsSource(source);
      let resolved = core.allActions.value;
      expect(resolved.length).toBe(1);
      await nextTick();
      expect(mockKeyBindingsOn).toHaveBeenCalledWith('ctrl+u', expect.any(Function), expect.any(Object));

      const actionV2 = { ...actionV1, hotkey: 'alt+u' };
      mockKeyBindingsOn.mockImplementationOnce((t,c,o) => mockUnregisterFnV2);
      source.value = [actionV2];
      resolved = core.allActions.value;
      expect(resolved.length).toBe(1);
      await nextTick();

      expect(mockUnregisterFnV1).toHaveBeenCalledTimes(1);
      expect(mockKeyBindingsOn).toHaveBeenCalledWith('alt+u', expect.any(Function), expect.any(Object));
    });
  });

  describe('Async Action Source Handling', () => {
    it('should warn when an async action source function is processed', async () => {
      const core = useCommandCore();
      const asyncAction = createActionDef('asyncAct1');
      const promiseSource = () => new Promise<ActionDefinition[]>(resolve => {
        setTimeout(() => resolve([asyncAction]), 0);
      });

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      core.registerActionsSource(promiseSource);
      const currentActions = core.allActions.value;
      await nextTick();

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[CommandCore]',
        expect.stringContaining('Asynchronous action source functions are not fully supported')
      );
      expect(core.getAction('asyncAct1')).toBeUndefined();

      vi.advanceTimersByTime(10);
      await nextTick();
      await nextTick();

      expect(consoleDebugSpy).toHaveBeenCalledWith(
        '[CommandCore]',
        expect.stringContaining('Async source resolved. Manual source update might be needed.')
      );

      consoleWarnSpy.mockRestore();
      consoleDebugSpy.mockRestore();
    });
  });
});

describe('CommandCore Advanced Capabilities', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    destroyCommandCoreInstance();
    mockKeyBindingsOn.mockClear().mockReturnValue(() => {});
    mockKeyBindingsStop.mockClear();
  });

  afterEach(() => {
    destroyCommandCoreInstance();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should store and retrieve actions with extended properties (keywords, description, meta)', () => {
    const core = useCommandCore();
    const action = createActionDef('extPropAction', {
      keywords: ['test', 'extended'],
      description: 'An action with more properties.',
      meta: { customFlag: true, scope: 'admin' },
    });
    core.registerActionsSource([action]);
    const retrievedAction = core.getAction('extPropAction');
    expect(retrievedAction?.keywords).toEqual(['test', 'extended']);
    expect(retrievedAction?.description).toBe('An action with more properties.');
    expect(retrievedAction?.meta?.customFlag).toBe(true);
  });

  it('should allow subItems to be an async function and validate action', () => {
    const core = useCommandCore();
    const subAction = createActionDef('sub1');
    const asyncSubItemsSource = createActionDef('asyncSubItemsAction', {
      title: 'Action with Async SubItems',
      subItems: async () => {
        await nextTick();
        return [subAction];
      },
      handler: undefined,
    });
    core.registerActionsSource([asyncSubItemsSource]);
    const retrieved = core.getAction('asyncSubItemsAction');
    expect(retrieved).toBeDefined();
    const subItemsPromise = retrieved?.subItems?.();
    expect(subItemsPromise).toBeInstanceOf(Promise);
    return expect(subItemsPromise).resolves.toEqual([subAction]);
  });

  it('should pass rich ActionContext to handler and canExecute', () => {
    const core = useCommandCore();
    const handlerMock = vi.fn();
    const canExecuteMock = vi.fn(() => true);
    const action = createActionDef('contextAction', {
      handler: handlerMock,
      canExecute: canExecuteMock,
    });
    core.registerActionsSource([action]);
    const testContext: ActionContext = {
      trigger: 'test_trigger',
      data: { value: 123, nested: { foo: 'bar' } },
      event: new Event('test'),
    };
    (testContext as any).customProp = 'hello'; // Example of adding an arbitrary prop for testing

    core.executeAction('contextAction', testContext);
    expect(canExecuteMock).toHaveBeenCalledWith(expect.objectContaining(testContext));
    expect(handlerMock).toHaveBeenCalledWith(expect.objectContaining(testContext));
  });

  it('should include actions with meta.paletteHidden in allActions', () => {
    const core = useCommandCore();
    const actionVisible = createActionDef('visibleAct');
    const actionHidden = createActionDef('hiddenAct', {
      meta: { paletteHidden: true },
    });
    core.registerActionsSource([actionVisible, actionHidden]);
    expect(core.getAction('hiddenAct')?.meta?.paletteHidden).toBe(true);
  });

  it('should allow filtering based on meta properties via canExecute (simulated scope check)', () => {
    const core = useCommandCore();
    const handlerMock = vi.fn();
    const actionDef: ActionDefinition = createActionDef('scopedAction', {
      meta: { requiredScope: 'admin' },
      handler: handlerMock,
    });
    actionDef.canExecute = (context) => {
      const possessedScopes = context.data?.possessedScopes as string[] | undefined;
      const requiredScope = actionDef.meta?.requiredScope as string | undefined;
      return !!requiredScope && !!possessedScopes?.includes(requiredScope);
    };
    core.registerActionsSource([actionDef]);

    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    core.executeAction('scopedAction', { data: { possessedScopes: ['user'] } });
    expect(handlerMock).not.toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledWith('[CommandCore]', 'Action "scopedAction" cannot be executed due to canExecute returning false.', { context: { data: { possessedScopes: ['user'] } }});
    consoleWarnSpy.mockClear();

    core.executeAction('scopedAction', { data: { possessedScopes: ['admin', 'user'] } });
    expect(handlerMock).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).not.toHaveBeenCalled(); // Should not warn if canExecute is true
    consoleWarnSpy.mockRestore();
  });

  it('should allow filtering based on meta properties via canExecute (simulated mode check)', () => {
    const core = useCommandCore();
    const handlerMock = vi.fn();
    const actionDef = createActionDef('modeAction', {
      meta: { modes: ['edit', 'advanced'] },
      handler: handlerMock,
    });
    actionDef.canExecute = (context) => {
      const currentMode = context.data?.currentMode as string | undefined;
      const allowedModes = actionDef.meta?.modes as string[] | undefined;
      return !!currentMode && !!allowedModes?.includes(currentMode);
    };
    core.registerActionsSource([actionDef]);

    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    core.executeAction('modeAction', { data: { currentMode: 'view' } });
    expect(handlerMock).not.toHaveBeenCalled();
    expect(consoleWarnSpy).toHaveBeenCalledWith('[CommandCore]', 'Action "modeAction" cannot be executed due to canExecute returning false.', { context: { data: { currentMode: 'view' } }});
    consoleWarnSpy.mockClear();

    core.executeAction('modeAction', { data: { currentMode: 'edit' } });
    expect(handlerMock).toHaveBeenCalledTimes(1);
    expect(consoleWarnSpy).not.toHaveBeenCalled();
    consoleWarnSpy.mockRestore();
  });

  it('should support chained action execution by handlers (isLoading managed per call)', async () => {
    const core = useCommandCore();
    const handlerB = vi.fn(async () => { await nextTick(); });
    const handlerA = vi.fn(async () => {
      await core.executeAction('actionB');
    });
    const actionA = createActionDef('actionA', { handler: handlerA });
    const actionB = createActionDef('actionB', { handler: handlerB });
    core.registerActionsSource([actionA, actionB]);
    let isLoadingWasTrueDuringExecution = false;
    const unwatch = watch(core.isLoading, (newValue) => {
      if (newValue) isLoadingWasTrueDuringExecution = true;
    });
    await core.executeAction('actionA');
    unwatch();
    expect(handlerA).toHaveBeenCalledTimes(1);
    expect(handlerB).toHaveBeenCalledTimes(1);
    expect(isLoadingWasTrueDuringExecution).toBe(true);
    expect(core.isLoading.value).toBe(false);
  });

  it('should allow actions to store and retrieve undo-related metadata', () => {
    const core = useCommandCore();
    let actionExecutionResult: any = null;
    const originalActionHandler = vi.fn((context: ActionContext) => {
      actionExecutionResult = { dataProcessed: context.data, timestamp: Date.now() };
      // This handler explicitly returns void
    });
    const originalAction = createActionDef('doSomething', {
      handler: originalActionHandler,
      meta: {
        undoable: true,
        undoActionId: 'undoSomething',
        getUndoContext: (originalContext: ActionContext, resultOfExecution: any) => { // resultOfExecution is now conceptual
          return {
            trigger: 'undo',
            data: { originalResult: resultOfExecution, originalTrigger: originalContext.trigger }
          }
        }
      }
    });
    const undoHandlerMock = vi.fn();
    const undoAction = createActionDef('undoSomething', { handler: undoHandlerMock });
    core.registerActionsSource([originalAction, undoAction]);

    const retrievedOriginal = core.getAction('doSomething');
    expect(retrievedOriginal?.meta?.undoable).toBe(true);
    expect(retrievedOriginal?.meta?.undoActionId).toBe('undoSomething');
    expect(typeof retrievedOriginal?.meta?.getUndoContext).toBe('function');

    const originalContext: ActionContext = { trigger: 'palette', data: 'testData123' };
    core.executeAction('doSomething', originalContext); // This will set actionExecutionResult via the handler

    // Pass the simulated result (captured by the handler) to getUndoContext
    const undoContext = retrievedOriginal?.meta?.getUndoContext?.(originalContext, actionExecutionResult);
    expect(undoContext).toEqual({
      trigger: 'undo',
      data: { originalResult: actionExecutionResult, originalTrigger: 'palette' }
    });

    if (undoContext && retrievedOriginal?.meta?.undoActionId) {
      core.executeAction(retrievedOriginal.meta.undoActionId, undoContext);
      expect(undoHandlerMock).toHaveBeenCalledWith(undoContext);
    }
  });

  it('allActions and hotkeys should react to in-place changes in a Ref<ActionDefinition[]> source', async () => {
    const core = useCommandCore();
    const action1Initial: ActionDefinition = createActionDef('refReactTest1', { hotkey: 'ctrl+1' });
    const action2: ActionDefinition = createActionDef('refReactTest2', { hotkey: 'ctrl+2' });

    const sourceRef = ref<ActionDefinition[]>([action1Initial]);
    core.registerActionsSource(sourceRef);
    let currentActions = core.allActions.value; // Access to trigger computed
    await nextTick();
    expect(mockKeyBindingsOn).toHaveBeenCalledWith('ctrl+1', expect.any(Function), expect.any(Object));
    mockKeyBindingsOn.mockClear();

    sourceRef.value = [...sourceRef.value, action2];
    currentActions = core.allActions.value; // Access again after change
    await nextTick();
    expect(mockKeyBindingsOn).toHaveBeenCalledWith('ctrl+2', expect.any(Function), expect.any(Object));
    mockKeyBindingsOn.mockClear();

    const action1Updated: ActionDefinition = { ...action1Initial, hotkey: 'alt+1', title: 'Ref Test 1 Updated' };
    sourceRef.value = [action1Updated, action2];
    currentActions = core.allActions.value; // Access again
    await nextTick();
    expect(core.getAction('refReactTest1')?.title).toBe('Ref Test 1 Updated');
    expect(mockKeyBindingsOn).toHaveBeenCalledWith('alt+1', expect.any(Function), expect.any(Object));
  });
});
