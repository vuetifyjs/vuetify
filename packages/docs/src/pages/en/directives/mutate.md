---
meta:
  title: Mutation observer directive
  description: The mutation observer directive utilizes the Mutation observer API. It allows you to determine when elements are updated.
  keywords: mutate, vuetify mutate directive, mutation observer directive
related:
  - /components/sheets/
  - /components/images/
---

# Mutation observer

The `v-mutate` directive utilizes the [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver). It provides an easy to use interface for detecting when elements are updated.

<entry-ad />

## Usage

By default the `v-mutate` directive will enable all available options in the [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver). This can be modified in one of two ways. You can either pass in object with keys for **handler** and **options** or use the `modifier` property of the directive, `v-mutate.attr.sub="onMutate"`

<example file="v-mutate/usage" />

## API

- [v-mutate](/api/v-mutate)

## Examples

### Options

#### Modifiers

The `v-mutate` directive accepts modifiers for all of the available options in the [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver). For brevity, abbreviations are used—**attr** (attributes), **child** (childList), **sub** (subtree) and **char** (characterData).

<example file="v-mutate/option-modifiers" />

<backmatter />
