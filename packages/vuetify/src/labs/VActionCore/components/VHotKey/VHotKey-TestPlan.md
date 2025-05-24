# VHotKey Test Plan

## Overview

This test plan covers comprehensive testing for the `VHotKey` component, focused on its core display functionality. The testing strategy emphasizes the requirements-aligned features while ensuring reliability and cross-platform compatibility. All tests align with the simplified design that avoids over-engineering.

## Testing Tools and Setup

### Unit Testing Stack
- **Framework**: Vitest (preferred) or Jest
- **Vue Testing**: @vue/test-utils
- **Mocking**: vi.mock() for ActionCore integration
- **TypeScript**: Full type checking in tests

### Test Environment
```typescript
// test-setup.ts
import { createVuetify } from 'vuetify'
import '@testing-library/jest-dom'

// Mock useKeyBindings for consistent testing
vi.mock('@/composables/key-bindings', () => ({
  KeyBindingUtils: {
    formatForDisplay: vi.fn(),
    parse: vi.fn(),
    validate: vi.fn()
  }
}))

// Mock ActionCore
vi.mock('@/labs/VActionCore/ActionCore', () => ({
  ActionCoreKey: Symbol('ActionCore')
}))
```

## Unit Tests

### 1. Core Props and Rendering

#### 1.1 Basic Prop Validation
```typescript
describe('VHotKey - Props Validation', () => {
  test('warns when neither hotkey nor actionId provided', () => {
    const consoleSpy = vi.spyOn(console, 'warn')
    mount(VHotKey, {})

    expect(consoleSpy).toHaveBeenCalledWith(
      '[VHotKey] At least one of "hotkey" or "actionId" props must be provided'
    )
  })

  test('accepts hotkey prop only', () => {
    const wrapper = mount(VHotKey, {
      props: { hotkey: 'Ctrl+S' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  test('accepts actionId prop only', () => {
    const wrapper = mount(VHotKey, {
      props: { actionId: 'editor.save' }
    })
    expect(wrapper.exists()).toBe(true)
  })

  test('prioritizes actionId over hotkey when both provided', () => {
    const mockActionCore = {
      getEffectiveHotkey: vi.fn().mockReturnValue('Ctrl+Shift+S')
    }

    const wrapper = mount(VHotKey, {
      props: {
        hotkey: 'Ctrl+S',
        actionId: 'editor.save'
      },
      global: {
        provide: {
          [ActionCoreKey]: mockActionCore
        }
      }
    })

    expect(mockActionCore.getEffectiveHotkey).toHaveBeenCalledWith('editor.save')
  })
})
```

#### 1.2 Display Mode Testing
```typescript
describe('VHotKey - Display Mode', () => {
  beforeEach(() => {
    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [{
        keys: [
          { display: '⌘', type: 'modifier' },
          { display: 'S', type: 'key' }
        ]
      }],
      combinationSeparator: '',
      sequenceSeparator: ''
    })
  })

  test('displays symbol mode by default', () => {
    const wrapper = mount(VHotKey, {
      props: { hotkey: 'Meta+S' }
    })

    expect(KeyBindingUtils.formatForDisplay).toHaveBeenCalledWith(
      'Meta+S',
      'symbol',
      {
        combinationSeparator: '',
        sequenceSeparator: 'then'
      }
    )
    expect(wrapper.text()).toContain('⌘')
  })

  test('displays text mode when specified', () => {
    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [{
        keys: [
          { display: 'Cmd', type: 'modifier' },
          { display: 'S', type: 'key' }
        ]
      }],
      combinationSeparator: '',
      sequenceSeparator: ''
    })

    const wrapper = mount(VHotKey, {
      props: {
        hotkey: 'Meta+S',
        displayMode: 'text'
      }
    })

    expect(KeyBindingUtils.formatForDisplay).toHaveBeenCalledWith(
      'Meta+S',
      'text',
      {
        combinationSeparator: '',
        sequenceSeparator: 'then'
      }
    )
    expect(wrapper.text()).toContain('Cmd')
  })

  test('uses KeyBindingUtils for platform-specific formatting', () => {
    mount(VHotKey, {
      props: { hotkey: 'Meta+S' }
    })

    expect(KeyBindingUtils.formatForDisplay).toHaveBeenCalledWith(
      'Meta+S',
      'symbol',
      expect.any(Object)
    )
  })
})
```

