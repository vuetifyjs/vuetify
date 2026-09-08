---
meta:
  nav: Unused Sass variables
  title: Unused Sass variables
  description: List of Sass variables removed in v4 that had no effect on rendered output, including ones that were still functional in Vuetify 2
  keywords: sass variables, cleanup, upgrade, v4, v3, v2
related:
  - /getting-started/upgrade-guide/
  - /features/sass-variables/
---

# Unused Sass variables

As part of the v4 cleanup, a batch of Sass variables were removed after finding that nothing in the framework actually reads them ([#23136](https://github.com/vuetifyjs/vuetify/issues/23136)). Setting one of these in your `vuetify/settings` overrides compiled fine but never changed anything on screen.

Variables listed below, did work in Vuetify 2. If you're carrying over a `settings.scss` from a v2 project, an override for one of these was silently doing nothing well before v4 — most stopped mattering during the v3 rewrite, not the v4 one.

## Used in v2, no longer needed

```md
- VAppBar
  - $app-bar-scrolled-title-padding-bottom
  - $app-bar-shaped-border-radius
  - $app-bar-transition
- VCounter
  - $counter-line-height
  - $counter-min-height
- VProgressLinear
  - $progress-linear-stripe-background-size
  - $progress-linear-stream-border-width
- VSkeletonLoader
  - $skeleton-loader-actions-button-margin
  - $skeleton-loader-actions-padding
- VSlider
  - $slider-label-margin-start
  - $slider-state-track-background-opacity
  - $slider-thumb-focused-size-increase
- VSystemBar
  - $system-bar-padding
- VTextField
  - $text-field-border-radius
- VTextarea
  - $textarea-box-enclosed-prefix-margin-top
  - $textarea-box-enclosed-single-outlined-label-top
  - $textarea-box-enclosed-single-outlined-margin-top
  - $textarea-dense-box-enclosed-single-outlined-margin-top
  - $textarea-dense-append-prepend-margin-top
  - $textarea-enclosed-text-slot-margin
  - $textarea-enclosed-text-slot-padding
  - $textarea-prefix-padding-top
  - $textarea-solo-append-padding
  - $textarea-solo-append-prepend-margin-top
- VToolbar
  - $toolbar-btn-icon-size
  - $toolbar-content-padding-x
  - $toolbar-content-padding-y
```
