---
meta:
  nav: Mutation observer
  title: Mutation observer directive
  description: The mutation observer directive utilizes the Mutation observer API. It allows you to invoke a callback when targeted elements are updated.
  keywords: mutate, vuetify mutate directive, mutation observer directive, mutation observer
related:
  - /components/sheets/
  - /components/images/
  - /directives/intersect/
---

# Mutation observer

The `v-mutate` directive calls a function when the element or its content changes. It is a wrapper around the [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

<PageFeatures />

<PromotedEntry />

## Usage

The handler receives the list of [mutation records](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord) and the observer.

<ExamplesExample file="v-mutate/usage" />

## API

| Directive                            | Description                     |
|--------------------------------------|---------------------------------|
| [v-mutate](/api/v-mutate-directive/) | The mutation observer directive |

<ApiInline hide-links />

## Guide

### Modifiers

Without modifiers, `v-mutate` watches attributes, text and child nodes of the element and all of its descendants. Once you add any of the first four modifiers, it watches only what you list.

```html
<div v-mutate.child.sub="onMutate"></div>
```

| Modifier | Watches |
| - | - |
| `.attr` | Attribute changes |
| `.char` | Text changes |
| `.child` | Added or removed child nodes |
| `.sub` | Extends the others to all descendants |
| `.once` | Stops watching after the first call |
| `.immediate` | Also calls the handler on mount, with an empty list. This call does not count for `.once` |

<ExamplesExample file="v-mutate/option-modifiers" />

### Observer options

To pass [observer options](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe#options) such as `attributeFilter`, use an object with **handler** and **options**. The options replace `.attr`, `.char`, `.child` and `.sub`, so set at least one of `attributes`, `characterData` or `childList`.

```html
<div
  v-mutate="{
    handler: onMutate,
    options: { attributes: true, attributeFilter: ['class'] },
  }"
></div>
```
