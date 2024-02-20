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

The `v-mutate` directive utilizes the [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver). It provides an easy to use interface for detecting when elements are updated.

<PageFeatures />

<PromotedEntry />

## Usage

`v-mutate` is a simple interface for the [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) that is implemented with [Vue directives](https://v3.vuejs.org/api/directives.html). There are two main ways to alter `v-mutate`'s options; with directive modifiers using period notation, or with a custom options object. The following table contains information on the available directive modifiers:

| Modifier     | Default      | Description |
| ------------ | -----------  | ----------- |
| `.attr`      | `true`       | The [attr](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/attributes) modifier monitors target node's attribute changes                                                       |
| `.char`      | `true`       | The [char](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/characterData) modifier monitors changes to target node's character data (and, its descendants if `.sub` is `true`)       |
| `.child`     | `true`       | The [child](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/childList) modifier monitors for the addition or removal of child nodes (and, its descendants if `.sub` is `true`) |
| `.sub`       | `true`       | The [sub](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserverInit/subtree) modifier extends all monitoring to the entire subtree of target node                                        |
| `.once`      | `undefined`  | The [once](#once) modifier invokes the user provided callback one time and disconnects the observer                                                                                                  |
| `.immediate` | `undefined`  | The [immediate](#immediate) modifier invokes the user provided callback on _mounted_ and does not effect `.once`                                                                                     |

By default, `v-mutate` enables `.attr`, `.char`, `.child`, and `.sub` unless you manually apply one; in which case the undefined options are set to false:

```html { resource="Component.vue" }
<template>
  <div>
    <!-- attr, char, child, and sub are true -->
    <div v-mutate="..." />

    <!-- child is true, attr, char, and child are false -->
    <div v-mutate.child="...">
  </div>
</template>
```

In addition to the _modifier_ syntax, the `v-mutate` directive is configurable via a custom object containing a **handler** and **options** key. The following example demonstrates how both processes achieve the same result:

```html { resource="Component.vue" }
<template>
  <div>
    <div v-mutate="{
      handler: onMutate,
        modifiers: {
          child: true,
          sub: true,
        }
      }"
    />

    <!-- is the same as -->

    <div v-mutate.child.sub="onMutate" />
  </div>
</template>

<script setup>
  function onMutate () {
    //
  }
</script>
```

::: warning
  When using custom options, it's recommended to use the `.sub` modifier. This extends mutation monitoring to all descendants of the target element.
:::

### Once

There may be times where your callback should only fire once. In these scenarios, use the **once** option to disconnect the observer after the first detected mutation. In the next example, we bind data value _content_ to 2 separate [v-card](/components/cards/) components and an `input`; then track the number of mutations that occur as we type:

```html { resource="Component.vue" }
<template>
  <div>
    <input type="text" v-model="content">

    <v-card v-mutate="onMutate">{{ content }}</v-card>

    <v-card v-mutate.once="onMutate">{{ content }}</v-card>
  </div>
</template>

<script setup>
  import { onMounted, shallowRef } from 'vue'

  const content = shallowRef('Foo')
  const mutations = shallowRef(0)

  onMounted(() => {
    content.value = 'Bar'

    console.log(mutations.value) // 2

    setTimeout(() => {
      content.value = 'Foobar'

      console.log(mutations.value) // 3
    }, 200)
  })

  function onMutate () {
    mutations.value++
  }
</script>
```

When the value of content changes, both cards immediately call _onMutate_ and iterate the value of the _mutations_ data value. Because the second card is using the **once** modifier, it automatically unbinds its observer after the first change to _content_.

### Immediate

Unlike the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver), the provided callback is **not** immediately invoked when a Mutation Observer is created. Vuetify normalizes this behavior with the **immediate** option. In the following example, the `v-mutate` directive invokes the _onMutate_ method when the element is initially mounted in the DOM **and** with every mutation; based upon the provided options.

```html { resource="Component.vue" }
<template>
  <div v-mutate.immediate="onMutate">...</div>
</template>

<script setup>
  import { onMounted, shallowRef } from 'vue'

  const mutations = shallowRef(0)

  onMounted(() => {
    console.log(mutations.value) // 1
  })

  function onMutate () {
    mutations.value++
  }
</script>
```

::: info
  The **immediate** callback is not counted as a mutation and does not trigger the observer to disconnect when using **once**.
:::

## API

| Directive                            | Description                     |
|--------------------------------------|---------------------------------|
| [v-mutate](/api/v-mutate-directive/) | The mutation observer directive |

<ApiInline hide-links />

## Examples

<ExamplesExample file="v-mutate/usage" />

<ExamplesExample file="v-mutate/option-modifiers" />
