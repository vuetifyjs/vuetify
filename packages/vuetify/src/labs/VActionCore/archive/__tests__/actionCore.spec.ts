// Utilities
import { nextTick, ref } from 'vue'
import { vi } from 'vitest'; // Assuming Vitest context

// Types
// Import types from their original locations, not from the mock
import type { ActionDefinition } from '../types'
import type { KeyBindingConfig, ShortcutConfig as ActualShortcutConfig, KeyBindingOptions } from '../useKeyBindings'

// This is the actual spy function we will use and assert against.
const mockUseKeyBindingsActual = vi.fn();

vi.mock('../useKeyBindings', () => {
  // This factory is hoisted.
  // It provides the mock implementation for when actionCore.ts imports from '../useKeyBindings'.
  return {
    useKeyBindings: mockUseKeyBindingsActual,
    // We don't need to re-export types here for TypeScript to work,
    // as type imports are resolved separately from value imports.
  };
});

// Dynamically import the modules under test AFTER mocks are set up.
// This ensures they import the mocked versions of their dependencies.
const { useActionCore, destroyActionCoreInstance } = await import('../actionCore');

const createActionDef = (id: string, props: Partial<ActionDefinition> = {}): ActionDefinition => ({
  id,
  title: `Action ${id}`,
  handler: vi.fn(),
  keywords: undefined,
  description: undefined,
  subtitle: undefined,
  icon: undefined,
  hotkey: undefined,
  hotkeyOptions: undefined,
  runInTextInput: undefined,
  canExecute: undefined,
  subItems: undefined,
  meta: undefined,
  order: undefined,
  disabled: undefined,
  profiles: undefined,
  ...props,
})

