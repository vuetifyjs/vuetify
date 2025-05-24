# useKeyBindings Test Plan

## This document outlines the comprehensive testing strategy for the `useKeyBindings` composable.

### Testing Pyramid Overview

```
           E2E Tests (Real User Scenarios)
          /                               \
     Integration Tests (Component Interaction)
    /                                       \
Unit Tests (Individual Classes & Functions)
```

**Test Distribution:**
- **Unit Tests**: ~70% (Fast, focused, reliable)
- **Integration Tests**: ~20% (Component interaction, pipeline testing)
- **E2E Tests**: ~10% (Real-world scenarios, cross-browser)

---

## Unit Tests

### 1. HotkeyParser Tests

#### 1.1 String Parsing Tests
```typescript
describe('HotkeyParser.parse', () => {
  describe('Combination Parsing', () => {
    test('parses simple key combinations', () => {
      // "Ctrl+s", "Meta+Shift+d", "Alt+F4"
    })

    test('handles different separators', () => {
      // "Ctrl+s", "Ctrl_s", mixed separators
    })

    test('normalizes modifier order', () => {
      // "s+Ctrl" -> "Ctrl+s", "Shift+Meta+a" -> "Meta+Shift+a"
    })

    test('handles modifier-only combinations', () => {
      // "Ctrl+Alt", "Meta+Shift"
    })
  })

  describe('Sequence Parsing', () => {
    test('parses key sequences', () => {
      // "g-g", "Ctrl+k-Ctrl+c", "g-g-h"
    })

    test('handles mixed combination-sequence', () => {
      // "Ctrl+k-s", "g-Shift+h"
    })

    test('validates sequence length limits', () => {
      // Max 5 steps, error on longer sequences
    })
  })

  describe('Key Normalization', () => {
    test('normalizes key aliases', () => {
      // "cmd" -> "Meta", "option" -> "Alt", "esc" -> "Escape"
    })

    test('handles case insensitivity', () => {
      // "CTRL+S" -> "Control+s", "meta+A" -> "Meta+a"
    })

    test('normalizes special keys', () => {
      // "enter" -> "Enter", "space" -> " ", "return" -> "Enter"
    })
  })

  describe('Error Handling', () => {
    test('handles invalid patterns gracefully', () => {
      // Empty strings, invalid separators, malformed patterns
    })

    test('provides detailed error messages', () => {
      // Clear description of what went wrong and where
    })
  })
})
```

#### 1.2 Validation Tests
```typescript
describe('HotkeyParser.validate', () => {
  describe('Key Validation', () => {
    test('accepts valid keys', () => {
      // Letters, numbers, function keys, arrow keys, etc.
    })

    test('rejects invalid keys', () => {
      // Non-existent keys, typos, invalid symbols
    })

    test('validates with custom key mappings', () => {
      // QWERTZ layout mappings, custom symbol mappings
    })
  })

  describe('Platform Restrictions', () => {
    test('warns about problematic Windows combinations', () => {
      // Meta+Alt combinations that don't work well
    })

    test('warns about problematic Linux combinations', () => {
      // Ctrl+Meta combinations that conflict
    })

    test('allows platform-agnostic combinations', () => {
      // Standard Ctrl+letter combinations
    })
  })

  describe('Modifier Validation', () => {
    test('prevents duplicate modifiers', () => {
      // "Ctrl+Ctrl+s" should be invalid
    })

    test('requires at least one key', () => {
      // Empty steps, modifier-only sequences validation
    })
  })

  describe('Sequence Validation', () => {
    test('enforces sequence length limits', () => {
      // Max 5 steps, clear error for longer sequences
    })

    test('validates each step in sequence', () => {
      // Each step must be valid individually
    })
  })
})
```

#### 1.3 Normalization Tests
```typescript
describe('HotkeyParser.normalize', () => {
  test('produces canonical form', () => {
    // "s+ctrl" -> "Control+s", "CMD+shift+A" -> "Meta+Shift+a"
  })

  test('is idempotent', () => {
    // normalize(normalize(pattern)) === normalize(pattern)
  })

  test('handles invalid patterns gracefully', () => {
    // Returns original pattern if parsing fails
  })

  test('consistent ordering', () => {
    // Modifiers always in consistent order: Control, Meta, Shift, Alt
  })
})
```