#### 1.3 Size and Variant Testing
```typescript
describe('VHotKey - Visual Variants', () => {
  const sizes = ['x-small', 'small', 'default', 'large', 'x-large'] as const
  const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain'] as const

  sizes.forEach(size => {
    test(`applies size-${size} class`, () => {
      const wrapper = mount(VHotKey, {
        props: {
          hotkey: 'Ctrl+S',
          size
        }
      })

      expect(wrapper.classes()).toContain(`v-hotkey--size-${size}`)
    })
  })

  variants.forEach(variant => {
    test(`applies variant-${variant} class`, () => {
      const wrapper = mount(VHotKey, {
        props: {
          hotkey: 'Ctrl+S',
          variant
        }
      })

      expect(wrapper.classes()).toContain(`v-hotkey--variant-${variant}`)
    })
  })
})
```

### 2. Separator Handling

#### 2.1 Combination and Sequence Separators
```typescript
describe('VHotKey - Separators', () => {
  test('passes combination separator to formatForDisplay', () => {
    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [{
        keys: [
          { display: 'Ctrl', type: 'modifier' },
          { display: 'S', type: 'key' }
        ]
      }],
      combinationSeparator: ' + ',
      sequenceSeparator: ''
    })

    mount(VHotKey, {
      props: {
        hotkey: 'Ctrl+S',
        combinationSeparator: ' + '
      }
    })

    expect(KeyBindingUtils.formatForDisplay).toHaveBeenCalledWith(
      'Ctrl+S',
      'symbol',
      {
        combinationSeparator: ' + ',
        sequenceSeparator: 'then'
      }
    )
  })

  test('renders sequence separator from formatForDisplay result', () => {
    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [
        { keys: [{ display: 'Ctrl', type: 'modifier' }, { display: 'K', type: 'key' }] },
        { keys: [{ display: 'Ctrl', type: 'modifier' }, { display: 'S', type: 'key' }] }
      ],
      combinationSeparator: '',
      sequenceSeparator: ' → '
    })

    const wrapper = mount(VHotKey, {
      props: {
        hotkey: 'Ctrl+K Ctrl+S',
        sequenceSeparator: ' → '
      }
    })

    expect(wrapper.find('.v-hotkey__sequence-separator').text()).toBe(' → ')
  })

  test('handles false separators', () => {
    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [{
        keys: [
          { display: 'Ctrl', type: 'modifier' },
          { display: 'S', type: 'key' }
        ]
      }],
      combinationSeparator: null,
      sequenceSeparator: null
    })

    mount(VHotKey, {
      props: {
        hotkey: 'Ctrl+S',
        combinationSeparator: false,
        sequenceSeparator: false
      }
    })

    expect(KeyBindingUtils.formatForDisplay).toHaveBeenCalledWith(
      'Ctrl+S',
      'symbol',
      {
        combinationSeparator: false,
        sequenceSeparator: false
      }
    )
  })

  test('uses localized default separators', () => {
    mount(VHotKey, {
      props: { hotkey: 'Ctrl+K Ctrl+S' }
    })

    expect(KeyBindingUtils.formatForDisplay).toHaveBeenCalledWith(
      'Ctrl+K Ctrl+S',
      'symbol',
      {
        combinationSeparator: '',
        sequenceSeparator: 'then'
      }
    )
  })
})
```

### 3. ActionCore Integration

