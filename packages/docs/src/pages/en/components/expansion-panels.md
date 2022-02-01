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

Expansion panels in their simplest form display a list of expandable items. You can either declare the markup explicitly, or use the **title** and **text** props.

<example file="v-expansion-panels/usage" />

## API

<api-inline />

## Examples

### Props

#### Variant

There are four different variants of the expansion-panel. Accordion expansion-panels have no margins around the currently active panel. Inset expansion-panels become smaller when activated, while poput expansion-panels become larger.

<example file="v-expansion-panels/prop-variant" />

#### Disabled

Both the expansion-panel and its content can be disabled using the **disabled** prop.

<example file="v-expansion-panels/prop-disabled" />

<!-- #### Focusable

The expansion-panel headers can be made focusable with the prop **focusable**.

<example file="v-expansion-panels/prop-focusable" /> -->

#### Model

Expansion panels can be controlled externally by using the **v-model**. You will need to set a **value** on each panel, so that you can refer to them outside the component. If the **multiple** prop is set, then the **v-model** value will be an array.

<example file="v-expansion-panels/prop-model" />

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
