import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ref, computed, nextTick } from 'vue';
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

// Helper to create a basic action definition
const createTestAction = (id: string, hotkey?: string, handler?: () => void): ActionDefinition => ({
  id,
  title: `Action ${id}`,
  handler: handler || vi.fn(),
  hotkey,
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
      const action1 = createTestAction('act1');
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
      const action1 = createTestAction('actFun1');
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
      const action1 = createTestAction('actRef1');
      const action2 = createTestAction('actRef2');
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
      const actionV1 = createTestAction('dupAct', undefined, vi.fn());
      const actionV2 = { ...createTestAction('dupAct'), title: 'Action dupAct V2' };

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
      const action = createTestAction('execAction1', undefined, handlerMock);
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
      const action = { ...createTestAction('disabledAction1', undefined, handlerMock), disabled: true };
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
      const action = { ...createTestAction('disabledAction2', undefined, handlerMock), disabled: disabledState };
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
      const action = { ...createTestAction('canExecAction1', undefined, handlerMock), canExecute: canExecuteMock };
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
      const action = { ...createTestAction('canExecAction2', undefined, handlerMock), canExecute: canExecuteMock };
      core.registerActionsSource([action]);
      await nextTick();

      await core.executeAction('canExecAction2');
      expect(handlerMock).toHaveBeenCalledTimes(1);
      expect(canExecuteMock).toHaveBeenCalled();
    });

    it('should not call handler for a group action (has subItems, no handler) and debug log', async () => {
      const core = useCommandCore();
      const groupAction: ActionDefinition = { id: 'groupAct1', title: 'Group 1', subItems: () => [], handler: undefined };
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
      const action: ActionDefinition = { id: 'noHandlerAction', title: 'No Handler', handler: undefined, subItems: undefined };
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
      const action1 = createTestAction('hkAction1', 'ctrl+k');
      const action2 = createTestAction('hkAction2', 'g-d');
      const action3 = { ...createTestAction('hkAction3', 'alt+t'), runInTextInput: true };
      const action4 = { ...createTestAction('hkAction4', 'ctrl+i'), runInTextInput: 'only' };

      core.registerActionsSource([action1, action2, action3, action4]);
      const resolvedActions = core.allActions.value;
      expect(resolvedActions.length).toBe(4);
      await nextTick();

      expect(mockKeyBindingsOn).toHaveBeenCalled();
      expect(mockKeyBindingsOn).toHaveBeenCalledWith('ctrl+k', expect.any(Function), { ignoreInputBlocker: false });
      expect(mockKeyBindingsOn).toHaveBeenCalledWith('g-d', expect.any(Function), { ignoreInputBlocker: false });
      expect(mockKeyBindingsOn).toHaveBeenCalledWith('alt+t', expect.any(Function), { ignoreInputBlocker: true });
      expect(mockKeyBindingsOn).toHaveBeenCalledWith('ctrl+i', expect.any(Function), { ignoreInputBlocker: false });
    });

    it('should call action handler and log debug messages when its hotkey is invoked', async () => {
      const core = useCommandCore();
      // Spy on executeAction BEFORE the hotkey callback is created via action registration
      const executeActionSpy = vi.spyOn(core, 'executeAction');

      const actionHandlerMock = vi.fn();
      const canExecuteTrue = vi.fn(() => true);
      const actionToTest = {
        ...createTestAction('hkExec', 'ctrl+e', actionHandlerMock),
        canExecute: canExecuteTrue,
        disabled: false,
        runInTextInput: undefined
      };
      core.registerActionsSource([actionToTest]);
      const resolvedActions = core.allActions.value; // This triggers processAndRegisterHotkeys, creating the callback
      expect(resolvedActions.find(a=>a.id === 'hkExec')).toBeDefined();
      await nextTick();

      const onCall = mockKeyBindingsOn.mock.calls.find(call => call[0] === 'ctrl+e');
      expect(onCall, "'ctrl+e' hotkey should be registered with keyBindings.on").toBeDefined();
      const hotkeyCallback = onCall![1] as (event: KeyboardEvent) => void;

      const mockEvent = new KeyboardEvent('keydown', { key: 'e', ctrlKey: true });
      const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

hotkeyCallback(mockEvent);
      await nextTick();
      await vi.advanceTimersByTime(1); // For any internal asyncs in executeAction

      // Check debug logs from commandCoreDebug (which prepends [CommandCore])
      expect(consoleDebugSpy).toHaveBeenCalledWith('[CommandCore]', '[HK DEBUG] Triggered for action ID: hkExec, binding: "ctrl+e"');
      expect(consoleDebugSpy).toHaveBeenCalledWith('[CommandCore]', '[HK DEBUG] getAction("hkExec") result:', expect.objectContaining({ id: 'hkExec' }));
      expect(consoleDebugSpy).toHaveBeenCalledWith('[CommandCore]', '[HK DEBUG] Passed runInTextInput checks for "hkExec". About to check canExecute.');
      expect(consoleDebugSpy).toHaveBeenCalledWith('[CommandCore]', '[HK DEBUG] Passed canExecute for "hkExec". About to call executeAction.');
      expect(consoleDebugSpy).toHaveBeenCalledWith('[CommandCore]', 'Hotkey "ctrl+e" executing action "hkExec"');
      expect(consoleDebugSpy).toHaveBeenCalledWith('[CommandCore]', 'Executing handler for action: hkExec');

      expect(canExecuteTrue).toHaveBeenCalled();
      expect(executeActionSpy).toHaveBeenCalledWith('hkExec', { trigger: 'hotkey', event: mockEvent });
      expect(actionHandlerMock).toHaveBeenCalledTimes(1);

      executeActionSpy.mockRestore(); // Restore spy
      consoleDebugSpy.mockRestore();
    });

    it('should NOT call executeAction if hotkey callback checks (disabled, runInTextInput, canExecute) fail', async () => {
      const core = useCommandCore();
      const actionHandler = vi.fn();
      const canExecuteFalse = vi.fn(() => false);
      const action = {
        ...createTestAction('hkNoExec', 'ctrl+n', actionHandler),
        canExecute: canExecuteFalse,
        runInTextInput: false
      };
      core.registerActionsSource([action]);
      let resolvedActions = core.allActions.value;
      expect(resolvedActions.find(a => a.id === 'hkNoExec')).toBeDefined();
      await nextTick();

      const onCallCtrlN = mockKeyBindingsOn.mock.calls.find(call => call[0] === 'ctrl+n');
      expect(onCallCtrlN, 'Hotkey ctrl+n should be registered').toBeDefined();
      const hotkeyCallbackCtrlN = onCallCtrlN![1] as (event: KeyboardEvent) => void;
      const executeActionSpy = vi.spyOn(core, 'executeAction');

      hotkeyCallbackCtrlN(new KeyboardEvent('keydown', { key: 'n', ctrlKey: true }));
      await nextTick();
      expect(canExecuteFalse).toHaveBeenCalled();
      expect(executeActionSpy).not.toHaveBeenCalled();
      executeActionSpy.mockClear();
      mockKeyBindingsOn.mockClear();

      const actionDisabled = { ...createTestAction('hkNoExecDisabled', 'ctrl+d', vi.fn()), disabled: true, canExecute: () => true };
      core.registerActionsSource([actionDisabled]);
      // Ensure allActions recomputes AFTER adding the new source AND BEFORE finding the call
      resolvedActions = core.allActions.value;
      expect(resolvedActions.find(a => a.id === 'hkNoExecDisabled')).toBeDefined();
      await nextTick(); // Allow effects

      const onCallCtrlD = mockKeyBindingsOn.mock.calls.find(call => call[0] === 'ctrl+d');
      expect(onCallCtrlD, 'Hotkey ctrl+d should be registered for disabled test').toBeDefined();
      const hotkeyCallbackDisabled = onCallCtrlD![1] as (event: KeyboardEvent) => void;

      hotkeyCallbackDisabled(new KeyboardEvent('keydown', { key: 'd', ctrlKey: true }));
      await nextTick();
      expect(executeActionSpy).not.toHaveBeenCalled();

      executeActionSpy.mockRestore();
    });

    it('should unregister hotkeys when an action source is unregistered', async () => {
      const core = useCommandCore();
      const action1 = createTestAction('hkUnreg1', 'ctrl+x');
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
      const actionV1 = createTestAction('hkUpdate', 'ctrl+u');
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
      const asyncAction = createTestAction('asyncAct1');
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