### 2. PlatformHandler Tests

#### 2.1 Event Normalization Tests
```typescript
describe('PlatformHandler.normalizeEvent', () => {
  describe('Cross-Platform Consistency', () => {
    test('normalizes events consistently across platforms', () => {
      // Same logical key produces same normalized event
    })

    test('handles platform-specific key differences', () => {
      // Meta vs Windows vs Super key handling
    })

    test('applies custom key mappings', () => {
      // QWERTZ mappings, symbol mappings
    })

    test('prioritizes event.code when useEventCode is true', () => {
      // Matching logic uses event.code for primary key
    })
  })

  describe('Modifier Handling', () => {
    test('correctly detects modifier states', () => {
      // ctrlKey, metaKey, shiftKey, altKey
    })

    test('handles left/right modifier distinction (via event.code)', () => {
      // "ControlLeft", "ShiftRight" parsed from event.code
    })
  })

  describe('Platform Quirks Handling', () => {
    test('transforms macOS Dead key events if applicable', () => {
      // Check if specific transformations occur for NormalizedKeyEvent
    })

    test('transforms Windows AltGraph events if applicable', () => {
      // Check if specific transformations occur for NormalizedKeyEvent
    })
  })

  describe('Platform Detection', () => {
    test('detects platform correctly', () => {
      // macOS, Windows, Linux detection via user agent
    })

    test('handles unknown platforms gracefully', () => {
      // Fallback to generic handling
    })
  })
})
```

#### 2.2 Key Mapping Tests
```typescript
describe('PlatformHandler.mapKeyNames', () => {
  test('applies custom mappings first', () => {
    // User-provided mappings take precedence
  })

  test('uses platform-specific mappings', () => {
    // Meta -> Command on Mac, Windows on Windows, Super on Linux
  })

  test('handles Meta to Ctrl mapping option', () => {
    // Optional behavior for user expectations
  })

  test('preserves unmapped keys', () => {
    // Keys without mappings pass through unchanged
  })
})
```

#### 2.3 Display Formatting Tests
```typescript
describe('DisplayFormatter.format', () => {
  describe('Platform-Specific Symbols', () => {
    test('uses Mac symbols correctly', () => {
      // ⌘ for Meta, ⌥ for Alt, ⇧ for Shift, ⌃ for Control
    })

    test('uses Windows symbols correctly', () => {
      // Win, Alt, Shift, Ctrl
    })

    test('uses Linux symbols correctly', () => {
      // Super, Alt, Shift, Ctrl
    })
  })

  describe('Key Formatting', () => {
    test('capitalizes single letter keys', () => {
      // "s" -> "S", "a" -> "A"
    })

    test('preserves special key names', () => {
      // "Enter", "Escape", "F1"
    })

    test('orders modifiers consistently', () => {
      // Control before Meta before Shift before Alt
    })
  })

  describe('Sequence Formatting', () => {
    test('separates sequence steps clearly', () => {
      // "⌘K S" for "Meta+k-s"
    })

    test('handles complex sequences', () => {
      // Multiple steps with different modifier combinations
    })
  })
})
```

### 3. SequenceManager Tests

#### 3.1 State Management Tests
```typescript
describe('SequenceManager', () => {
  describe('Single Key Matching', () => {
    test('matches exact single key bindings', () => {
      // Direct matches return immediately
    })

    test('starts sequences for potential matches', () => {
      // "g" starts tracking for "g-g" binding
    })
  })

  describe('Sequence Progression', () => {
    test('continues valid sequences', () => {
      // "g" -> "g" completes "g-g"
    })

    test('breaks invalid sequences', () => {
      // "g" -> "h" breaks "g-g" sequence
    })

    test('handles multiple possible matches', () => {
      // "g" could match "g-g" or "g-h"
    })
  })

  describe('Timeout Handling', () => {
    test('clears sequence state on timeout', () => {
      // Sequence expires after configured timeout
    })

    test('allows configurable timeout duration', () => {
      // Constructor parameter and updateTimeout method
    })

    test('resets timeout on valid progression', () => {
      // Each valid step resets the timer
    })
  })

  describe('State Cleanup', () => {
    test('clears state after exact match', () => {
      // No lingering state after successful completion
    })

    test('clears state after sequence break', () => {
      // Clean slate after invalid key
    })

    test('clears timeout handlers properly', () => {
      // No memory leaks from setTimeout
    })
  })
})
```