#### 3.1 Basic ActionCore Integration
```typescript
describe('VHotKey - ActionCore Integration', () => {
  test('resolves hotkey from ActionCore when actionId provided', () => {
    const mockActionCore = {
      getEffectiveHotkey: vi.fn().mockReturnValue('Ctrl+Shift+S')
    }

    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [{ keys: [{ display: 'Ctrl+Shift+S', type: 'key' }] }],
      combinationSeparator: '',
      sequenceSeparator: ''
    })

    mount(VHotKey, {
      props: { actionId: 'editor.save-all' },
      global: {
        provide: {
          [ActionCoreKey]: mockActionCore
        }
      }
    })

    expect(mockActionCore.getEffectiveHotkey).toHaveBeenCalledWith('editor.save-all')
    expect(KeyBindingUtils.formatForDisplay).toHaveBeenCalledWith('Ctrl+Shift+S', 'symbol', expect.any(Object))
  })

  test('falls back to hotkey prop when actionId does not resolve', () => {
    const mockActionCore = {
      getEffectiveHotkey: vi.fn().mockReturnValue(null)
    }

    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [{ keys: [{ display: 'Ctrl+S', type: 'key' }] }],
      combinationSeparator: '',
      sequenceSeparator: ''
    })

    mount(VHotKey, {
      props: {
        actionId: 'nonexistent.action',
        hotkey: 'Ctrl+S'
      },
      global: {
        provide: {
          [ActionCoreKey]: mockActionCore
        }
      }
    })

    expect(KeyBindingUtils.formatForDisplay).toHaveBeenCalledWith('Ctrl+S', 'symbol', expect.any(Object))
  })

  test('handles ActionCore errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn')
    const mockActionCore = {
      getEffectiveHotkey: vi.fn().mockImplementation(() => {
        throw new Error('ActionCore error')
      })
    }

    mount(VHotKey, {
      props: { actionId: 'invalid.action' },
      global: {
        provide: {
          [ActionCoreKey]: mockActionCore
        }
      }
    })

    expect(consoleSpy).toHaveBeenCalledWith(
      '[VHotKey] Failed to get effective hotkey for action "invalid.action":',
      expect.any(Error)
    )
  })

  test('renders nothing when actionId not found and no fallback', () => {
    const mockActionCore = {
      getEffectiveHotkey: vi.fn().mockReturnValue(null)
    }

    const wrapper = mount(VHotKey, {
      props: { actionId: 'nonexistent.action' },
      global: {
        provide: {
          [ActionCoreKey]: mockActionCore
        }
      }
    })

    expect(wrapper.text()).toBe('')
  })

  test('emits development warning when ActionCore not available', () => {
    Object.defineProperty(globalThis, '__DEV__', {
      value: true,
      writable: true
    })

    const consoleSpy = vi.spyOn(console, 'error')

    mount(VHotKey, {
      props: { actionId: 'some.action' }
    })

    expect(consoleSpy).toHaveBeenCalledWith(
      '[VHotKey] ActionCore not available but actionId provided'
    )
  })

  test('emits production warning when ActionCore not available', () => {
    Object.defineProperty(globalThis, '__DEV__', {
      value: false,
      writable: true
    })

    const consoleSpy = vi.spyOn(console, 'warn')

    mount(VHotKey, {
      props: { actionId: 'some.action' }
    })

    expect(consoleSpy).toHaveBeenCalledWith(
      '[VHotKey] ActionCore not available but actionId provided'
    )
  })

  test('respects showWarning prop to disable warnings', () => {
    const consoleSpy = vi.spyOn(console, 'error')

    mount(VHotKey, {
      props: {
        actionId: 'some.action',
        showWarning: false
      }
    })

    expect(consoleSpy).not.toHaveBeenCalled()
  })
})
```

### 4. Hotkey Processing

