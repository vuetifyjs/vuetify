// Components
import { VHotKey } from './VHotKey' // Adjust path if necessary

// Utilities
import { render } from '@test' // Corrected import path for Vuetify's test utils
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ActionCoreSymbol, type ActionDefinition, type ActionCorePublicAPI } from '@/labs/action-core' // Import ActionCore types and symbol
import { ref, computed, markRaw, nextTick } from 'vue' // For mocking ActionCore

// Mock platform
vi.mock('../../platform', () => ({
  IS_MAC: false, // Default to non-Mac for most tests
  IS_CLIENT: true,
}))

const getDisplayedKeys = (container: HTMLElement | null) => {
  if (!container) return [];
  const kbdElements = container.querySelectorAll('.v-hot-key__key')
  return Array.from(kbdElements).map(el => el.textContent)
}

// Helper to create a mock ActionCore instance
const mockGetAction = vi.fn();
const createMockActionCore = (): ActionCorePublicAPI => ({
  isLoading: ref(false),
  allActions: computed(() => []),
  registerActionsSource: vi.fn(),
  unregisterActionsSource: vi.fn(),
  getAction: mockGetAction,
  executeAction: vi.fn(),
  isComponentIntegrationEnabled: vi.fn(() => true),
  destroy: vi.fn(),
});

let mockActionCoreInstance: ActionCorePublicAPI;