describe('ActionCore', () => {

  beforeEach(() => {
    vi.useFakeTimers();
    mockUseKeyBindingsActual.mockClear().mockReturnValue(() => {});
    destroyActionCoreInstance();
  })

  afterEach(() => {
    destroyActionCoreInstance();
    // mockUseKeyBindingsActual is cleared in beforeEach, clearAllMocks might be redundant for it.
    vi.clearAllMocks();
    vi.useRealTimers();
    vi.resetModules(); // Important to reset module states for other test files if they import ActionCore
  })

  it('should call useKeyBindings when actions are processed and change', async () => {
    const core = useActionCore();
    mockUseKeyBindingsActual.mockClear(); // Clear any initial calls if instance persisted somehow

    core.registerActionsSource([{ id: 'act1', title: 'Action 1', hotkey: 'a', handler: vi.fn() }]);
    await nextTick();
    expect(mockUseKeyBindingsActual).toHaveBeenCalledTimes(1);

    core.registerActionsSource([{ id: 'act2', title: 'Action 2', hotkey: 'b', handler: vi.fn() }]);
    await nextTick();
    expect(mockUseKeyBindingsActual).toHaveBeenCalledTimes(2); // Called again due to allActions change

    // Test unregistering a source
    const sourceToUnregister = core.registerActionsSource([{ id: 'act3', title: 'Action 3', hotkey: 'c', handler: vi.fn() }]);
    await nextTick();
    expect(mockUseKeyBindingsActual).toHaveBeenCalledTimes(3);

    core.unregisterActionsSource(sourceToUnregister);
    await nextTick();
    expect(mockUseKeyBindingsActual).toHaveBeenCalledTimes(4); // Called again after unregistering
  })

  it('destroyActionCoreInstance should call the unregister function from useKeyBindings', async () => {
    const core = useActionCore();
    const specificUnregisterMock = vi.fn();

    mockUseKeyBindingsActual.mockClear().mockReturnValue(specificUnregisterMock);

    core.registerActionsSource([{ id: 'destroy-test', title: 'Destroy Test', hotkey: 'd', handler: vi.fn() }]);
    await nextTick();

    expect(mockUseKeyBindingsActual).toHaveBeenCalledTimes(1); // Ensures useKeyBindings was called, setting up our specificUnregisterMock

    destroyActionCoreInstance();
    expect(specificUnregisterMock).toHaveBeenCalledTimes(1); // Check our specific unregister function was called
  })

  describe('Action Source Management', () => {
    it('should register and unregister an array action source', async () => {
      const core = useActionCore()
      const action1 = createActionDef('act1')
      const sourceArray: ActionDefinition[] = [action1]

      const sourceKey = core.registerActionsSource(sourceArray)
      await nextTick()
      expect(core.allActions.value).toHaveLength(1)
      expect(core.getAction('act1')).toEqual(expect.objectContaining(action1))

      core.unregisterActionsSource(sourceKey)
      await nextTick()
      expect(core.allActions.value).toHaveLength(0)
    })

    it('should register a function action source and call it', async () => {
      const core = useActionCore()
      const action1 = createActionDef('actFun1')
      const sourceFn = vi.fn(() => [action1])

      core.registerActionsSource(sourceFn)
      await nextTick()
      expect(sourceFn).toHaveBeenCalled()
      expect(core.allActions.value).toHaveLength(1)
      expect(core.getAction('actFun1')).toEqual(expect.objectContaining(action1))
    })

    it('should register a Ref<ActionDefinition[]> source and react to its changes', async () => {
      const core = useActionCore()
      const action1 = createActionDef('actRef1')
      const action2 = createActionDef('actRef2')
      const sourceRef = ref<ActionDefinition[]>([action1])

      core.registerActionsSource(sourceRef)
      await nextTick()
      expect(core.allActions.value).toHaveLength(1)
      expect(core.getAction('actRef1')).toBeDefined()

      sourceRef.value = [action1, action2]
      await nextTick()
      expect(core.allActions.value).toHaveLength(2)
      expect(core.getAction('actRef2')).toBeDefined()
    })

    it('allActions should deduplicate actions by ID, last one wins', async () => {
      const core = useActionCore()
      const actionV1 = createActionDef('dupAct')
      const actionV2 = createActionDef('dupAct', { title: 'Action dupAct V2' })

      core.registerActionsSource([actionV1])
      await nextTick()
      core.registerActionsSource([actionV2])
      await nextTick()

      expect(core.allActions.value).toHaveLength(1)
      expect(core.getAction('dupAct')?.title).toBe('Action dupAct V2')
    })
  })

  describe('executeAction', () => {
    it('should call the action handler and set isLoading state', async () => {
      const core = useActionCore()
      const handlerMock = vi.fn()
      const action = createActionDef('execAction1', { handler: handlerMock })
      core.registerActionsSource([action])
      await nextTick()

      expect(core.isLoading.value).toBe(false)
      const executionPromise = core.executeAction('execAction1')
      expect(core.isLoading.value).toBe(true)
      await executionPromise
      expect(handlerMock).toHaveBeenCalledTimes(1)
      expect(core.isLoading.value).toBe(false)
    })

    it('should not call handler if action is disabled (boolean) and warn', async () => {
      const core = useActionCore({ verboseLogging: false }) // Disable verbose for cleaner console
      const handlerMock = vi.fn()
      const action = createActionDef('disabledAction1', { handler: handlerMock, disabled: true })
      core.registerActionsSource([action])
      await nextTick()

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      await core.executeAction('disabledAction1')
      expect(handlerMock).not.toHaveBeenCalled()
      expect(consoleWarnSpy).toHaveBeenCalledWith('[Vuetify ActionCore]', 'Action "disabledAction1" is disabled')
      expect(core.isLoading.value).toBe(false)
      consoleWarnSpy.mockRestore()
    })

    it('should not call handler if action is disabled (Ref) and warn', async () => {
      const core = useActionCore({ verboseLogging: false })
      const handlerMock = vi.fn()
      const disabledState = ref(true)
      const action = createActionDef('disabledAction2', { handler: handlerMock, disabled: disabledState })
      core.registerActionsSource([action])
      await nextTick()
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      await core.executeAction('disabledAction2')
      expect(handlerMock).not.toHaveBeenCalled()
      expect(consoleWarnSpy).toHaveBeenCalledWith('[Vuetify ActionCore]', 'Action "disabledAction2" is disabled')
      consoleWarnSpy.mockClear()

      disabledState.value = false
      await nextTick()
      await core.executeAction('disabledAction2')
      expect(handlerMock).toHaveBeenCalledTimes(1)
      expect(consoleWarnSpy).not.toHaveBeenCalled()
      consoleWarnSpy.mockRestore()
    })

    it('should not call handler if canExecute returns false and warn', async () => {
      const core = useActionCore({ verboseLogging: false })
      const handlerMock = vi.fn()
      const canExecuteMock = vi.fn(() => false)
      const action = createActionDef('canExecAction1', { handler: handlerMock, canExecute: canExecuteMock })
      core.registerActionsSource([action])
      await nextTick()
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const context = { trigger: 'test' as const }
      await core.executeAction('canExecAction1', context)
      expect(handlerMock).not.toHaveBeenCalled()
      expect(canExecuteMock).toHaveBeenCalledWith(context)
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '[Vuetify ActionCore]',
        'Action "canExecAction1" cannot be executed due to canExecute returning false',
        { context }
      )
      expect(core.isLoading.value).toBe(false)
      consoleWarnSpy.mockRestore()
    })

    it('should call handler if canExecute returns true', async () => {
      const core = useActionCore()
      const handlerMock = vi.fn()
      const canExecuteMock = vi.fn(() => true)
      const action = createActionDef('canExecAction2', { handler: handlerMock, canExecute: canExecuteMock })
      core.registerActionsSource([action])
      await nextTick()

      await core.executeAction('canExecAction2')
      expect(handlerMock).toHaveBeenCalledTimes(1)
      expect(canExecuteMock).toHaveBeenCalled()
    })

    it('should not call handler for a group action (has subItems, no handler) and debug log', async () => {
      const core = useActionCore({ verboseLogging: true })
      const groupAction = createActionDef('groupAct1', { subItems: () => [], handler: undefined })
      core.registerActionsSource([groupAction])
      await nextTick()
      const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {})

      await core.executeAction('groupAct1')
      expect(consoleDebugSpy.mock.calls).toContainEqual([
        expect.stringContaining('[Vuetify ActionCore]'),
        '[VERBOSE]',
        expect.stringContaining('Action "groupAct1" has subItems but no handler; not directly executable as a simple action.')
      ]);
      consoleDebugSpy.mockRestore()
    })

    it('should log an error if action not found', async () => {
      const core = useActionCore({ verboseLogging: false })
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      await core.executeAction('nonExistentAction')
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        '[Vuetify ActionCore] Failed at execute action: Action with id "nonExistentAction" not found'
      )
      consoleErrorSpy.mockRestore()
    })

    it('should log an error if action has no handler or subItems (filtered out)', async () => {
        const core = useActionCore({ verboseLogging: true })
        const action = createActionDef('noHandlerAction', { handler: undefined, subItems: undefined })
        const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

        core.registerActionsSource([action])
        await nextTick()

        expect(consoleWarnSpy).toHaveBeenCalledWith(
            '[Vuetify ActionCore]',
            expect.stringContaining('Invalid effective action definition (missing handler/subItems): noHandlerAction'),
            expect.anything()
        );

        await core.executeAction('noHandlerAction')
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            '[Vuetify ActionCore] Failed at execute action: Action with id "noHandlerAction" not found'
        )
        consoleWarnSpy.mockRestore()
        consoleErrorSpy.mockRestore()
    })
  })

  describe('Hotkey Registration and Triggering (via useKeyBindings)', () => {
    it('should pass correctly formatted KeyBindingConfig to useKeyBindings', async () => {
      const core = useActionCore({ verboseLogging: false });
      const action1: ActionDefinition = createActionDef('hkAction1', { hotkey: 'ctrl+k' });
      const action2: ActionDefinition = createActionDef('hkAction2', { hotkey: 'g-d', runInTextInput: false });
      const action3: ActionDefinition = createActionDef('hkAction3', { hotkey: 'alt+t', runInTextInput: true });
      const action4: ActionDefinition = createActionDef('hkAction4', { hotkey: 'ctrl+i', runInTextInput: 'only' });
      const action5: ActionDefinition = createActionDef('hkAction5', { hotkey: 'ctrl+j', runInTextInput: () => document.activeElement?.id === 'some-id' });
      const action6: ActionDefinition = createActionDef('hkAction6', { hotkey: 'custom_input', runInTextInput: 'myInputName' });
      const action7: ActionDefinition = createActionDef('hkAction7', { hotkey: 'shift+a, command+b', runInTextInput: ['inputA', 'inputB'] });

      core.registerActionsSource([action1, action2, action3, action4, action5, action6, action7]);
      await nextTick();

      expect(mockUseKeyBindingsActual).toHaveBeenCalled();
      const lastCall = mockUseKeyBindingsActual.mock.calls[mockUseKeyBindingsActual.mock.calls.length - 1];
      const generatedConfig = lastCall[0] as KeyBindingConfig;

      expect(generatedConfig['ctrl+k']).toBeDefined();
      expect(typeof (generatedConfig['ctrl+k'] as ActualShortcutConfig)?.handler).toBe('function');
      expect((generatedConfig['ctrl+k'] as ActualShortcutConfig)?.usingInput).toBeUndefined();

      expect(generatedConfig['g-d']).toBeDefined();
      expect((generatedConfig['g-d'] as ActualShortcutConfig)?.usingInput).toBe(false);

      expect(generatedConfig['alt+t']).toBeDefined();
      expect((generatedConfig['alt+t'] as ActualShortcutConfig)?.usingInput).toBe(true);

      expect(generatedConfig['ctrl+i']).toBeDefined();
      expect((generatedConfig['ctrl+i'] as ActualShortcutConfig)?.usingInput).toBe('only');

      expect(generatedConfig['ctrl+j']).toBeDefined();
      expect((generatedConfig['ctrl+j'] as ActualShortcutConfig)?.usingInput).toBe(true);

      expect(generatedConfig['custom_input']).toBeDefined();
      expect((generatedConfig['custom_input'] as ActualShortcutConfig)?.usingInput).toBe('myInputName');

      expect(generatedConfig['shift+a']).toBeDefined();
      expect((generatedConfig['shift+a'] as ActualShortcutConfig)?.usingInput).toBe(true);
      expect(generatedConfig['command+b']).toBeDefined();
      expect((generatedConfig['command+b'] as ActualShortcutConfig)?.usingInput).toBe(true);
    });

    it('should pass hotkeyOptions (preventDefault, stopPropagation) to ShortcutConfig', async () => {
      const core = useActionCore();
      const actionWithHotkeyOptions = createActionDef('hkWithOptions', {
        hotkey: 'ctrl+shift+p',
        hotkeyOptions: { preventDefault: true, stopPropagation: false },
      });
      core.registerActionsSource([actionWithHotkeyOptions]);
      await nextTick();

      const generatedConfig = mockUseKeyBindingsActual.mock.calls[mockUseKeyBindingsActual.mock.calls.length - 1][0] as KeyBindingConfig;
      const shortcutEntry = generatedConfig['ctrl+shift+p'] as ActualShortcutConfig;

      expect(shortcutEntry).toBeDefined();
      expect(shortcutEntry.preventDefault).toBe(true);
      expect(shortcutEntry.stopPropagation).toBe(false);
    });

    it('hotkey handler should execute action with correct context', async () => {
      const core = useActionCore({ verboseLogging: true });
      const executeActionSpy = vi.spyOn(core, 'executeAction');
      const actionHandlerMock = vi.fn();
      const canExecuteTrue = vi.fn(() => true);
      const actionToTest = createActionDef('hkExec', {
        hotkey: 'ctrl+e',
        handler: actionHandlerMock,
        canExecute: canExecuteTrue,
      });
      core.registerActionsSource([actionToTest]);
      await nextTick();

      const generatedConfig = mockUseKeyBindingsActual.mock.calls[mockUseKeyBindingsActual.mock.calls.length - 1][0] as KeyBindingConfig;
      const hotkeyCallback = (generatedConfig['ctrl+e'] as ActualShortcutConfig).handler;
      expect(hotkeyCallback).toBeDefined();

      const mockEvent = new KeyboardEvent('keydown', { key: 'e', ctrlKey: true });
      const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      hotkeyCallback(mockEvent);
      await nextTick();

      expect(canExecuteTrue).toHaveBeenCalled();
      expect(executeActionSpy).toHaveBeenCalledWith('hkExec', { trigger: 'hotkey', event: mockEvent });
      expect(actionHandlerMock).toHaveBeenCalledTimes(1);
      expect(consoleDebugSpy).toHaveBeenNthCalledWith(3,
        expect.stringContaining('[Vuetify ActionCore]'),
        '[VERBOSE]',
        'Executing handler for action: hkExec',
        { context: { trigger: 'hotkey', event: mockEvent } }
      );

      executeActionSpy.mockRestore();
      consoleDebugSpy.mockRestore();
    });

    it('should NOT call executeAction if hotkey callback conditions (disabled, canExecute) fail', async () => {
      const core = useActionCore({ verboseLogging: false });
      const executeActionSpy = vi.spyOn(core, 'executeAction');

      const actionDisabled = createActionDef('hkDisabled', { hotkey: 'ctrl+d', disabled: true, handler: vi.fn() });
      core.registerActionsSource([actionDisabled]);
      await nextTick();
      let generatedConfig = mockUseKeyBindingsActual.mock.calls[mockUseKeyBindingsActual.mock.calls.length - 1][0] as KeyBindingConfig;
      let hotkeyCallback = (generatedConfig['ctrl+d'] as ActualShortcutConfig)?.handler;
      hotkeyCallback?.(new KeyboardEvent('keydown', { key: 'd', ctrlKey: true }));
      await nextTick();
      expect(executeActionSpy).not.toHaveBeenCalled();
      executeActionSpy.mockClear();
      const firstSourceKey = Array.from((core as any).registeredSources.value.keys())[0];
      if (typeof firstSourceKey === 'symbol') {
        core.unregisterActionsSource(firstSourceKey);
      }

      const canExecuteFalse = vi.fn(() => false);
      const actionCanExecFalse = createActionDef('hkCanExecFalse', { hotkey: 'ctrl+n', canExecute: canExecuteFalse, handler: vi.fn() });
      core.registerActionsSource([actionCanExecFalse]);
      await nextTick();
      generatedConfig = mockUseKeyBindingsActual.mock.calls[mockUseKeyBindingsActual.mock.calls.length - 1][0] as KeyBindingConfig;
      hotkeyCallback = (generatedConfig['ctrl+n'] as ActualShortcutConfig)?.handler;
      hotkeyCallback?.(new KeyboardEvent('keydown', { key: 'n', ctrlKey: true }));
      await nextTick();
      expect(canExecuteFalse).toHaveBeenCalled();
      expect(executeActionSpy).not.toHaveBeenCalled();

      executeActionSpy.mockRestore();
    });

    it('should re-call useKeyBindings when an action source is unregistered or changed', async () => {
      const core = useActionCore();
      const action1 = createActionDef('hkUnreg1', { hotkey: 'ctrl+x' });

      mockUseKeyBindingsActual.mockClear();
      const sourceKey = core.registerActionsSource([action1]);
      await nextTick();
      expect(mockUseKeyBindingsActual).toHaveBeenCalledTimes(1);

      core.unregisterActionsSource(sourceKey);
      await nextTick();
      // After unregistering the only source with hotkeys, the old hotkeys are cleaned up,
      // but useKeyBindings is not called again if there are no new hotkeys to bind.
      expect(mockUseKeyBindingsActual).toHaveBeenCalledTimes(1);

      mockUseKeyBindingsActual.mockClear();
      const sourceRef = ref([createActionDef('refAction', { hotkey: 'ctrl+r' })]);
      core.registerActionsSource(sourceRef);
      await nextTick();
      expect(mockUseKeyBindingsActual).toHaveBeenCalledTimes(1);

      sourceRef.value = [createActionDef('refActionUpdated', { hotkey: 'alt+r' })];
      await nextTick();
      expect(mockUseKeyBindingsActual).toHaveBeenCalledTimes(2);
    });
  });

  describe('Async Action Source Handling', () => {
    it('should call useKeyBindings after async action source resolves', async () => {
      const core = useActionCore({ verboseLogging: true });
      const asyncAction = createActionDef('asyncAct1', { hotkey: 'ctrl+a' });
      const promiseSource = () => new Promise<ActionDefinition[]>(resolve => {
        setTimeout(() => resolve([asyncAction]), 0);
      });
      const consoleDebugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

      mockUseKeyBindingsActual.mockClear();
      core.registerActionsSource(promiseSource);
      await nextTick();
      const initialCallCount = mockUseKeyBindingsActual.mock.calls.length;
      // Check that the specific verbose log message was among the calls
      expect(consoleDebugSpy.mock.calls).toContainEqual([
        expect.stringContaining('[Vuetify ActionCore]'), // Corrected prefix
        '[VERBOSE]',
        'Processing async action source'
      ]);

      vi.advanceTimersByTime(10);
      await nextTick();
      await nextTick();

      expect(mockUseKeyBindingsActual.mock.calls.length).toBeGreaterThan(initialCallCount);
      const lastCallConfig = mockUseKeyBindingsActual.mock.calls[mockUseKeyBindingsActual.mock.calls.length - 1][0] as KeyBindingConfig;
      expect(lastCallConfig['ctrl+a']).toBeDefined();
      consoleDebugSpy.mockRestore();
    });
  })

  describe('Action Profiling', () => {
    it('setActiveProfile should trigger re-evaluation of hotkeys via useKeyBindings', async () => {
      const core = useActionCore({ verboseLogging: true });
      const actionWithProfiles = createActionDef('profiledAction1', {
        title: 'Base Title',
        hotkey: 'base+h',
        profiles: {
          testProfile: {
            title: 'Profile Title',
            hotkey: 'profile+h',
          },
        },
        handler: vi.fn(),
      });
      core.registerActionsSource([actionWithProfiles]);
      await nextTick();

      mockUseKeyBindingsActual.mockClear();
      core.setActiveProfile('testProfile');
      await nextTick();

      expect(mockUseKeyBindingsActual).toHaveBeenCalledTimes(1);
      const generatedConfig = mockUseKeyBindingsActual.mock.calls[0][0] as KeyBindingConfig;
      expect(generatedConfig['profile+h']).toBeDefined();
      expect(generatedConfig['base+h']).toBeUndefined();

      mockUseKeyBindingsActual.mockClear();
      core.setActiveProfile(null); // Revert to base
      await nextTick();
      expect(mockUseKeyBindingsActual).toHaveBeenCalledTimes(1);
      const baseConfig = mockUseKeyBindingsActual.mock.calls[0][0] as KeyBindingConfig;
      expect(baseConfig['base+h']).toBeDefined();
      expect(baseConfig['profile+h']).toBeUndefined();
    });
  })
});
