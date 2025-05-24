# useKeyBindings Design Document

## This document captures the implementation design for useKeyBindings composable.

### Architecture Overview

`useKeyBindings` is the foundational composable that provides keyboard event handling for the entire ActionCore system. It handles:

1. **Event Processing**: Capturing and normalizing keyboard events
2. **String Parsing**: Converting hotkey strings to executable bindings
3. **Collision Detection**: Identifying conflicting key bindings
4. **Sequence Management**: Handling multi-key sequences with timing
5. **Context Awareness**: Managing input element focus states
6. **Platform Compatibility**: Cross-platform key handling

The composable operates independently of ActionCore but provides integration points for higher-level coordination.

### Key String Format Specification

#### Standard Format
```
// Combinations (simultaneous keys)
"Ctrl+s"           // Control + S
"Meta+Shift+d"     // Meta + Shift + D
"Ctrl_Alt_Delete"  // Control + Alt + Delete (underscore separator)

// Sequences (keys in order)
"g-g"              // G then G (vim-style)
"Ctrl+k-Ctrl+c"   // Ctrl+K then Ctrl+C (vscode-style)
"g-g-h"            // G then G then H

// Mixed (combination within sequence)
"Ctrl+k-s"         // Ctrl+K then S
"g-Shift+h"        // G then Shift+H
```

#### Key Naming Convention
```typescript
// Modifier keys (case-insensitive)
const MODIFIERS = {
  'ctrl': 'Control',
  'control': 'Control',
  'meta': 'Meta',
  'cmd': 'Meta',        // Alias
  'command': 'Meta',    // Alias
  'shift': 'Shift',
  'alt': 'Alt',
  'option': 'Alt',      // macOS alias
  // Left/Right specific (when needed)
  'leftctrl': 'ControlLeft',
  'rightctrl': 'ControlRight',
  'leftshift': 'ShiftLeft',
  'rightshift': 'ShiftRight',
  'leftalt': 'AltLeft',
  'rightalt': 'AltRight',
}

// Special keys
const SPECIAL_KEYS = {
  'esc': 'Escape',
  'escape': 'Escape',
  'enter': 'Enter',
  'return': 'Enter',    // Alias
  'space': ' ',
  'tab': 'Tab',
  'backspace': 'Backspace',
  'delete': 'Delete',
  'arrowup': 'ArrowUp',
  'arrowdown': 'ArrowDown',
  'arrowleft': 'ArrowLeft',
  'arrowright': 'ArrowRight',
  'home': 'Home',
  'end': 'End',
  'pageup': 'PageUp',
  'pagedown': 'PageDown',
  // Function keys
  'f1': 'F1', 'f2': 'F2', /* ... */ 'f12': 'F12',
}

// Valid keys composed from all sources
const VALID_KEYS = new Set([
  ...Object.values(MODIFIERS),
  ...Object.values(SPECIAL_KEYS),
  // Alphanumeric keys (a-z, 0-9)
  ...'abcdefghijklmnopqrstuvwxyz0123456789'.split(''),
  // Common symbols
  ...'`~!@#$%^&*()_+-=[]{}\\|;:\'",.<>/?'.split(''),
])
```

### Event Handling Architecture

#### Event Processing Pipeline
```typescript
interface EventProcessor {
  captureEvent(event: KeyboardEvent): void
  normalizeEvent(event: KeyboardEvent): NormalizedKeyEvent
  matchBindings(normalized: NormalizedKeyEvent): MatchResult[]
  executeHandlers(matches: MatchResult[], originalEvent: KeyboardEvent): void
}

interface NormalizedKeyEvent {
  key: string
  code: string
  modifiers: {
    ctrl: boolean
    meta: boolean
    shift: boolean
    alt: boolean
  }
  timestamp: number
  platform: 'mac' | 'windows' | 'linux' | 'unknown'
}

type KeyBindingHandler = (event: KeyboardEvent, context?: any) => void | Promise<void>