### 4. CollisionDetector Tests

#### 4.1 Collision Detection Tests
```typescript
describe('CollisionDetector', () => {
  describe('Exact Collisions', () => {
    test('detects identical pattern collisions', () => {
      // Multiple bindings for "Ctrl+s"
    })

    test('calculates collision severity', () => {
      // Based on binding priority, options
    })

    test('groups colliding bindings', () => {
      // All bindings with same pattern grouped together
    })
  })

  describe('Sequence Conflicts', () => {
    test('detects prefix conflicts', () => {
      // "g-g" conflicts with "g-g-h"
    })

    test('identifies ambiguous sequences', () => {
      // Sequences that could match multiple patterns
    })

    test('provides conflict descriptions', () => {
      // Clear explanation of what conflicts and why
    })
  })

  describe('Collision Resolution', () => {
    test('suggests resolution strategies', () => {
      // Priority adjustment, pattern modification
    })

    test('handles complex collision scenarios', () => {
      // Multiple overlapping conflicts
    })
  })
})
```

### 5. InputContextManager Tests

#### 5.1 Context Detection Tests
```typescript
describe('InputContextManager', () => {
  describe('Built-in Input Detection', () => {
    test('detects text inputs', () => {
      // input[type="text"], textarea
    })

    test('detects contenteditable elements', () => {
      // [contenteditable="true"], [contenteditable=""]
    })

    test('excludes non-text inputs', () => {
      // input[type="checkbox"], input[type="radio"]
    })
  })

  describe('Custom Context Registration', () => {
    test('allows custom input contexts', () => {
      // Custom selectors for app-specific inputs
    })

    test('allows custom non-input contexts', () => {
      // Override built-in detection for specific elements
    })

    test('prioritizes custom over built-in', () => {
      // Custom rules take precedence
    })
  })

  describe('Binding Allowance Logic', () => {
    test('respects runInTextInput boolean', () => {
      // true/false settings work correctly
    })

    test('executes runInTextInput functions', () => {
      // Function-based context checking
    })

    test('defaults to false for text inputs', () => {
      // Safe default behavior
    })
  })
})
```

### 6. Error Handling Tests

#### 6.1 Handler Execution Tests
```typescript
describe('ErrorHandler', () => {
  describe('Handler Error Recovery', () => {
    test('continues after handler errors', () => {
      // One failing handler doesn't break others
    })

    test('logs handler errors appropriately', () => {
      // Warnings in production, details in debug
    })

    test('handles async handler errors', () => {
      // Promise rejections don't crash system
    })
  })

  describe('Debug Logging', () => {
    test('provides detailed error context', () => {
      // Pattern, description, error details
    })

    test('logs successful executions in debug mode', () => {
      // Positive feedback for debugging
    })

    test('respects debug flag', () => {
      // Only logs when debug is enabled
    })
  })
})
```

### 7. Performance Optimization Tests

#### 7.1 Caching Tests
```typescript
describe('PerformanceOptimizations', () => {
  describe('Event Processing Optimization', () => {
    test('debounces rapid identical events', () => {
      // Skip processing of rapid repeats
    })

    test('maintains accuracy despite optimization', () => {
      // Important events still processed
    })

    test('tracks performance metrics', () => {
      // Cache hit rates, processing times
    })
  })

  describe('Pattern Caching', () => {
    test('caches parsed patterns', () => {
      // Avoid re-parsing same patterns
    })

    test('invalidates cache appropriately', () => {
      // Cache updates when patterns change
    })

    test('limits cache size', () => {
      // Prevent memory leaks from unlimited caching
    })
  })

  describe('Match Precomputation', () => {
    test('precomputes possible matches', () => {
      // Build lookup tables for faster matching
    })

    test('updates precomputed data on binding changes', () => {
      // Reactive to binding list changes
    })
  })
})
```

### 8. KeyBindingUtils Tests

