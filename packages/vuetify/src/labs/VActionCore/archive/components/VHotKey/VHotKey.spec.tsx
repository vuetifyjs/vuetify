// Components
// import { VHotKey } from './VHotKey' // Import will be dynamic in Mac tests

// Utilities
import { render } from '@test'
import { computed, nextTick, ref } from 'vue'
import { ActionCoreSymbol } from '@/labs/VActionCore'

// Types
import type { ActionCorePublicAPI, ActionDefinition } from '@/labs/VActionCore'

// Default mock for platform. Individual describe blocks can override IS_MAC.
vi.mock('../../platform', async importOriginal => {
  const originalPlatformModule = await importOriginal() as any
  return {
    ...originalPlatformModule,
    IS_MAC: false, // Default to non-Mac
    IS_CLIENT: true,
  }
})

const getDisplayedKeys = (container: HTMLElement | null) => {
  if (!container) return []
  const kbdElements = container.querySelectorAll('.v-hot-key__key')
  return Array.from(kbdElements).map(el => el.textContent)
}

const mockGetAction = vi.fn()
const createMockActionCore = (): ActionCorePublicAPI => ({
  isLoading: ref(false),
  allActions: computed(() => []),
  activeProfile: ref(null),
  registerActionsSource: vi.fn(),
  unregisterActionsSource: vi.fn(),
  getAction: mockGetAction,
  executeAction: vi.fn(),
  destroy: vi.fn(),
  setActiveProfile: vi.fn(),
})

let mockActionCoreInstance: ActionCorePublicAPI