interface UseKeyBindingsOptions {
  target?: Ref<Element | Document | Window | undefined> | Element | Document | Window
  eventType?: 'keydown' | 'keyup' | 'keypress'
  useEventCode?: boolean  // Use event.code instead of event.key for matching
  sequenceTimeout?: number  // Timeout for key sequences in ms
  detectCollisions?: boolean
  listenerOptions?: { capture?: boolean; passive?: boolean }
  // Global defaults for all bindings
  globalDefaults?: {
    preventDefault?: boolean
    stopPropagation?: boolean
    runInTextInput?: boolean
  }
  // Platform-specific key mappings for keyboard layouts
  keyMappings?: Record<string, string>
  // Development debugging
  debug?: boolean
}
```

#### Binding Registration
```typescript
interface KeyBinding {
  pattern: string                    // "Ctrl+s" or "g-g"
  handler: KeyBindingHandler
  options: KeyBindingOptions
  parsedPattern: ParsedPattern       // Cached parsed representation
}

interface KeyBindingOptions {
  preventDefault?: boolean
  stopPropagation?: boolean
  runInTextInput?: boolean | ((element: HTMLElement) => boolean)
  description?: string
  priority?: number
  enabled?: boolean  // For reactive enable/disable
}

interface ParsedPattern {
  type: 'combination' | 'sequence'
  steps: KeyStep[]
}

interface KeyStep {
  key: string
  modifiers: Set<string>
  isModifierOnly: boolean
}
```

### String Parsing and Validation

#### Parser Architecture
```typescript
class HotkeyParser {
  static parse(pattern: string): ParsedPattern | ValidationError {
    const steps = this.splitSequence(pattern)
    return {
      type: steps.length > 1 ? 'sequence' : 'combination',
      steps: steps.map(step => this.parseStep(step))
    }
  }

  private static splitSequence(pattern: string): string[] {
    return pattern.split('-').map(s => s.trim())
  }

  private static parseStep(step: string): KeyStep {
    const parts = step.split(/[+_]/).map(p => p.trim().toLowerCase())
    const modifiers = new Set(parts.slice(0, -1).map(m => this.normalizeModifier(m)))
    const key = this.normalizeKey(parts[parts.length - 1])

    return { key, modifiers, isModifierOnly: !key }
  }

  static validate(pattern: string, options?: { platform?: string, keyMappings?: Record<string, string> }): ValidationResult {
    try {
      const parsed = this.parse(pattern)
      return this.validateParsed(parsed, options)
    } catch (error) {
      return { valid: false, error: error.message }
    }
  }

  static normalize(pattern: string): string {
    // Convert to canonical form: normalize modifiers order, case, aliases
    try {
      const parsed = this.parse(pattern)
      return this.stringifyParsed(parsed)
    } catch {
      return pattern // Return original if parsing fails
    }
  }

  private static stringifyParsed(parsed: ParsedPattern): string {
    return parsed.steps.map(step => {
      const modifiers = Array.from(step.modifiers).sort().join('+')
      return modifiers ? `${modifiers}+${step.key}` : step.key
    }).join('-')
  }
}
```

#### Validation Rules
```typescript
interface ValidationResult {
  valid: boolean
  error?: string
  warnings?: string[]
}

const VALIDATION_RULES = {
  // Must have at least one key
  requireKey: (step: KeyStep) => step.key || step.isModifierOnly,

  // No duplicate modifiers
  noDuplicateModifiers: (step: KeyStep) => new Set(step.modifiers).size === step.modifiers.size,

  // Valid key names (with custom mappings)
  validKeyNames: (step: KeyStep, keyMappings?: Record<string, string>) => {
    const mappedKey = keyMappings?.[step.key] || step.key
    return VALID_KEYS.has(mappedKey)
  },

  // Sequence length limits
  maxSequenceLength: (pattern: ParsedPattern) => pattern.steps.length <= 5,

  // Platform-specific restrictions
  platformRestrictions: (step: KeyStep, platform?: string) => {
    if (!platform) return true

    // Meta+Alt combinations don't work well on Windows
    if (platform === 'windows' && step.modifiers.has('meta') && step.modifiers.has('alt')) {
      return false
    }

    // Ctrl+Meta combinations are problematic on Linux
    if (platform === 'linux' && step.modifiers.has('ctrl') && step.modifiers.has('meta')) {
      return false
    }

    return true
  }
}

