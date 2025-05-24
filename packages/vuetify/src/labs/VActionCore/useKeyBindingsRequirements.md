# Design Requirements for useKeyBindings

## This was authored by Matthew Ary and is the primary source of truth for useKeyBindings. All code, tests, documentation and derived works cannot supersede the contents of this file.

useKeyBindings is a composable that provides a way to manage key bindings for actions. It is used to validate strings used to represent hotkey or key combination bindings, to provide a callback when a hotkey or key combination is released, and binding modifiers such as preventDefault, stopPropagation, and preventDefaultStopPropagation.

## Requirements

### Key Binding String Format

- **String Validation**
  - The composable SHALL accept key binding strings in a standardized format.
  - The composable SHALL support modifier keys including `Ctrl`, `Meta`, `Command`, `Shift`, `Alt`, and `Option`.
  - The composable SHALL support key combinations using `+` or `_` as separators (e.g., `Ctrl+s`, `Meta_shift_a`).
  - The composable SHALL support key sequences using `-` as separators (e.g., `g-g` for vim-style sequences).
  - The composable SHALL normalize key strings to lowercase for consistent matching.
  - The composable SHALL validate key binding strings and reject invalid formats with appropriate warnings.

- **Cross-Platform Compatibility**
  - The composable SHALL handle platform differences in key naming and behavior.
  - On macOS, the composable SHALL treat `Meta`/`Command` keys appropriately and handle Option key combinations.
  - On non-macOS platforms, the composable SHALL map `Meta`/`Command` to `Ctrl` when appropriate for user expectations.
  - The composable SHALL provide options to use `event.code` instead of `event.key` for improved cross-platform compatibility.
  - The composable SHALL handle keyboard layout differences through configurable key code mapping.

- **Key Aliases**
  - The composable SHALL support common key aliases (e.g., `Esc` for `Escape`, `Cmd` for `Meta`).
  - The composable SHALL provide a standardized set of key names that map to browser `KeyboardEvent` properties.
  - The composable SHALL normalize function keys, arrow keys, and special keys to consistent formats.

- **Internationalization and RTL Support**
  - The composable SHALL support right-to-left (RTL) languages and keyboard layouts.
  - The composable SHALL handle keyboard layout differences for international users.
  - The composable SHALL provide options for locale-specific key mappings and display formatting.
  - Key display formatting SHALL respect the user's locale and text direction.
  - The composable SHALL integrate with Vuetify's locale and RTL systems.

### Event Handling and Execution

- **Key Event Processing**
  - The composable SHALL listen for keyboard events on a configurable target element.
  - The composable SHALL support both global window-level and element-specific key binding.
  - The composable SHALL process key events in real-time and match them against registered bindings.
  - The composable SHALL support both keydown and other keyboard event types as needed.

- **Execution Control**
  - The composable SHALL execute registered handler functions when matching key combinations are detected.
  - The composable SHALL support both synchronous and asynchronous handler functions.
  - The composable SHALL provide options to prevent default browser behavior for specific key bindings.
  - The composable SHALL provide options to stop event propagation for specific key bindings.
  - The composable SHALL pass the original `KeyboardEvent` object to handler functions.

- **Modifier Key Handling**
  - The composable SHALL accurately detect and match modifier key states (Ctrl, Meta, Shift, Alt).
  - The composable SHALL distinguish between left and right modifier keys when necessary.
  - The composable SHALL handle modifier-only key bindings appropriately.
  - The composable SHALL support complex modifier combinations (e.g., `Ctrl+Shift+Meta+a`).

### Key Sequences and Combinations

- **Combination Support**
  - The composable SHALL support simultaneous key combinations (keys pressed together).
  - The composable SHALL validate that all required modifier keys are pressed for combination matches.
  - The composable SHALL handle timing sensitivity for key combinations appropriately.

- **Sequence Support**
  - The composable SHALL support key sequences (keys pressed in order, not simultaneously).
  - The composable SHALL detect sequence matches within a configurable time window.
  - The composable SHALL support multi-key sequences of arbitrary length.
  - The composable SHALL provide clear distinction between combination and sequence key bindings.
  - The composable SHALL allow configuration of the time window duration for sequence detection.
  - The composable SHALL clear sequence state when no input is received within the configured timeout period.
  - The composable SHALL clear sequence state and require the user to start over when an invalid key is pressed during a partial sequence match.
  - When multiple sequences share the same prefix, the composable SHALL execute the shortest complete sequence first.

### Input Context Awareness

- **Input Element Handling**
  - The composable SHALL provide options to control key binding behavior when text input elements are focused.
  - The composable SHALL support disabling key bindings entirely when any input element is focused.
  - The composable SHALL support enabling key bindings only when specific named input elements are focused.
  - The composable SHALL support enabling key bindings when any input element is focused.
  - The composable SHALL detect contentEditable elements as input contexts.
  - The composable SHALL provide granular control over input context on a per-binding basis.