#### 8.1 Utility Function Tests
```typescript
describe('KeyBindingUtils', () => {
  describe('Validation Utilities', () => {
    test('validate function works correctly', () => {
      // Wrapper around HotkeyParser.validate
    })

    test('parse function works correctly', () => {
      // Wrapper around HotkeyParser.parse
    })

    test('normalize function works correctly', () => {
      // Wrapper around HotkeyParser.normalize
    })
  })

  describe('Display Utilities', () => {
    test('formatForDisplay handles errors gracefully', () => {
      // Returns original pattern on parse failure
    })

    test('platformSpecificDisplay uses correct platform', () => {
      // Auto-detects or uses provided platform
    })
  })

  describe('Debug Utilities', () => {
    test('getDebugInfo provides comprehensive data', () => {
      // All relevant debugging information
    })

    test('handles null/undefined inputs gracefully', () => {
      // Robust error handling
    })
  })
})
```

---

## Integration Tests

### 1. Event Processing Pipeline Tests

#### 1.1 Full Pipeline Tests
```typescript
describe('Event Processing Pipeline Integration', () => {
  describe('End-to-End Event Flow', () => {
    test('processes simple key combinations correctly', () => {
      // Keyboard event -> normalization -> matching -> execution
    })

    test('handles complex sequences correctly', () => {
      // Multi-step sequences with timing
    })

    test('respects input context rules', () => {
      // Binding execution based on focused element
    })

    test('handles errors gracefully throughout pipeline', () => {
      // Error in any stage doesn't crash system
    })
  })

  describe('Performance Under Load', () => {
    test('handles rapid key events efficiently', () => {
      // High-frequency key events don't degrade performance
    })

    test('scales with large binding sets', () => {
      // Performance remains acceptable with 100+ bindings
    })

    test('memory usage remains stable', () => {
      // No memory leaks during extended use
    })
  })
})
```

### 2. Reactive System Integration Tests

#### 2.1 Vue Reactivity Tests
```typescript
describe('Vue Reactivity Integration', () => {
  describe('Reactive Binding Updates', () => {
    test('responds to binding config changes', () => {
      // Computed binding configs update correctly
    })

    test('handles binding additions/removals', () => {
      // Dynamic binding list changes
    })

    test('updates collision detection on changes', () => {
      // Collision reports update with binding changes
    })
  })

  describe('Ref/Reactive Target Elements', () => {
    test('updates event listeners on target changes', () => {
      // Reactive target elements work correctly
    })

    test('cleans up old listeners properly', () => {
      // No orphaned event listeners
    })
  })
})
```

### 3. ActionCore Integration Tests

#### 3.1 ActionCore Binding Tests
```typescript
describe('ActionCore Integration', () => {
  describe('Action-Based Bindings', () => {
    test('creates bindings from action definitions', () => {
      // ActionCore actions -> key bindings
    })

    test('updates bindings when actions change', () => {
      // Reactive to action registry changes
    })

    test('handles action context correctly', () => {
      // Context passed to action handlers
    })
  })

  describe('Collision Reporting', () => {
    test('detects action hotkey collisions', () => {
      // Multiple actions with same hotkey
    })

    test('provides actionCore-specific collision info', () => {
      // Action IDs, titles in collision reports
    })
  })
})
```

### 4. Component Integration Tests

#### 4.1 VCommandPalette Integration Tests
```typescript
describe('VCommandPalette Integration', () => {
  describe('Navigation Bindings', () => {
    test('handles arrow key navigation', () => {
      // Up/down arrow key handling
    })

    test('handles selection keys', () => {
      // Enter, Space for selection
    })

    test('handles escape/close keys', () => {
      // Escape to close palette
    })
  })

  describe('Search Bindings', () => {
    test('allows typing in search input', () => {
      // Text input context works correctly
    })

    test('handles search shortcuts', () => {
      // Clear search, select all, etc.
    })
  })
})
```

#### 4.2 VHotKey Integration Tests
```typescript
describe('VHotKey Integration', () => {
  describe('Validation Integration', () => {
    test('validates hotkey patterns correctly', () => {
      // Uses KeyBindingUtils for validation
    })

    test('provides proper error messages', () => {
      // User-friendly validation feedback
    })
  })

  describe('Display Integration', () => {
    test('formats hotkeys for display correctly', () => {
      // Platform-specific display formatting
    })

    test('handles display mode switching', () => {
      // Symbol vs text mode
    })
  })
})
```

---

## End-to-End Tests

### 1. Real User Scenario Tests