function validateParsed(parsed: ParsedPattern, options?: { platform?: string, keyMappings?: Record<string, string> }): ValidationResult {
  const warnings: string[] = []

  for (const step of parsed.steps) {
    if (!VALIDATION_RULES.requireKey(step)) {
      return { valid: false, error: 'Step must have at least one key' }
    }

    if (!VALIDATION_RULES.noDuplicateModifiers(step)) {
      return { valid: false, error: 'Duplicate modifiers in step' }
    }

    if (!VALIDATION_RULES.validKeyNames(step, options?.keyMappings)) {
      return { valid: false, error: `Invalid key name: ${step.key}` }
    }

    if (!VALIDATION_RULES.platformRestrictions(step, options?.platform)) {
      warnings.push(`Key combination may not work on ${options?.platform}`)
    }
  }

  if (!VALIDATION_RULES.maxSequenceLength(parsed)) {
    return { valid: false, error: 'Sequence too long (max 5 steps)' }
  }

  return { valid: true, warnings: warnings.length > 0 ? warnings : undefined }
}
```

### Collision Detection System

#### Detection Algorithm
```typescript
interface CollisionDetector {
  detectCollisions(bindings: KeyBinding[]): CollisionReport[]
  detectPotentialSequenceConflicts(patterns: ParsedPattern[]): ConflictReport[]
}

class CollisionDetector {
  detectCollisions(bindings: KeyBinding[]): CollisionReport[] {
    const collisions: CollisionReport[] = []
    const patternMap = new Map<string, KeyBinding[]>()

    // Group by normalized pattern string
    for (const binding of bindings) {
      const key = this.normalizePattern(binding.parsedPattern)
      if (!patternMap.has(key)) {
        patternMap.set(key, [])
      }
      patternMap.get(key)!.push(binding)
    }

    // Find groups with multiple bindings
    for (const [pattern, conflictingBindings] of patternMap) {
      if (conflictingBindings.length > 1) {
        collisions.push({
          pattern,
          bindings: conflictingBindings,
          severity: this.calculateSeverity(conflictingBindings)
        })
      }
    }

    return collisions
  }

  detectSequenceConflicts(patterns: ParsedPattern[]): ConflictReport[] {
    const conflicts: ConflictReport[] = []

    for (let i = 0; i < patterns.length; i++) {
      for (let j = i + 1; j < patterns.length; j++) {
        const conflict = this.checkSequenceConflict(patterns[i], patterns[j])
        if (conflict) {
          conflicts.push(conflict)
        }
      }
    }

    return conflicts
  }

  private checkSequenceConflict(a: ParsedPattern, b: ParsedPattern): ConflictReport | null {
    // Check for prefix conflicts: "g-g" vs "g-g-h"
    if (a.type === 'sequence' && b.type === 'sequence') {
      if (this.isPrefix(a.steps, b.steps) || this.isPrefix(b.steps, a.steps)) {
        return {
          type: 'sequence-prefix',
          patterns: [a, b],
          description: 'One sequence is a prefix of another'
        }
      }
    }

    return null
  }
}
```

### Sequence Management System

#### Sequence State Machine
```typescript
interface SequenceState {
  partialMatch: KeyStep[]
  possibleMatches: KeyBinding[]
  timeout: number | null
  startTime: number
}

class SequenceManager {
  private state: SequenceState | null = null
  private timeout: number

  constructor(timeout: number = 3000) {
    this.timeout = timeout
  }

  updateTimeout(newTimeout: number) {
    this.timeout = newTimeout
  }

  processKeyEvent(event: NormalizedKeyEvent, bindings: KeyBinding[]): SequenceResult {
    const currentStep = this.eventToKeyStep(event)

    if (!this.state) {
      return this.startNewSequence(currentStep, bindings)
    }

    return this.continueSequence(currentStep, bindings)
  }

  private startNewSequence(step: KeyStep, bindings: KeyBinding[]): SequenceResult {
    const matches = this.findPotentialMatches(step, bindings)

    if (matches.length === 0) {
      return { type: 'no-match' }
    }

    const exactMatches = matches.filter(m => m.parsedPattern.steps.length === 1)
    if (exactMatches.length > 0) {
      return { type: 'exact-match', bindings: exactMatches }
    }

    // Start sequence tracking
    this.state = {
      partialMatch: [step],
      possibleMatches: matches,
      timeout: window.setTimeout(() => this.clearState(), this.timeout),
      startTime: Date.now()
    }

    return { type: 'partial-match', expectedNext: this.getExpectedNextKeys() }
  }

