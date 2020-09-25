---
meta:
  title: Expansion panel component
  description: The expansion panel component is a lightweight container that hides information behind expandable and contractable containers.
  keywords: expansion panels, vuetify expansion panel component, vue expansion panel component
related:
  - /components/cards/
  - /components/data-tables/
  - /components/lists/
---

# Expansion panels

The `v-expansion-panel` component is useful for reducing vertical space with large amounts of information. The default functionality of the component is to only display one expansion-panel body at a time; however, with the `multiple` property, the expansion-panel can remain open until explicitly closed.

<entry-ad />

## Usage

Expansion panels in their simplest form display a list of expandable items.

<example file="v-expansion-panels/usage" />

## API

- [v-expansion-panels](/api/v-expansion-panels)
- [v-expansion-panel](/api/v-expansion-panel)
- [v-expansion-panel-header](/api/v-expansion-panel-header)
- [v-expansion-panel-content](/api/v-expansion-panel-content)

<!-- ## Sub-components

### v-expansion-panel

v-expansion-panel description

### v-expansion-panel-header

v-expansion-panel-header description

### v-expansion-panel-content

v-expansion-panel-content description -->

## Examples

### Props

#### Accordion

**accordion** expansion-panel hasn't got margins around active panel.

<example file="v-expansion-panels/prop-accordion" />

#### Disabled

Both the expansion-panel and its content can be disabled using the **disabled** prop.

<example file="v-expansion-panels/prop-disabled" />

#### Focusable

The expansion-panel headers can be made focusable with the prop **focusable**.

<example file="v-expansion-panels/prop-focusable" />

#### Inset

**inset** expansion-panel becomes smaller when activated.

<example file="v-expansion-panels/prop-inset" />

#### Model

Expansion panels can be controlled externally by modifying the **v-model**. Its value corresponds to a zero-based index of the currently opened expansion panel content.
If **multiple** prop is used then it is an array containing the indices of the open items.

<example file="v-expansion-panels/prop-model" />

#### Popout

The expansion-panel also has **popout** design. With it, expansion-panel is enlarged when activated.

<example file="v-expansion-panels/prop-popout" />

#### Readonly

**readonly** prop does the same thing as **disabled**, but it doesn't touch styles.

<example file="v-expansion-panels/prop-readonly" />

### Misc

#### Advanced

The expansion panel component provides a rich playground to build truly advanced implementations. Here we take advantage of slots in the `v-expansion-panel-header` component to react to the state of being open or closed by fading content in and out.

<example file="v-expansion-panels/misc-advanced" />

#### Custom icon

Expand action icon can be customized with **expand-icon** prop or the `actions` slot.

<example file="v-expansion-panels/misc-custom-icons" />

<backmatter />