#### 4.1 KeyBindingUtils Integration
```typescript
describe('VHotKey - KeyBindingUtils Integration', () => {
  test('uses KeyBindingUtils.formatForDisplay for consistent formatting', () => {
    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [{
        keys: [
          { display: 'Ctrl', type: 'modifier' },
          { display: 'S', type: 'key' }
        ]
      }],
      combinationSeparator: '',
      sequenceSeparator: ''
    })

    mount(VHotKey, {
      props: { hotkey: 'Ctrl+S' }
    })

    expect(KeyBindingUtils.formatForDisplay).toHaveBeenCalledWith(
      'Ctrl+S',
      'symbol',
      {
        combinationSeparator: '',
        sequenceSeparator: 'then'
      }
    )
  })

  test('handles KeyBindingUtils formatForDisplay errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'warn')
    vi.mocked(KeyBindingUtils.formatForDisplay).mockImplementation(() => {
      throw new Error('Invalid hotkey format')
    })

    const wrapper = mount(VHotKey, {
      props: { hotkey: 'invalid-hotkey' }
    })

    expect(consoleSpy).toHaveBeenCalledWith(
      '[VHotKey] Failed to format hotkey string:',
      'invalid-hotkey',
      expect.any(Error)
    )
    expect(wrapper.text()).toBe('')
  })

  test('passes correct options to formatForDisplay', () => {
    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [{ keys: [] }],
      combinationSeparator: ' + ',
      sequenceSeparator: ' → '
    })

    mount(VHotKey, {
      props: {
        hotkey: 'Ctrl+K Ctrl+S',
        displayMode: 'text',
        combinationSeparator: ' + ',
        sequenceSeparator: ' → '
      }
    })

    expect(KeyBindingUtils.formatForDisplay).toHaveBeenCalledWith(
      'Ctrl+K Ctrl+S',
      'text',
      {
        combinationSeparator: ' + ',
        sequenceSeparator: ' → '
      }
    )
  })
})
```

#### 4.2 Sequence and Key Rendering
```typescript
describe('VHotKey - Key Sequences and Rendering', () => {
  test('renders single key combination', () => {
    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [{
        keys: [
          { display: 'Ctrl', type: 'modifier' },
          { display: 'S', type: 'key' }
        ]
      }],
      combinationSeparator: '',
      sequenceSeparator: ''
    })

    const wrapper = mount(VHotKey, {
      props: { hotkey: 'Ctrl+S' }
    })

    expect(wrapper.findAll('.v-hotkey__sequence')).toHaveLength(1)
    expect(wrapper.findAll('.v-hotkey__key')).toHaveLength(2)
  })

  test('renders key sequence with separator', () => {
    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [
        { keys: [{ display: 'Ctrl', type: 'modifier' }, { display: 'K', type: 'key' }] },
        { keys: [{ display: 'Ctrl', type: 'modifier' }, { display: 'S', type: 'key' }] }
      ],
      combinationSeparator: '',
      sequenceSeparator: ' → '
    })

    const wrapper = mount(VHotKey, {
      props: {
        hotkey: 'Ctrl+K Ctrl+S',
        sequenceSeparator: ' → '
      }
    })

    expect(wrapper.findAll('.v-hotkey__sequence')).toHaveLength(2)
    expect(wrapper.find('.v-hotkey__sequence-separator').text()).toBe(' → ')
  })

  test('applies key type classes correctly', () => {
    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [{
        keys: [
          { display: 'Ctrl', type: 'modifier' },
          { display: 'F12', type: 'function' },
          { display: 'S', type: 'key' }
        ]
      }],
      combinationSeparator: '',
      sequenceSeparator: ''
    })

    const wrapper = mount(VHotKey, {
      props: { hotkey: 'Ctrl+F12+S' }
    })

    const keys = wrapper.findAll('.v-hotkey__key')
    expect(keys[0].classes()).toContain('v-hotkey__key--modifier')
    expect(keys[1].classes()).toContain('v-hotkey__key--function')
    expect(keys[2].classes()).toContain('v-hotkey__key--key')
  })
})
```

### 5. Error Handling and Edge Cases

#### 5.1 Warning System
```typescript
describe('VHotKey - Warning System', () => {
  test('emits console warnings in development mode only', () => {
    // Mock development environment
    Object.defineProperty(globalThis, '__DEV__', {
      value: true,
      writable: true
    })

    const consoleSpy = vi.spyOn(console, 'warn')

    mount(VHotKey, {})

    expect(consoleSpy).toHaveBeenCalledWith(
      '[VHotKey] At least one of "hotkey" or "actionId" props must be provided'
    )

    // Reset
    Object.defineProperty(globalThis, '__DEV__', {
      value: false,
      writable: true
    })

    consoleSpy.mockClear()

    mount(VHotKey, {})

    expect(consoleSpy).not.toHaveBeenCalled()
  })
})
```