  private continueSequence(step: KeyStep, bindings: KeyBinding[]): SequenceResult {
    if (!this.state) return { type: 'no-match' }

    const newPartialMatch = [...this.state.partialMatch, step]
    const stillPossible = this.state.possibleMatches.filter(binding =>
      this.matchesPartialSequence(binding, newPartialMatch)
    )

    if (stillPossible.length === 0) {
      this.clearState()
      return { type: 'sequence-broken' }
    }

    const exactMatches = stillPossible.filter(binding =>
      binding.parsedPattern.steps.length === newPartialMatch.length
    )

    if (exactMatches.length > 0) {
      this.clearState()
      return { type: 'exact-match', bindings: exactMatches }
    }

    // Continue sequence
    this.state.partialMatch = newPartialMatch
    this.state.possibleMatches = stillPossible

    return { type: 'partial-match', expectedNext: this.getExpectedNextKeys() }
  }

  clearState() {
    if (this.state?.timeout) {
      window.clearTimeout(this.state.timeout)
    }
    this.state = null
  }
}
```

### Platform-Specific Handling

#### Cross-Platform Normalization
```typescript
interface PlatformHandler {
  normalizeEvent(event: KeyboardEvent, options: UseKeyBindingsOptions): NormalizedKeyEvent
  mapKeyNames(key: string, customMappings?: Record<string, string>): string
  handlePlatformQuirks(event: KeyboardEvent): KeyboardEvent
}

class PlatformHandler {
  private platform = this.detectPlatform()

  normalizeEvent(event: KeyboardEvent, options: UseKeyBindingsOptions): NormalizedKeyEvent {
    const handled = this.handlePlatformQuirks(event)

    return {
      key: this.mapKeyNames(handled.key, options.keyMappings),
      code: handled.code,
      modifiers: {
        ctrl: handled.ctrlKey,
        meta: handled.metaKey,
        shift: handled.shiftKey,
        alt: handled.altKey
      },
      timestamp: handled.timeStamp,
      platform: this.platform
    }
  }

  mapKeyNames(key: string, customMappings?: Record<string, string>): string {
    // Apply custom mappings first
    if (customMappings?.[key]) {
      return customMappings[key]
    }

    // Handle platform-specific key name differences
    const platformMappings = {
      mac: {
        'Meta': 'Meta',     // Keep as Meta on Mac
        'Alt': 'Option',    // Option key on Mac
      },
      windows: {
        'Meta': 'Windows',  // Windows key (or map to Ctrl for user expectation)
        'Alt': 'Alt',
      },
      linux: {
        'Meta': 'Super',    // Super key on Linux (or map to Ctrl for user expectation)
        'Alt': 'Alt',
      }
    }

    return platformMappings[this.platform]?.[key] || key
  }

  // Map Meta/Command to Ctrl on non-macOS for user expectations (optional behavior)
  mapMetaToCtrl(key: string): string {
    if (this.platform !== 'mac' && (key === 'Meta' || key === 'Command')) {
      return 'Control'
    }
    return key
  }

  handlePlatformQuirks(event: KeyboardEvent): KeyboardEvent {
    // Handle known platform-specific issues
    if (this.platform === 'mac' && event.key === 'Dead') {
      // macOS dead key handling
      return this.handleMacDeadKey(event)
    }

    if (this.platform === 'windows' && event.code === 'AltGraph') {
      // Windows AltGr handling
      return this.handleWindowsAltGr(event)
    }

    return event
  }

  // Display formatting for hotkeys
  static getDisplayString(pattern: string, platform?: string): string {
    const parsed = HotkeyParser.parse(pattern)
    return DisplayFormatter.format(parsed, platform || this.detectPlatform())
  }

  private detectPlatform(): 'mac' | 'windows' | 'linux' | 'unknown' {
    if (typeof navigator === 'undefined') return 'unknown'

    const userAgent = navigator.userAgent.toLowerCase()
    if (userAgent.includes('mac')) return 'mac'
    if (userAgent.includes('win')) return 'windows'
    if (userAgent.includes('linux')) return 'linux'
    return 'unknown'
  }
}

class DisplayFormatter {
  static format(parsed: ParsedPattern, platform: string): string {
    const platformSymbols = {
      mac: {
        'Meta': '⌘',
        'Alt': '⌥',
        'Shift': '⇧',
        'Control': '⌃',
      },
      windows: {
        'Meta': 'Win',
        'Alt': 'Alt',
        'Shift': 'Shift',
        'Control': 'Ctrl',
      },
      linux: {
        'Meta': 'Super',
        'Alt': 'Alt',
        'Shift': 'Shift',
        'Control': 'Ctrl',
      }
    }

    const symbols = platformSymbols[platform] || platformSymbols.windows

    return parsed.steps.map(step => {
      const modifierStr = Array.from(step.modifiers)
        .sort()
        .map(mod => symbols[mod] || mod)
        .join('')

      const keyStr = step.key.length === 1 ? step.key.toUpperCase() : step.key
      return modifierStr + keyStr
    }).join(' ')
  }
}