#### 1.1 Application-Level Tests
```typescript
describe('Real User Scenarios', () => {
  describe('Document Editor Workflow', () => {
    test('save document with Ctrl+S', () => {
      // User presses Ctrl+S, document saves
    })

    test('copy/paste with standard shortcuts', () => {
      // Ctrl+C, Ctrl+V work correctly
    })

    test('undo/redo with Ctrl+Z/Ctrl+Y', () => {
      // Undo/redo functionality
    })
  })

  describe('Development IDE Workflow', () => {
    test('command palette with Ctrl+Shift+P', () => {
      // Opens command palette
    })

    test('quick open with Ctrl+P', () => {
      // Opens file picker
    })

    test('vim-style sequences', () => {
      // "g-g" to go to line, etc.
    })
  })

  describe('Complex Sequence Workflows', () => {
    test('multi-step git commands', () => {
      // "g-s" for git status, "g-c" for git commit
    })

    test('layer switching sequences', () => {
      // Mode switching with key sequences
    })
  })
})
```

### 2. Cross-Platform Tests

#### 2.1 Platform-Specific Tests
```typescript
describe('Cross-Platform Compatibility', () => {
  describe('macOS Specific', () => {
    test('Meta key works as Command', () => {
      // Meta+C for copy on Mac
    })

    test('Option key works as Alt', () => {
      // Option+letter combinations
    })

    test('displays Mac symbols correctly', () => {
      // ⌘, ⌥, ⇧, ⌃ symbols in UI
    })
  })

  describe('Windows Specific', () => {
    test('Ctrl key combinations work', () => {
      // Standard Windows shortcuts
    })

    test('Windows key combinations work', () => {
      // Meta as Windows key
    })

    test('AltGr handling works', () => {
      // International keyboard support
    })
  })

  describe('Linux Specific', () => {
    test('Super key works as Meta', () => {
      // Meta key on Linux
    })

    test('standard shortcuts work', () => {
      // Ctrl-based shortcuts
    })
  })
})
```

### 3. Browser Compatibility Tests

#### 3.1 Cross-Browser Tests
```typescript
describe('Browser Compatibility', () => {
  describe('Chrome/Chromium', () => {
    test('all key events work correctly', () => {
      // KeyboardEvent handling
    })

    test('performance is acceptable', () => {
      // No significant performance issues
    })
  })

  describe('Firefox', () => {
    test('key event differences handled', () => {
      // Firefox-specific KeyboardEvent quirks
    })

    test('modifier key handling works', () => {
      // Meta key behavior differences
    })
  })

  describe('Safari', () => {
    test('webkit-specific behavior handled', () => {
      // Safari KeyboardEvent differences
    })

    test('touch keyboard support', () => {
      // iPad keyboard handling
    })
  })
})
```

### 4. Accessibility Tests

#### 4.1 Screen Reader Compatibility Tests
```typescript
describe('Accessibility Compatibility', () => {
  describe('Screen Reader Integration', () => {
    test('screen reader shortcuts don\'t conflict', () => {
      // NVDA, JAWS, VoiceOver shortcuts preserved
    })

    test('custom shortcuts announced properly', () => {
      // Hotkey announcements in screen readers
    })
  })

  describe('Keyboard-Only Navigation', () => {
    test('all functionality accessible via keyboard', () => {
      // No mouse-only functionality
    })

    test('focus management works correctly', () => {
      // Focus trapped/restored appropriately
    })
  })
})
```

### 5. Performance Tests

#### 5.1 Load Testing
```typescript
describe('Performance Under Load', () => {
  describe('High-Frequency Input', () => {
    test('handles rapid key events without lag', () => {
      // Fast typing doesn't cause delays
    })

    test('memory usage remains stable', () => {
      // No memory leaks during extended use
    })
  })

  describe('Large Binding Sets', () => {
    test('performance scales with binding count', () => {
      // 100, 500, 1000+ bindings
    })

    test('collision detection remains fast', () => {
      // Collision detection doesn't slow down significantly
    })
  })
})
```

---

## Test Environment Setup

### 1. Unit Test Environment
```typescript
// Jest configuration for unit tests
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,vue}',
    '!src/**/*.d.ts',
    '!src/test/**/*'
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90
    }
  }
}
```