#### 5.2 Edge Cases
```typescript
describe('VHotKey - Edge Cases', () => {
  test('handles null hotkey gracefully', () => {
    const wrapper = mount(VHotKey, {
      props: { hotkey: null as any }
    })

    expect(wrapper.text()).toBe('')
  })

  test('handles undefined actionId gracefully', () => {
    const wrapper = mount(VHotKey, {
      props: { actionId: undefined as any }
    })

    expect(wrapper.text()).toBe('')
  })

  test('handles empty string hotkey', () => {
    const wrapper = mount(VHotKey, {
      props: { hotkey: '' }
    })

    expect(wrapper.text()).toBe('')
  })

  test('handles malformed hotkey strings', () => {
    vi.mocked(KeyBindingUtils.formatForDisplay).mockImplementation(() => {
      throw new Error('Malformed hotkey')
    })

    const consoleSpy = vi.spyOn(console, 'warn')
    const wrapper = mount(VHotKey, {
      props: { hotkey: '+++invalid+++' }
    })

    expect(consoleSpy).toHaveBeenCalled()
    expect(wrapper.text()).toBe('')
  })
})
```

### 6. Vuetify Integration

#### 6.1 Basic Vuetify Integration
```typescript
describe('VHotKey - Vuetify Integration', () => {
  beforeEach(() => {
    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [{ keys: [{ display: 'Ctrl+S', type: 'key' }] }],
      combinationSeparator: '',
      sequenceSeparator: ''
    })
  })

  test('integrates with Vuetify theme system', () => {
    const vuetify = createVuetify({
      theme: {
        defaultTheme: 'dark'
      }
    })

    const wrapper = mount(VHotKey, {
      props: { hotkey: 'Ctrl+S' },
      global: {
        plugins: [vuetify]
      }
    })

    expect(wrapper.classes()).toContain('v-theme--dark')
  })

  test('respects Vuetify density configuration', () => {
    const wrapper = mount(VHotKey, {
      props: {
        hotkey: 'Ctrl+S',
        density: 'compact'
      }
    })

    expect(wrapper.classes()).toContain('v-hotkey--density-compact')
  })
})
```

## Integration Tests

### 1. KeyBindingUtils Integration

```typescript
describe('VHotKey - KeyBindingUtils Integration', () => {
  test('delegates platform detection to KeyBindingUtils', () => {
    // Test that VHotKey doesn't do its own platform detection
    // Platform-specific formatting is handled by KeyBindingUtils.formatForDisplay
    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [{ keys: [{ display: '⌘', type: 'modifier' }, { display: 'S', type: 'key' }] }],
      combinationSeparator: '',
      sequenceSeparator: ''
    })

    mount(VHotKey, {
      props: { hotkey: 'Meta+S' }
    })

    // Verify VHotKey calls formatForDisplay and doesn't do platform detection itself
    expect(KeyBindingUtils.formatForDisplay).toHaveBeenCalledWith(
      'Meta+S',
      'symbol',
      expect.any(Object)
    )
  })

  test('handles different display formats from KeyBindingUtils', () => {
    // Test symbol format
    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [{ keys: [{ display: '⌘', type: 'modifier' }] }],
      combinationSeparator: '',
      sequenceSeparator: ''
    })

    const symbolWrapper = mount(VHotKey, {
      props: { hotkey: 'Meta', displayMode: 'symbol' }
    })

    expect(symbolWrapper.text()).toContain('⌘')

    // Test text format
    vi.mocked(KeyBindingUtils.formatForDisplay).mockReturnValue({
      sequences: [{ keys: [{ display: 'Cmd', type: 'modifier' }] }],
      combinationSeparator: '',
      sequenceSeparator: ''
    })

    const textWrapper = mount(VHotKey, {
      props: { hotkey: 'Meta', displayMode: 'text' }
    })

    expect(textWrapper.text()).toContain('Cmd')
  })
})
```

### 2. Full ActionCore Integration

