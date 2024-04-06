---
emphasized: true
meta:
  nav: Tooltip
  title: Tooltip directive
  description: The Tooltip directive is an easy to use implementation of VTooltip.
  keywords: Tooltip, vuetify Tooltip directive, vue Tooltip directive, mobile Tooltip directive
related:
  - /components/navigation-drawers/
  - /components/slide-groups/
  - /components/windows/
features:
  report: true
---

# Tooltip directive

The `v-tooltip` directive is a shorthand way of adding tooltips to elements in your application.

<PageFeatures />

<PromotedEntry />

## Usage

The `v-tooltip` directive makes it easy to add a tooltip to any element in your application. It is a wrapper around the `v-tooltip` component.

<ExamplesUsage name="v-tooltip-directive" />

## API

| Directive                          | Description         |
|------------------------------------|---------------------|
| [v-tooltip](/api/v-tooltip-directive/) | The Tooltip directive |

## Guide

The `v-tooltip` directive is a simple way to add a tooltip to any element in your application. It is a wrapper around the `v-tooltip`.

### Args

The `v-tooltip` directive has a number of args that can be used to customize the behavior of the tooltip.

<ExamplesExample file="v-tooltip-directive/args" />

### Modifiers

Modifiers are values that are passed to the `v-tooltip` component. This is an easy way to make small modifications to boolean [v-tooltip](/api/v-tooltip/) props.

<ExamplesExample file="v-tooltip-directive/modifiers" />

### Object literals

The `v-tooltip` directive can also accept an object literal as a value. This is useful when you need to pass multiple props to the `v-tooltip` component.

<ExamplesExample file="v-tooltip-directive/object-literals" />
