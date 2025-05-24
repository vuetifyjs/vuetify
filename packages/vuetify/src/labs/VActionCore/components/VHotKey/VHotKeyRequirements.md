# Design Requirements for VHotKey

## This was authored by Matthew Ary and is the primary source of truth for the hotkey. All code, tests, documentation and derived works cannot supersede the contents of this file.

- **Vuetify Integration**
  -   TBD

- **Props**
  -   It SHALL have a `hotkey` prop which accepts a string. The string SHALL be a hotkey combination or sequence. When used, the hotkey SHALL be displayed by the component. This prop is optional.
  -   It SHALL have an `actionId` prop which accepts a string. The string SHALL be the id of an action defined in VActionCore. When used, the hotkey binding for the actionId SHALL be retrieved from ActionCore and displayed by the component. This prop is optional. If used and VActionCore is not initialized, the component SHALL emit a warning to the console about the actionId prop being used without VActionCore being initialized.
  -   It SHALL have a `displayMode` prop which accepts a string. The string SHALL be either 'symbol' or 'text'. The default value SHALL be 'symbol'. When set to 'text', the component SHALL not represent keys as symbols (as is done by mac computers) but rather as text.
  -   While the `hotkey` and `actionId` props are optional, at least one of them SHALL be provided. If both are provided, the `actionId` prop SHALL take precedence and `hotkey` SHALL be used as a fallback only if the actionId cannot be resolved. Developers SHOULD use only one prop at a time. If neither are provided, the component SHALL emit a warning to the console about the component being used without a `hotkey` or `actionId`.
  -   It SHALL have a `sequenceSeparator` prop which accepts a string or false. The string SHALL be a word or character that delineates keys that are not pressed simultaneously but in-order. The default value SHALL be 'then'. The default value SHALL be localized. If the value is false or an empty string, the component SHALL not display a sequence separator.
  -   It SHALL have a `combinationSeparator` prop which accepts a string or false. The string SHALL be a word or character that delineates keys that are pressed simultaneously. The default value SHALL an empty string. The default value SHALL be localized. If the value is false or an empty string, the component SHALL not display a combination separator.

- **Essential Vuetify Integration Props**
  -   The component SHALL use `makeComponentProps()` to accept standard `class` and `style` props.
  -   The component SHALL use `makeThemeProps()` to accept a `theme` prop for Vuetify theme integration.
  -   The component SHALL use `makeDensityProps()` to accept a `density` prop ('default', 'comfortable', 'compact').

- **Vuetify Composable Integration**
  -   The component SHALL use `useDefaults()` to integrate with Vuetify's defaults system for configurable component defaults.
  -   The component SHALL use `useLocale()` for internationalization of separator text and default values.
  -   The component SHALL use `provideTheme()` when theme prop is provided.
  -   The component SHALL generate reactive CSS classes following Vuetify naming conventions (`v-hotkey--modifier-value`).
  -   The component SHALL respect Vuetify's RTL support through locale integration.

- **Slots**
  -   None

- **VHotKey Component**
  -   It SHALL display the hotkey binding for the `hotkey` or `actionId` prop.
  -   When displaying hotkey sequences (that is keys that are not pressed simultaneously but in order), the component shall use a delineation word that is provided by the `sequenceSeparator` prop.
  -   When displaying hotkey combinations (that is keys that are pressed simultaneously), the component shall use a delineation word that is provided by the `combinationSeparator` prop.
  -   The string format validation for the `hotkey` prop SHALL use validation utilities from the useKeyBindings composable.
  -   The component SHALL NOT be used for making key bindings, it is to be used for displaying them.
  -   The component SHALL be reactive to all props.
  -   The component SHALL not display warnings in production.
  -   The component SHALL not render if the `hotkey` and `actionId` props are not provided.

- **ActionCore Integration**
  - The component SHALL reactively display the effective hotkey binding for the provided `actionId`.
  - When the `actionId` is not found in ActionCore, the component SHALL render nothing.
  - When ActionCore is not available and `actionId` is provided, the component SHALL emit a console error in development mode.
  - When ActionCore is not available and `actionId` is provided, the component SHALL emit a capturable warning in production mode for error logging systems.
  - The component SHALL provide an option to disable ActionCore-related warnings on a per-instance basis.
  - The component SHALL automatically update when binding contexts change in ActionCore.
  - The component SHALL use shared key string validation and parsing utilities from useKeyBindings composable.
  - The component SHALL use shared platform-specific display formatting utilities from useKeyBindings composable.

- **Error Handling and Development Support**
  - The component SHALL handle invalid hotkey strings gracefully without crashing.
  - The component SHALL emit helpful warnings for invalid hotkey format in development mode only.
  - The component SHALL provide clear error messages that help developers identify configuration issues in development mode.
  - The component SHALL NOT emit warnings or errors to the console in production mode.
  - The component SHALL emit capturable warnings (not console warnings) in production mode for error logging systems when ActionCore features are used without ActionCore being available.
  - Error handling SHALL NOT impact component performance or cause unnecessary re-renders.

- **Platform-Specific Display**
  - The component SHALL maintain optimal performance and minimal bundle size.
  - The component SHALL support platform-specific key symbol display through the `displayMode` prop.
  - The component SHALL align display conventions with the target platform's keyboard representation standards.
  - Platform detection and display logic SHALL be lightweight and efficient.

- **Testing Requirements**
  - The component SHALL be designed to support comprehensive unit testing.
  - The component SHALL provide utilities or patterns for testing ActionCore integration scenarios.
  - Tests SHALL cover both standalone usage and ActionCore integration scenarios.
  - Tests SHALL validate correct display output for various hotkey formats and platform combinations.
