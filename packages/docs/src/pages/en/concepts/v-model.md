---
nav: v-model
meta:
  title: v-model
  description: v-model
  keywords: v-model
related:
  - /components/lists
  - /components/text-fields
---

# v-model

- v-model = modelValue + @update:modelValue
- v-model:prop = prop + @update:prop

If both prop and event are defined, the model is "controlled" and the prop is used as the value. If only the prop is defined, the model is "uncontrolled" and the prop is used as the initial value.

Controlled models must be handled externally, if the updated value is not passed back to the prop, the component will not update. This can be useful for conditionally ignoring updates or preventing certain values from being entered.

A static value can be set by defining the prop with an initial value, and defining the event with a noop function.

```vue
<v-text-field modelValue="foo" @update:modelValue="" />
```