### 2. Integration Test Environment
```typescript
// Vitest configuration for integration tests
export default defineConfig({
  test: {
    environment: 'happy-dom',
    setupFiles: ['./test/integration-setup.ts'],
    include: ['**/*.integration.test.{js,ts}'],
    timeout: 10000
  }
})
```

### 3. E2E Test Environment
```typescript
// Playwright configuration for e2e tests
module.exports = {
  testDir: './e2e',
  timeout: 30000,
  expect: { timeout: 5000 },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] }},
    { name: 'firefox', use: { ...devices['Desktop Firefox'] }},
    { name: 'webkit', use: { ...devices['Desktop Safari'] }},
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] }},
    { name: 'mobile-safari', use: { ...devices['iPhone 12'] }}
  ]
}
```

### 4. Test Data and Fixtures
```typescript
// Shared test fixtures and utilities
export const testBindings = {
  simple: {
    'Ctrl+s': { handler: jest.fn(), options: { preventDefault: true }},
    'Escape': { handler: jest.fn(), options: {}}
  },

  sequences: {
    'g-g': { handler: jest.fn(), options: { description: 'Go to line' }},
    'g-h': { handler: jest.fn(), options: { description: 'Go home' }},
    'Ctrl+k-Ctrl+c': { handler: jest.fn(), options: { description: 'Comment' }}
  },

  colliding: {
    'Ctrl+s': { handler: jest.fn(), options: { description: 'Save' }},
    'Ctrl+s': { handler: jest.fn(), options: { description: 'Submit' }}
  }
}

export const mockKeyboardEvent = (overrides = {}) => ({
  key: 's',
  code: 'KeyS',
  ctrlKey: true,
  metaKey: false,
  shiftKey: false,
  altKey: false,
  preventDefault: jest.fn(),
  stopPropagation: jest.fn(),
  timeStamp: Date.now(),
  ...overrides
})
```

---

## Test Execution Strategy

### 1. Continuous Integration Pipeline
```yaml
# GitHub Actions workflow
test-pipeline:
  strategy:
    matrix:
      os: [ubuntu-latest, windows-latest, macos-latest]
      node: [18, 20]

  steps:
    - name: Unit Tests
      run: npm run test:unit

    - name: Integration Tests
      run: npm run test:integration

    - name: E2E Tests
      run: npm run test:e2e

    - name: Coverage Report
      run: npm run coverage:report
```

### 2. Pre-commit Testing
```bash
# Husky pre-commit hook
npm run test:unit:changed
npm run lint:fix
npm run type-check
```

### 3. Performance Benchmarking
```typescript
// Continuous performance monitoring
describe('Performance Benchmarks', () => {
  test('event processing performance', () => {
    const iterations = 10000
    const start = performance.now()

    for (let i = 0; i < iterations; i++) {
      // Process keyboard event
    }

    const end = performance.now()
    const avgTime = (end - start) / iterations

    expect(avgTime).toBeLessThan(0.1) // Max 0.1ms per event
  })
})
```

### 4. Browser Testing Matrix
```typescript
// Cross-browser test matrix
const browsers = [
  'Chrome (latest)',
  'Chrome (previous)',
  'Firefox (latest)',
  'Firefox (ESR)',
  'Safari (latest)',
  'Safari (previous)',
  'Edge (latest)'
]

const platforms = [
  'Windows 10',
  'Windows 11',
  'macOS Big Sur',
  'macOS Monterey',
  'Ubuntu 20.04',
  'Ubuntu 22.04'
]
```

---

## Coverage Requirements

### 1. Code Coverage Targets
- **Unit Tests**: 95% line coverage, 90% branch coverage
- **Integration Tests**: 85% interaction coverage
- **E2E Tests**: 100% critical path coverage

### 2. Quality Gates
- All tests must pass before merge
- Coverage thresholds must be met
- Performance benchmarks must pass
- No accessibility violations
- Cross-browser compatibility verified

### 3. Regression Testing
- Full test suite on releases
- Smoke tests on hotfixes
- Performance regression detection
- Backward compatibility validation

This comprehensive test plan ensures the `useKeyBindings` composable is thoroughly validated across all use cases, platforms, and integration scenarios. The testing strategy provides confidence in reliability while maintaining development velocity through appropriate test distribution and automation.