### Input Context System

#### Context Detection
```typescript
interface InputContextManager {
  isInputContext(element: HTMLElement): boolean
  shouldAllowBinding(binding: KeyBinding, focusedElement: HTMLElement): boolean
  registerInputContext(selector: string, allow: boolean): void
}

class InputContextManager {
  private inputSelectors = new Set([
    'input:not([type="checkbox"]):not([type="radio"])',
    'textarea',
    '[contenteditable="true"]',
    '[contenteditable=""]'
  ])

  private customContexts = new Map<string, boolean>()

  isInputContext(element: HTMLElement): boolean {
    // Check built-in input types
    for (const selector of this.inputSelectors) {
      if (element.matches(selector)) return true
    }

    // Check custom registered contexts
    for (const [selector, isInput] of this.customContexts) {
      if (element.matches(selector)) return isInput
    }

    return false
  }

  shouldAllowBinding(binding: KeyBinding, focusedElement: HTMLElement): boolean {
    const isInput = this.isInputContext(focusedElement)

    if (!isInput) return true // Always allow in non-input contexts

    const { runInTextInput } = binding.options

    if (typeof runInTextInput === 'boolean') {
      return runInTextInput
    }

    if (typeof runInTextInput === 'function') {
      return runInTextInput(focusedElement)
    }

    return false // Default: don't run in text inputs
  }
}
```

### Performance Optimizations

#### Event Processing Optimization
```typescript
class PerformanceOptimizations {
  // Debounce rapid key events
  private eventDebouncer = new Map<string, number>()

  // Cache parsed patterns
  private patternCache = new Map<string, ParsedPattern>()

  // Pre-compute event matching
  private eventMatchCache = new Map<string, KeyBinding[]>()

  optimizeEventProcessing(event: KeyboardEvent): boolean {
    // Skip processing if identical event fired recently
    const eventKey = this.getEventKey(event)
    const now = Date.now()
    const lastTime = this.eventDebouncer.get(eventKey)

    if (lastTime && now - lastTime < 16) { // ~60fps threshold
      return false // Skip this event
    }

    this.eventDebouncer.set(eventKey, now)
    return true
  }

  getCachedPattern(pattern: string): ParsedPattern {
    if (!this.patternCache.has(pattern)) {
      this.patternCache.set(pattern, HotkeyParser.parse(pattern))
    }
    return this.patternCache.get(pattern)!
  }

  precomputeMatches(bindings: KeyBinding[]): void {
    // Pre-compute which bindings could match each possible key combination
    for (const binding of bindings) {
      const firstStep = binding.parsedPattern.steps[0]
      const eventKey = this.keyStepToEventKey(firstStep)

      if (!this.eventMatchCache.has(eventKey)) {
        this.eventMatchCache.set(eventKey, [])
      }
      this.eventMatchCache.get(eventKey)!.push(binding)
    }
  }
}
```

### Integration Points

#### ActionCore Integration
```typescript
interface ActionCoreIntegration {
  registerActionBinding(actionId: string, pattern: string, options?: KeyBindingOptions): void
  unregisterActionBinding(actionId: string): void
  updateBindingContext(context: BindingContext): void
  getCollisionReport(): CollisionReport[]
}

// ActionCore uses useKeyBindings like this:
const actionCoreBindings = computed(() => {
  const bindings: KeyBindingConfig = {}

  for (const [actionId, action] of actionRegistry.value) {
    if (action.hotkey) {
      bindings[action.hotkey] = {
        handler: () => executeAction(actionId),
        options: {
          preventDefault: action.preventDefault,
          stopPropagation: action.stopPropagation,
          runInTextInput: action.runInTextInput,
          description: action.title
        }
      }
    }
  }

  return bindings
})

const { activate, deactivate, getCollisions } = useKeyBindings(actionCoreBindings, {
  target: document,
  detectCollisions: true
})
```