describe('VHotKey', () => {
  let VHotKeyComponent: any // To hold dynamically imported component

  beforeEach(async () => {
    mockActionCoreInstance = createMockActionCore()
    mockGetAction.mockReset()
    vi.resetModules() // Reset modules before each test

    // Default mock for non-Mac tests or before Mac-specific mocks are applied
    vi.doUnmock('../../platform')
    vi.doMock('../../platform', async importOriginal => {
      const original = await importOriginal() as any
      return { ...original, IS_MAC: false, IS_CLIENT: true }
    })
    const platform = await import('../../platform')
    const VHotKeyModule = await import('./VHotKey')
    VHotKeyComponent = VHotKeyModule.VHotKey
  })

  describe('Non-Mac Rendering & Basic Functionality', () => {
    // These tests will use the default IS_MAC: false mock established in the outer beforeEach
    it('should render correctly with a simple hotkey', () => {
      const { container } = render(VHotKeyComponent, { props: { hotkey: 'ctrl_k' } })
      const hotKeyEl = container.firstChild as HTMLElement
      expect(hotKeyEl.classList.contains('v-hot-key')).toBe(true)
      expect(getDisplayedKeys(hotKeyEl)).toEqual(['Ctrl', 'K'])
    })

    it('should render meta as Ctrl on non-Mac', () => {
      const { container } = render(VHotKeyComponent, { props: { hotkey: 'meta_s' } })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', 'S'])
    })

    it('should render cmd as Ctrl on non-Mac', () => {
      const { container } = render(VHotKeyComponent, { props: { hotkey: 'cmd_o' } })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', 'O'])
    })
    // ... other non-Mac tests remain largely the same, using VHotKeyComponent ...
    it('should render correct tag', () => {
      const { container } = render(VHotKeyComponent, { props: { hotkey: 'a', tag: 'span' } })
      expect(container.querySelector('span.v-hot-key')).toBeTruthy()
    })

    it('should apply density classes when density prop is used', () => {
      const { container } = render(VHotKeyComponent, { props: { hotkey: 'b', density: 'compact' } })
      const hotKeyEl = container.firstChild as HTMLElement
      expect(hotKeyEl.classList.contains('v-hot-key--density-compact')).toBe(true)
    })

    it('should render modifiers in correct order', () => {
      const { container } = render(VHotKeyComponent, { props: { hotkey: 'k_shift_ctrl_alt' } })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', 'Alt', 'Shift', 'K'])
    })

    it('should render special keys correctly', () => {
      const { container: space } = render(VHotKeyComponent, { props: { hotkey: 'space' } })
      expect(getDisplayedKeys(space.firstChild as HTMLElement)).toEqual(['Space'])
      const { container: enter } = render(VHotKeyComponent, { props: { hotkey: 'enter' } })
      expect(getDisplayedKeys(enter.firstChild as HTMLElement)).toEqual(['Enter'])
      const { container: arrowUp } = render(VHotKeyComponent, { props: { hotkey: 'arrowup' } })
      expect(getDisplayedKeys(arrowUp.firstChild as HTMLElement)).toEqual(['↑'])
    })

    it('should render function keys correctly', () => {
      const { container } = render(VHotKeyComponent, { props: { hotkey: 'f5' } })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['F5'])
      const { container: f12 } = render(VHotKeyComponent, { props: { hotkey: 'F12' } })
      expect(getDisplayedKeys(f12.firstChild as HTMLElement)).toEqual(['F12'])
    })

    it('should render default slot content if provided', () => {
      const { container } = render(VHotKeyComponent, {
        props: { hotkey: 'ctrl_p' },
        slots: { default: () => <span class="custom-slot-content">Custom</span> },
      })
      const customSlotEl = container.querySelector('.custom-slot-content')
      expect(customSlotEl).toBeTruthy()
      expect(customSlotEl?.textContent).toBe('Custom')
      expect(container.querySelector('.v-hot-key__key')).toBeFalsy()
    })

    it('handles complex hotkey strings with multiple modifiers and aliases', async () => {
      const { container } = render(VHotKeyComponent, { props: { hotkey: 'meta_shift_alt_k' } })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', 'Alt', 'Shift', 'K'])
    })

    it('handles single character hotkeys', () => {
      const { container } = render(VHotKeyComponent, { props: { hotkey: 'a' } })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['A'])
    })

    it('handles number hotkeys', () => {
      const { container } = render(VHotKeyComponent, { props: { hotkey: '7' } })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['7'])
    })
  })

  describe('Mac Specific Rendering', () => {
    let VHotKeyMac: any
    beforeEach(async () => {
      vi.resetModules()
      vi.doUnmock('../../platform')
      vi.doMock('../../platform', async importOriginal => {
        const original = await importOriginal() as any
        return { ...original, IS_MAC: true, IS_CLIENT: true }
      })
      const VHotKeyModule = await import('./VHotKey')
      VHotKeyMac = VHotKeyModule.VHotKey
    })

    it('should render meta as ⌘ on Mac', () => {
      const { container } = render(VHotKeyMac, { props: { hotkey: 'meta_s' } })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['⌘', 'S'])
    })

    it('should render cmd as ⌘ on Mac', () => {
      const { container } = render(VHotKeyMac, { props: { hotkey: 'cmd_o' } })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['⌘', 'O'])
    })

    it('should render explicit ctrl as ⌃ on Mac (when not a common command key or with other modifiers)', () => {
      const { container } = render(VHotKeyMac, { props: { hotkey: 'ctrl_b' } }) // Not in commonMacCtrlAsMetaKeys
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['⌃', 'B'])
    })

    it('should render explicit ctrl as ⌘ on Mac for common single-letter command keys (heuristic)', () => {
      // This test relies on the commonMacCtrlAsMetaKeys heuristic in VHotKey
      const { container } = render(VHotKeyMac, { props: { hotkey: 'ctrl_s' } }) // 's' is in commonMacCtrlAsMetaKeys
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['⌘', 'S'])
    })

    it('should NOT render ctrl as ⌘ on Mac if other modifiers are present, should use ⌃', () => {
      const { container } = render(VHotKeyMac, { props: { hotkey: 'ctrl+shift+s' } })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['⌃', 'Shift', 'S']) // Ensured expectation is ⌃
    })

    it('should NOT render ctrl as ⌘ on Mac if meta is also present, should use ⌃', () => {
      const { container } = render(VHotKeyMac, { props: { hotkey: 'meta+ctrl+s' } })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['⌘', '⌃', 'S']) // Corrected expectation
    })

    it('should display inferred ⌘ for ctrl+s via actionId on Mac (actionId integration with heuristic)', async () => {
      const actionDef: ActionDefinition = { id: 'testActionMacCtrl', title: 'Test Mac Ctrl', hotkey: 'ctrl_s' };
      mockGetAction.mockReturnValue(actionDef);
      const { container } = render(VHotKeyMac, {
        props: { actionId: 'testActionMacCtrl' },
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } },
      });
      await vi.waitUntil(() => getDisplayedKeys(container.firstChild as HTMLElement).length > 0, { timeout: 1000 });
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['⌘', 'S']); // Heuristic applies
    });
  })

  describe('actionId prop integration (general - non-Mac unless specified)', () => {
    // This will use VHotKeyComponent (with IS_MAC: false by default from outer beforeEach)

    it('should display hotkey from actionId if action is found and has hotkey string', async () => {
      const actionDef: ActionDefinition = { id: 'testAction', title: 'Test', hotkey: 'alt_t' }
      mockGetAction.mockReturnValue(actionDef)
      const { container } = render(VHotKeyComponent, {
        props: { actionId: 'testAction' },
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } },
      })
      await vi.waitUntil(() => getDisplayedKeys(container.firstChild as HTMLElement).length > 0, { timeout: 1000 })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Alt', 'T'])
    })

    it('should display first hotkey if action.hotkey is an array', async () => {
      const actionDef: ActionDefinition = { id: 'testActionArray', title: 'Test Array', hotkey: ['ctrl_1', 'alt_1'] }
      mockGetAction.mockReturnValue(actionDef)
      const { container } = render(VHotKeyComponent, {
        props: { actionId: 'testActionArray' },
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } },
      })
      await vi.waitUntil(() => getDisplayedKeys(container.firstChild as HTMLElement).length > 0, { timeout: 1000 })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', '1'])
    })

    it('should render nothing if action is found but has no hotkey', async () => {
      const actionDef: ActionDefinition = { id: 'noHotkeyAction', title: 'No Hotkey' }
      mockGetAction.mockReturnValue(actionDef)
      const { container } = render(VHotKeyComponent, {
        props: { actionId: 'noHotkeyAction' },
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } },
      })
      await vi.waitUntil(() => (container.firstChild as HTMLElement)?.getAttribute('aria-label') === 'Hotkey: none', { timeout: 1000 })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual([])
    })

    it('should render nothing if actionId is not found', async () => {
      mockGetAction.mockImplementation(async id => {
        await nextTick()
        if (id === 'notFoundAction') return undefined
        return undefined
      })
      const { container } = render(VHotKeyComponent, {
        props: { actionId: 'notFoundAction' },
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } },
      })
      await vi.waitUntil(() => (container.firstChild as HTMLElement)?.getAttribute('aria-label') === 'Hotkey: none', { timeout: 1000 })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual([])
    })

    it('direct hotkey prop should take precedence ONLY IF action from actionId has NO hotkey', async () => {
      const actionWithHotkey: ActionDefinition = { id: 'testActionHk', title: 'Test With HK', hotkey: 'alt_t' }
      const actionNoHotkey: ActionDefinition = { id: 'noHotkeyAction2', title: 'No Hotkey 2' }

      mockGetAction.mockReturnValueOnce(actionWithHotkey)
      const { container: c1 } = render(VHotKeyComponent, {
        props: { actionId: 'testActionHk', hotkey: 'ctrl_p' },
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } },
      })
      await vi.waitUntil(() => getDisplayedKeys(c1.firstChild as HTMLElement)[0] === 'Alt', { timeout: 1000 })
      expect(getDisplayedKeys(c1.firstChild as HTMLElement)).toEqual(['Alt', 'T'])

      mockGetAction.mockReset()
      mockGetAction.mockReturnValueOnce(actionNoHotkey)
      const { container: c2 } = render(VHotKeyComponent, {
        props: { actionId: 'noHotkeyAction2', hotkey: 'shift_x' },
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } },
      })
      await vi.waitUntil(() => getDisplayedKeys(c2.firstChild as HTMLElement)[0] === 'Shift', { timeout: 1000 })
      expect(getDisplayedKeys(c2.firstChild as HTMLElement)).toEqual(['Shift', 'X'])
    })

    it('should update display if actionId prop changes', async () => {
      const action1: ActionDefinition = { id: 'act1', title: 'Action 1', hotkey: 'ctrl_1' }
      const action2: ActionDefinition = { id: 'act2', title: 'Action 2', hotkey: 'ctrl_2' }
      mockGetAction.mockImplementation(id => {
        if (id === 'act1') return action1
        if (id === 'act2') return action2
        return undefined
      })
      const { container, rerender } = render(VHotKeyComponent, {
        props: { actionId: 'act1' },
        global: { provide: { [ActionCoreSymbol as symbol]: mockActionCoreInstance } },
      })
      await vi.waitUntil(() => getDisplayedKeys(container.firstChild as HTMLElement)[0] === 'Ctrl', { timeout: 1000 })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', '1'])
      await rerender({ actionId: 'act2' })
      await vi.waitUntil(() => (container.firstChild as HTMLElement)?.getAttribute('aria-label') === 'Hotkey: ctrl_2', { timeout: 1000 })
      expect(getDisplayedKeys(container.firstChild as HTMLElement)).toEqual(['Ctrl', '2'])
    })
  })
})