```typescript
describe('VHotKey - Full ActionCore Integration', () => {
  test('works within complete ActionCore ecosystem', async () => {
    const mockActionCore = {
      getEffectiveHotkey: vi.fn().mockReturnValue('Ctrl+S')
    }

    const app = createApp({
      template: '<VHotKey actionId="editor.save" />',
      components: { VHotKey }
    })

    const wrapper = mount(app, {
      global: {
        provide: {
          [ActionCoreKey]: mockActionCore
        }
      }
    })

    expect(mockActionCore.getEffectiveHotkey).toHaveBeenCalledWith('editor.save')
  })
})
```

## End-to-End Tests (Optional)

### 1. Cross-Platform Rendering

```typescript
// e2e/hotkey-display.spec.ts
import { test, expect } from '@playwright/test'

test.describe('VHotKey Cross-Platform Display', () => {
  test('displays platform-appropriate keys on macOS', async ({ page, browserName }) => {
    test.skip(browserName !== 'webkit', 'macOS specific test')

    await page.goto('/hotkey-test')

    // Test Meta key displays as Cmd symbol
    const metaHotkey = page.locator('[data-testid="meta-hotkey"]')
    await expect(metaHotkey).toContainText('⌘')
  })

  test('displays platform-appropriate keys on Windows', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'Windows specific test')

    await page.goto('/hotkey-test')

    // Test Meta key displays as text
    const metaHotkey = page.locator('[data-testid="meta-hotkey"]')
    await expect(metaHotkey).toContainText('Meta')
  })
})
```

### 2. Visual Regression Testing

```typescript
test.describe('VHotKey Visual Regression', () => {
  test('all variants render correctly', async ({ page }) => {
    await page.goto('/hotkey-variants')

    const variants = ['elevated', 'flat', 'tonal', 'outlined', 'text', 'plain']

    for (const variant of variants) {
      const element = page.locator(`[data-testid="hotkey-${variant}"]`)
      await expect(element).toHaveScreenshot(`hotkey-${variant}.png`)
    }
  })

  test('size variants render correctly', async ({ page }) => {
    await page.goto('/hotkey-sizes')

    const sizes = ['x-small', 'small', 'default', 'large', 'x-large']

    for (const size of sizes) {
      const element = page.locator(`[data-testid="hotkey-${size}"]`)
      await expect(element).toHaveScreenshot(`hotkey-${size}.png`)
    }
  })
})
```

## Test Data and Fixtures

### Mock Data Setup

```typescript
// test-fixtures.ts

export const mockHotkeys = {
  simple: 'Ctrl+S',
  withShift: 'Ctrl+Shift+S',
  withMeta: 'Meta+S',
  sequence: 'Ctrl+K Ctrl+S',
  functionKey: 'F12',
  arrows: 'Ctrl+ArrowDown',
  invalid: '+++invalid+++',
  empty: ''
}

export const mockActions = [
  {
    id: 'editor.save',
    title: 'Save',
    hotkey: 'Ctrl+S'
  },
  {
    id: 'editor.save-all',
    title: 'Save All',
    hotkey: 'Ctrl+Shift+S'
  }
]

export function createMockActionCore(overrides = {}) {
  return {
    getEffectiveHotkey: vi.fn().mockImplementation((actionId: string) => {
      const action = mockActions.find(a => a.id === actionId)
      return action?.hotkey || null
    }),
    ...overrides
  }
}
```

## Coverage Requirements

### Unit Test Coverage Goals
- **Line Coverage**: > 90%
- **Branch Coverage**: > 85%
- **Function Coverage**: 100%
- **Statement Coverage**: > 90%

### Critical Paths (Must be 100% covered)
- KeyBindingUtils.formatForDisplay integration
- ActionCore integration and warning system
- Error handling and edge cases
- Props validation and fallback logic
- Separator handling and rendering

## Test Execution Strategy

### Development Workflow
```bash
# Run unit tests in watch mode during development
npm run test:unit -- --watch

# Run specific test file
npm run test:unit -- VHotKey.test.ts

# Run with coverage
npm run test:unit -- --coverage
```

This test plan aligns with the simplified VHotKey design that focuses on core display functionality. It emphasizes integration with the shared KeyBindingUtils for consistency while maintaining comprehensive coverage of the essential features without over-engineering.