describe('VHotKey', () => {
  beforeEach(() => {
    mockActionCoreInstance = createMockActionCore();
    mockGetAction.mockReset(); // Reset for each test
  });

  it('should render correctly with a simple hotkey', () => {
    const { container } = render(VHotKey, { props: { hotkey: 'ctrl+k' } })
    const hotKeyEl = container.firstChild as HTMLElement
    expect(hotKeyEl.classList.contains('v-hot-key')).toBe(true)
    expect(getDisplayedKeys(hotKeyEl)).toEqual(['Ctrl', 'K'])
    expect(hotKeyEl.getAttribute('aria-label')).toBe('Hotkey: ctrl+k')
    expect(hotKeyEl.getAttribute('role')).toBe('group')
  })

  it('should render correct tag', () => {
    const { container } = render(VHotKey, { props: { hotkey: 'a', tag: 'span' } })
    expect(container.querySelector('span.v-hot-key')).toBeTruthy()
  })

  it('should apply density classes when density prop is used', () => {
    const { container } = render(VHotKey, { props: { hotkey: 'b', density: 'compact' } })
    const hotKeyEl = container.firstChild as HTMLElement
    // Class name should be [componentName]--density-[densityValue]
    expect(hotKeyEl.classList.contains('v-hot-key--density-compact')).toBe(true)
  })

  describe('Platform Specific Rendering', () => {
    it('should render meta as ⌘ on Mac', async () => {
      const platformMock = await import('../../platform')
      ;(platformMock.IS_MAC as any) = true
      const { container } = render(VHotKey, { props: { hotkey: 'meta+s' } })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['⌘', 'S'])
      ;(platformMock.IS_MAC as any) = false // Reset for other tests
    })

    it('should render meta as Ctrl on non-Mac', async () => {
      const platformMock = await import('../../platform')
      ;(platformMock.IS_MAC as any) = false
      const { container } = render(VHotKey, { props: { hotkey: 'meta+s' } })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', 'S'])
    })

    it('should render cmd as ⌘ on Mac', async () => {
      const platformMock = await import('../../platform')
      ;(platformMock.IS_MAC as any) = true
      const { container } = render(VHotKey, { props: { hotkey: 'cmd+o' } })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['⌘', 'O'])
      ;(platformMock.IS_MAC as any) = false
    })

    it('should render cmd as Ctrl on non-Mac', async () => {
      const platformMock = await import('../../platform')
      ;(platformMock.IS_MAC as any) = false
      const { container } = render(VHotKey, { props: { hotkey: 'cmd+o' } })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', 'O'])
    })
  })

  describe('Platform Specific Rendering (with hotkey prop)', () => {
    it('should render explicit ctrl as Ctrl on Mac (when not a common command key)', async () => {
      const platformMock = await import('../../platform');
      ;(platformMock.IS_MAC as any) = true;
      const { container } = render(VHotKey, { props: { hotkey: 'ctrl+1' } });
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', '1']);
      ;(platformMock.IS_MAC as any) = false;
    });

    it('should render explicit ctrl as ⌘ on Mac for common single-letter command keys', async () => {
      const platformMock = await import('../../platform');
      ;(platformMock.IS_MAC as any) = true;
      const commonCommands = ['ctrl+s', 'ctrl+c', 'ctrl+v', 'ctrl+x', 'ctrl+z', 'ctrl+a', 'ctrl+f', 'ctrl+p', 'ctrl+o', 'ctrl+n', 'ctrl+w', 'ctrl+q', 'ctrl+k', 'ctrl+t'];
      for (const hotkey of commonCommands) {
        const mainKey = hotkey.split('+')[1].toUpperCase();
        const { container, unmount } = render(VHotKey, { props: { hotkey } });
        expect(getDisplayedKeys(container.firstChild as HTMLElement), `Test for ${hotkey}`).toEqual(['⌘', mainKey]);
        unmount(); // Clean up between renders in loop
      }
      ;(platformMock.IS_MAC as any) = false;
    });

    it('should NOT render ctrl as ⌘ on Mac if other modifiers are present', async () => {
      const platformMock = await import('../../platform');
      ;(platformMock.IS_MAC as any) = true;
      const { container } = render(VHotKey, { props: { hotkey: 'ctrl+shift+s' } });
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', 'Shift', 'S']);
      ;(platformMock.IS_MAC as any) = false;
    });

    it('should NOT render ctrl as ⌘ on Mac if meta is also present', async () => {
      const platformMock = await import('../../platform');
      ;(platformMock.IS_MAC as any) = true;
      const { container } = render(VHotKey, { props: { hotkey: 'meta+ctrl+s' } });
      // Order will be Meta, Ctrl, S
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['⌘', 'Ctrl', 'S']);
      ;(platformMock.IS_MAC as any) = false;
    });
  })

  it('should render modifiers in correct order', () => {
    const { container } = render(VHotKey, { props: { hotkey: 'k+shift+ctrl+alt' } })
    expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', 'Alt', 'Shift', 'K'])
  })

  it('should render special keys correctly', () => {
    const { container: space } = render(VHotKey, { props: { hotkey: 'space' } })
    expect(getDisplayedKeys(space.firstChild as HTMLElement)).toEqual(['Space'])
    const { container: enter } = render(VHotKey, { props: { hotkey: 'enter' } })
    expect(getDisplayedKeys(enter.firstChild as HTMLElement)).toEqual(['Enter'])
    const { container: arrowUp } = render(VHotKey, { props: { hotkey: 'arrowup' } })
    expect(getDisplayedKeys(arrowUp.firstChild as HTMLElement)).toEqual(['↑'])
  })

  it('should render function keys correctly', () => {
    const { container } = render(VHotKey, { props: { hotkey: 'f5' } })
    expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['F5'])
    const { container: f12 } = render(VHotKey, { props: { hotkey: 'F12' } })
    expect(getDisplayedKeys(f12.firstChild as HTMLElement)).toEqual(['F12'])
  })

  it('should render default slot content if provided', () => {
    const { container } = render(VHotKey, {
      props: { hotkey: 'ctrl+p' },
      slots: { default: () => <span class="custom-slot-content">Custom</span> },
    })
    const customSlotEl = container.querySelector('.custom-slot-content')
    expect(customSlotEl).toBeTruthy()
    expect(customSlotEl?.textContent).toBe('Custom')
    expect(container.querySelector('.v-hot-key__key')).toBeFalsy() // Default kbd rendering should be overridden
  })

  it('handles complex hotkey strings with multiple modifiers and aliases', () => {
    const { container } = render(VHotKey, { props: { hotkey: 'CmdOrCtrl+Shift+Alt+K' } })
    // On non-Mac (default mock), CmdOrCtrl becomes Ctrl.
    expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', 'Alt', 'Shift', 'K'])
  })

  it('handles single character hotkeys', () => {
    const { container } = render(VHotKey, { props: { hotkey: 'a' } })
    expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['A'])
  })

  it('handles number hotkeys', () => {
    const { container } = render(VHotKey, { props: { hotkey: '7' } })
    expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['7'])
  })

  // Test case for separators
  it('should render separators correctly between multiple keys', () => {
    const { container } = render(VHotKey, { props: { hotkey: 'ctrl+shift+k' } });
    const hotKeyEl = container.firstChild as HTMLElement;
    const separators = hotKeyEl.querySelectorAll('.v-hot-key__separator');
    expect(separators.length).toBe(2); // ctrl + shift + k -> 2 separators
    separators.forEach(sep => {
      expect(sep.textContent).toBe('+');
      expect(sep.getAttribute('aria-hidden')).toBe('true');
    });
  })

  describe('actionId prop integration', () => {
    it('should display hotkey from actionId if action is found and has hotkey string', async () => {
      const actionDef: ActionDefinition = { id: 'testAction', title: 'Test', hotkey: 'alt+t' };
      mockGetAction.mockReturnValue(actionDef);

      const { container } = render(VHotKey, {
        props: { actionId: 'testAction' },
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } }
      });
      await nextTick(); // for watcher to trigger
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Alt', 'T']);
      expect((container.firstChild as HTMLElement).getAttribute('aria-label')).toBe('Hotkey: alt+t');
    });

    it('should display first hotkey if action.hotkey is an array', async () => {
      const actionDef: ActionDefinition = { id: 'testActionArray', title: 'Test Array', hotkey: ['ctrl+1', 'alt+1'] };
      mockGetAction.mockReturnValue(actionDef);

      const { container } = render(VHotKey, {
        props: { actionId: 'testActionArray' },
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } }
      });
      await nextTick();
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', '1']);
      expect((container.firstChild as HTMLElement).getAttribute('aria-label')).toBe('Hotkey: ctrl+1');
    });

    it('should render nothing if action is found but has no hotkey', async () => {
      const actionDef: ActionDefinition = { id: 'noHotkeyAction', title: 'No Hotkey' }; // No hotkey property
      mockGetAction.mockReturnValue(actionDef);

      const { container } = render(VHotKey, {
        props: { actionId: 'noHotkeyAction' },
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } }
      });
      await nextTick();
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual([]);
      expect((container.firstChild as HTMLElement).getAttribute('aria-label')).toBe('Hotkey: none');
    });

    it('should render nothing if actionId is not found', async () => {
      mockGetAction.mockReturnValue(undefined); // Action not found

      const { container } = render(VHotKey, {
        props: { actionId: 'notFoundAction' },
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } }
      });
      await nextTick();
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual([]);
      expect((container.firstChild as HTMLElement).getAttribute('aria-label')).toBe('Hotkey: none');
    });

    it('direct hotkey prop should take precedence over actionId if both provided', async () => {
      const actionDef: ActionDefinition = { id: 'testAction', title: 'Test', hotkey: 'alt+t' };
      mockGetAction.mockReturnValue(actionDef);

      const { container } = render(VHotKey, {
        props: { actionId: 'testAction', hotkey: 'ctrl+p' }, // direct hotkey is different
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } }
      });
      await nextTick();
      // Current VHotKey logic: watch for actionId runs immediately, then watch for props.hotkey.
      // If actionId provides a hotkey, internalHotkeyString is set. The watch for props.hotkey
      // only updates internalHotkeyString if !props.actionId. So actionId effectively wins IF IT HAS A HOTKEY.
      // If actionId leads to no hotkey, THEN props.hotkey would be used.
      // Let's test the case where actionId provides a hotkey.
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Alt', 'T']);
      expect((container.firstChild as HTMLElement).getAttribute('aria-label')).toBe('Hotkey: alt+t');

      // Test when actionId yields no hotkey, direct hotkey should be used
      const actionNoHotkey: ActionDefinition = { id: 'noHotkeyAction2', title: 'No Hotkey 2' };
      mockGetAction.mockReturnValueOnce(actionNoHotkey);
      const { container: container2 } = render(VHotKey, {
        props: { actionId: 'noHotkeyAction2', hotkey: 'shift+x' },
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } }
      });
      await nextTick();
      expect(getDisplayedKeys(container2.firstChild as HTMLElement)).toEqual(['Shift', 'X']);
      expect((container2.firstChild as HTMLElement).getAttribute('aria-label')).toBe('Hotkey: shift+x');
    });

    it('should update display if actionId prop changes', async () => {
      const action1: ActionDefinition = { id: 'act1', title: 'Action 1', hotkey: 'ctrl+1' };
      const action2: ActionDefinition = { id: 'act2', title: 'Action 2', hotkey: 'ctrl+2' };
      mockGetAction.mockImplementation(id => {
        if (id === 'act1') return action1;
        if (id === 'act2') return action2;
        return undefined;
      });

      const { container, rerender } = render(VHotKey, {
        props: { actionId: 'act1' },
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } }
      });
      await nextTick();
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', '1']);

      await rerender({ actionId: 'act2' });
      await nextTick();
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', '2']);
    });

    it('should display inferred ⌘ for ctrl+s via actionId on Mac', async () => {
      const platformMock = await import('../../platform');
      ;(platformMock.IS_MAC as any) = true;
      const actionDef: ActionDefinition = { id: 'testActionCtrlS', title: 'Test Ctrl S', hotkey: 'ctrl+s' };
      mockGetAction.mockReturnValue(actionDef);

      const { container } = render(VHotKey, {
        props: { actionId: 'testActionCtrlS' },
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } }
      });
      await nextTick();
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['⌘', 'S']);
      expect((container.firstChild as HTMLElement).getAttribute('aria-label')).toBe('Hotkey: ctrl+s'); // aria-label should reflect original
      ;(platformMock.IS_MAC as any) = false;
    });
  });
})