- **Element State Detection**
  - The composable SHALL accurately detect the currently focused element.
  - The composable SHALL identify input element types (INPUT, TEXTAREA, contentEditable).
  - The composable SHALL support custom element type detection for specialized input components.

### Configuration and Options

- **Binding Configuration**
  - The composable SHALL accept a reactive configuration object defining key bindings and their handlers.
  - The composable SHALL support dynamic updates to the binding configuration.
  - The composable SHALL support enabling and disabling individual bindings reactively.
  - The composable SHALL validate binding configurations and emit warnings for invalid entries.

- **Global Options**
  - The composable SHALL support configurable event listener options (capture, passive).
  - The composable SHALL support configurable default timeout delays for key sequences.
  - The composable SHALL support configurable default behavior for preventDefault and stopPropagation.
  - The composable SHALL support configurable default settings for input context handling.

### Lifecycle Management

- **Activation and Cleanup**
  - The composable SHALL automatically activate key binding listeners when initialized.
  - The composable SHALL provide methods to manually start and stop key binding detection.
  - The composable SHALL automatically clean up event listeners when the component is unmounted.
  - The composable SHALL handle Vue 3 reactivity lifecycle properly.
  - The composable SHALL support multiple instances without interference.

- **Dynamic Updates**
  - The composable SHALL react to changes in the target element reference.
  - The composable SHALL react to changes in the binding configuration.
  - The composable SHALL update active bindings without requiring re-initialization.

### Collision Detection and Warnings

- **Standalone Collision Detection**
  - When used without ActionCore, the composable SHOULD detect potential key binding collisions within its own configuration.
  - The composable SHOULD emit warnings to the console when multiple handlers are registered for the same key combination.
  - The composable SHOULD provide information about which bindings are conflicting in warning messages.
  - Collision detection SHOULD be passive and SHALL NOT prevent binding registration or execution.

- **ActionCore Integration**
  - When used with ActionCore, the composable SHALL defer collision detection and resolution to ActionCore.
  - The composable SHALL provide methods for ActionCore to query and manage key bindings.
  - The composable SHALL support ActionCore's binding priority and override mechanisms.
  - The composable SHALL integrate with ActionCore's profiling system for dynamic binding changes.
  - ActionCore SHALL emit warnings when overlapping key sequences are registered across the entire system (e.g., both "g-g" and "g-g-g") since ActionCore has visibility into all registered bindings system-wide.

### Error Handling and Debugging

- **Development Support**
  - The composable SHALL provide helpful error messages for invalid key binding strings.
  - The composable SHALL emit warnings for common configuration mistakes.
  - The composable SHALL provide debugging information about registered bindings in development mode.
  - The composable SHALL NOT emit debugging information in production builds.

- **Runtime Error Handling**
  - The composable SHALL handle errors in user-provided handler functions gracefully.
  - The composable SHALL continue processing other key bindings even if one handler throws an error.
  - The composable SHALL emit appropriate warnings when handlers fail.
  - The composable SHALL NOT cause application crashes due to key binding errors.

### Performance and Optimization

- **Event Processing Efficiency**
  - The composable SHALL optimize key event processing for minimal performance impact.
  - The composable SHALL avoid unnecessary computations during key event handling.
  - The composable SHALL use efficient algorithms for key binding matching.
  - The composable SHALL minimize memory allocations during event processing.

- **Reactive Updates**
  - The composable SHALL minimize reactive re-computation when configuration changes.
  - The composable SHALL efficiently update internal state when bindings are modified.
  - The composable SHALL avoid unnecessary re-registration of event listeners.

### Browser Compatibility

- **Modern Browser Support**
  - The composable SHALL work consistently across modern browsers.
  - The composable SHALL handle browser-specific keyboard event differences.
  - The composable SHALL provide fallbacks for browser-specific features when necessary.
  - The composable SHALL support both desktop and mobile browser environments where applicable.

- **Accessibility Considerations**
  - The composable SHALL respect browser accessibility features.
  - The composable SHALL not interfere with screen reader keyboard navigation.
  - The composable SHALL provide options to disable bindings for accessibility compliance.
  - The composable SHALL support right-to-left text direction and layout for accessibility.

### Testing and Validation

- **Testing Support**
  - The composable SHALL be designed to support unit and integration testing.
  - The composable SHALL provide utilities for simulating keyboard events in tests.
  - The composable SHALL support testing of key binding registration and execution.
  - The composable SHALL support testing of error conditions and edge cases.

- **Shared Utilities**
  - The composable SHALL provide exportable utilities for key string validation that other components can import.
  - The composable SHALL provide exportable utilities for key string parsing that other components can import.
  - The composable SHALL provide exportable utilities for platform-specific key display formatting that other components can import.
  - Shared utilities SHALL maintain consistency with the composable's internal key handling logic.

- **Validation Utilities**
  - The composable SHALL provide utilities for validating key binding string formats.
  - The composable SHALL provide utilities for checking binding conflicts.
  - The composable SHALL support validation of handler function signatures.
