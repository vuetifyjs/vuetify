---
meta:
  nav: v-model
  title: v-model
  description: v-model
  keywords: v-model
related:
  - /components/lists
  - /components/text-fields
---

# v-model

v-model is a built in Vue directive that allows you to create two-way data bindings.

<PageFeatures />

<PromotedEntry />

## Guide

v-model is a directive that allows you to create two-way data bindings between a component and its parent. It is commonly used with form elements, such as input fields, checkboxes, and select boxes, to bind the value of the element to a data property in the parent component.

### Binding models

- **v-model:** is shorthand for **model-value** and **@update:model-value**
- **v-model:prop:** is shorthand for binding specific properties as a model

If both prop and event are defined, the model is "controlled" and the prop is used as the value. If only the prop is defined, the model is "uncontrolled" and the prop is used as the initial value.

```html
<template>
  <v-text-field v-model="foo" />
</template>

<script setup>
  import { shallowRef } from 'vue'

  const foo = shallowRef('foo')
</script>
```

Is the same as:

```html
<template>
  <v-text-field :model-value="foo" @update:model-value="onUpdateModel" />
</template>

<script setup>
  import { shallowRef } from 'vue'

  const foo = shallowRef('foo')

  function onUpdateModel (value) {
    foo.value = value
  }
</script>
```

Controlled models must be handled externally, if the updated value is not passed back to the prop, the component will not update. This can be useful for conditionally ignoring updates or preventing certain values from being entered.

A static value can be set by defining the prop with an initial value, and defining the event with a noop function.

```html
<template>
  <v-text-field model-value="Foobar" @update:model-value="onUpdateModel" />
</template>

<script setup>
  function onUpdateModel (value) {
    // noop
  }
</script>
```

### Binding specific properties

Some components such as [v-list](/components/lists/) and [v-text-field](/components/text-fields/) have specific properties that can be bound as a model.

```html
<template>
  <v-list
    v-model:active="active"
    v-model:opened="opened"
    v-model:selected="selected"
  />

  <v-text-field
    v-model="model"
    v-model:focus="focus"
  />
</template>

<script setup>
  import { shallowRef } from 'vue'

  const active = shallowRef([])
  const opened = shallowRef([])
  const selected = shallowRef([1])
  const model = shallowRef('')
  const focus = shallowRef(false)
</script>
```