#### Component Integration
```typescript
// VCommandPalette navigation keys
const navigationBindings = computed(() => ({
  'ArrowUp': { handler: () => navigateUp() },
  'ArrowDown': { handler: () => navigateDown() },
  'Enter': { handler: () => selectItem() },
  'Escape': { handler: () => close() },
  'PageUp': { handler: () => pageUp() },
  'PageDown': { handler: () => pageDown() },
  'Home': { handler: () => goToFirst() },
  'End': { handler: () => goToLast() }
}))

// VHotKey validation
const { validatePattern, parsePattern } = useKeyBindings()
const isValidHotkey = computed(() => validatePattern(props.hotkey))
```

### Shared Utilities Export

#### Validation and Parsing Utilities
```typescript
// Exported for use by VHotKey and other components
export const KeyBindingUtils = {
  // String parsing and validation
  validate: (pattern: string, options?: { platform?: string, keyMappings?: Record<string, string> }) =>
    HotkeyParser.validate(pattern, options),
  parse: (pattern: string) => HotkeyParser.parse(pattern),
  normalize: (pattern: string) => HotkeyParser.normalize(pattern),

  // Display formatting
  formatForDisplay: (pattern: string, platform?: string) => {
    try {
      const parsed = HotkeyParser.parse(pattern)
      return DisplayFormatter.format(parsed, platform || PlatformHandler.detectPlatform())
    } catch {
      return pattern // Return original if parsing fails
    }
  },

  // Platform-specific display
  platformSpecificDisplay: (pattern: string, platform?: string) =>
    PlatformHandler.getDisplayString(pattern, platform),

  // Collision detection
  detectCollisions: (bindings: KeyBinding[]) =>
    CollisionDetector.prototype.detectCollisions(bindings),

  // Key validation
  isValidKey: (key: string) => VALID_KEYS.has(key),

  // Platform detection
  getPlatform: () => PlatformHandler.detectPlatform(),

  // Debugging utilities
  getDebugInfo: (bindings: KeyBinding[], sequenceManager: SequenceManager, collisionDetector: CollisionDetector) =>
    DebugManager.getDebugInfo(bindings, sequenceManager, collisionDetector)
}

// Main composable interface
export function useKeyBindings(
  bindings: MaybeRef<KeyBindingConfig>,
  options: UseKeyBindingsOptions = {}
): UseKeyBindingsReturn {
  const {
    target = document,
    eventType = 'keydown',
    useEventCode = false,
    sequenceTimeout = 3000,
    detectCollisions = false,
    listenerOptions = { passive: false },
    globalDefaults = {},
    keyMappings = {},
    debug = false
  } = options

  // Implementation details...

  return {
    activate: () => { /* Enable event listeners */ },
    deactivate: () => { /* Disable event listeners */ },
    getCollisions: () => CollisionDetector.detectCollisions(processedBindings),
    isActive: ref(false),
    debugInfo: computed(() => debug ? DebugManager.getDebugInfo(processedBindings, sequenceManager, collisionDetector) : null)
  }
}

interface UseKeyBindingsReturn {
  activate: () => void
  deactivate: () => void
  getCollisions: () => CollisionReport[]
  isActive: Ref<boolean>
  debugInfo: ComputedRef<DebugInfo | null>
}
```

#### Main Composable Usage Examples
```typescript
// Basic usage
const { activate, deactivate } = useKeyBindings({
  'Ctrl+s': { handler: () => save() },
  'Escape': { handler: () => cancel() }
})

// Advanced usage with options
const { activate, getCollisions, debugInfo } = useKeyBindings(
  computed(() => dynamicBindings.value),
  {
    target: ref(containerElement),
    sequenceTimeout: 5000,
    detectCollisions: true,
    globalDefaults: {
      preventDefault: true,
      runInTextInput: false
    },
    keyMappings: {
      'ö': 'semicolon'  // QWERTZ keyboard layout
    },
    debug: import.meta.env.DEV
  }
)

// ActionCore integration (reactive bindings)
const actionCoreBindings = computed(() => {
  const bindings: KeyBindingConfig = {}

  for (const [actionId, action] of actionRegistry.value) {
    if (action.hotkey && action.enabled) {
      bindings[action.hotkey] = {
        handler: (event) => executeAction(actionId, { event }),
        options: {
          preventDefault: action.preventDefault,
          stopPropagation: action.stopPropagation,
          runInTextInput: action.runInTextInput,
          description: action.title,
          enabled: action.enabled
        }
      }
    }
  }

  return bindings
})

const { activate, deactivate, getCollisions } = useKeyBindings(actionCoreBindings, {
  target: document,
  detectCollisions: true,
  debug: import.meta.env.DEV
})
```

