// Components
import { VHotKey } from './VHotKey' // Adjust path if necessary

// Utilities
import { render } from '@test' // Corrected import path for Vuetify's test utils
import { describe, it, expect, vi } from 'vitest'

// Mock platform
vi.mock('../../platform', () => ({
  IS_MAC: false, // Default to non-Mac for most tests
  IS_CLIENT: true,
}))

const getDisplayedKeys = (container: HTMLElement) => {
  const kbdElements = container.querySelectorAll('.v-hot-key__key')
  return Array.from(kbdElements).map(el => el.textContent)
}

describe('VHotKey', () => {
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
})
