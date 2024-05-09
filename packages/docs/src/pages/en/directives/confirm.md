---
emphasized: true
meta:
  nav: Confirm
  title: Confirm directive
  description: The Confirm directive is an easy to use implementation of VConfirm.
  keywords: Confirm, vuetify Confirm directive, vue Confirm directive, mobile Confirm directive
related:
  - /components/menu/
  - /components/list/
  - /components/text-field/
features:
  report: true
---

# Confirm directive

The `v-confirm` directive is a shorthand way of adding confirms in your application.

<PageFeatures />

<PromotedEntry />

## Usage

The `v-confirm` directive makes it easy to add a confirm to any element in your application. It is a wrapper around the `v-confirm` component.

<ExamplesUsage name="v-confirm-directive" />

## API

| Props                                  | Type                         |
|--------------------------------------------|-------------------------------------|
| title                                       | String |
| text                                       | String |
| input                                       | String, Boolean |
| inputProps                                       | [v-text-field](/api/v-text-field/) |
| onSubmit                                       | ((value: any) => void) |
| onCancel                                       | (() => number) |


## Guide

The `v-confirm` directive is a simple way to add a confirm to any element in your application. It is a wrapper around the `v-confirm`.

### Object literals

The `v-confirm` directive can also accept an object literal as a value. This is useful when you need to pass multiple props to the `v-confirm` component.

<ExamplesExample file="v-confirm-directive/object-literals" />