### Error Handling Strategy

#### Handler Execution Error Handling
```typescript
class ErrorHandler {
  static async executeHandlers(matches: MatchResult[], originalEvent: KeyboardEvent, debug: boolean = false): Promise<void> {
    for (const match of matches) {
      try {
        const result = match.binding.handler(originalEvent)

        // Handle async handlers
        if (result instanceof Promise) {
          await result
        }

        if (debug) {
          console.debug(`[useKeyBindings] Successfully executed handler for pattern: ${match.binding.pattern}`)
        }
      } catch (error) {
        // Graceful error handling - don't let one handler break others
        console.warn(`[useKeyBindings] Handler failed for pattern: ${match.binding.pattern}`, error)

        if (debug) {
          console.error(`[useKeyBindings] Detailed error:`, {
            pattern: match.binding.pattern,
            description: match.binding.options.description,
            error: error
          })
        }

        // Continue processing other handlers
        continue
      }
    }
  }
}
```

#### Event Processing Error Recovery
```typescript
class EventProcessor {
  processEvent(event: KeyboardEvent, options: UseKeyBindingsOptions): boolean {
    try {
      // Skip if processing should be optimized away
      if (!PerformanceOptimizations.optimizeEventProcessing(event)) {
        return false
      }

      const normalized = PlatformHandler.normalizeEvent(event, options)
      const matches = this.matchBindings(normalized)

      if (matches.length > 0) {
        ErrorHandler.executeHandlers(matches, event, options.debug)
        return true
      }

      return false
    } catch (error) {
      console.warn('[useKeyBindings] Event processing failed:', error)
      return false
    }
  }
}

### Development and Debugging Support

#### Debug Information
```typescript
interface DebugInfo {
  activeBindings: Array<{
    pattern: string
    description?: string
    enabled: boolean
    lastTriggered?: number
  }>
  sequenceState?: {
    partialMatch: string[]
    possibleMatches: string[]
    timeRemaining: number
  }
  collisions: CollisionReport[]
  performance: {
    eventProcessingTime: number
    cacheHitRate: number
  }
}

class DebugManager {
  static getDebugInfo(bindings: KeyBinding[], sequenceManager: SequenceManager, collisionDetector: CollisionDetector): DebugInfo {
    return {
      activeBindings: bindings.map(binding => ({
        pattern: binding.pattern,
        description: binding.options.description,
        enabled: binding.options.enabled ?? true,
        lastTriggered: binding.lastTriggered
      })),
      sequenceState: sequenceManager.state ? {
        partialMatch: sequenceManager.state.partialMatch.map(step => this.keyStepToString(step)),
        possibleMatches: sequenceManager.state.possibleMatches.map(b => b.pattern),
        timeRemaining: Math.max(0, sequenceManager.timeout - (Date.now() - sequenceManager.state.startTime))
      } : undefined,
      collisions: collisionDetector.detectCollisions(bindings),
      performance: PerformanceOptimizations.getStats()
    }
  }

  static logBindings(bindings: KeyBinding[]): void {
    console.group('[useKeyBindings] Active Key Bindings')
    bindings.forEach(binding => {
      console.log(`${binding.pattern}: ${binding.options.description || 'No description'}`)
    })
    console.groupEnd()
  }
}

This comprehensive design establishes a robust foundation for the entire ActionCore system. The design now addresses all requirements including:

**✅ Resolved Issues:**
- **Cross-Platform Compatibility**: Complete Meta/Ctrl mapping options, event.code vs event.key support, configurable keyboard layouts
- **Missing Type Definitions**: KeyBindingHandler, UseKeyBindingsOptions, ValidationResult, DebugInfo interfaces
- **Configuration Options**: Reactive target elements, configurable sequence timeouts, global defaults, enable/disable flags
- **Error Handling**: Graceful handler error recovery, event processing error handling, development debugging
- **Shared Utilities**: Complete KeyBindingUtils export with all required methods
- **Platform Features**: Left/right modifier distinction, platform-specific display formatting
- **Development Support**: Comprehensive debugging information and logging utilities

**🚀 Ready for Next Layer:**
This solid foundation enables ActionCore to build robust action management with reliable collision detection, binding management, and platform compatibility. All integration points are well-defined for VHotKey validation utilities and VCommandPalette navigation bindings.

The key architectural decisions here will ensure consistent behavior across the entire ActionCore ecosystem. Ready to proceed with ActionCore design!
