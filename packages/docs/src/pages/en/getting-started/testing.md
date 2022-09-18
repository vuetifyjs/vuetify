---
nav: Testing
meta:
  title: Testing
  description: Details for v3 beta release - faq, changes, and upgrading.
  keywords: test, testing, vitest, jest, vue 3, vuetify 3
---

<script setup>
  import { ref } from 'vue'

  const tab = ref('testing-library')
</script>

# Testing

Introduction here

## End-to-end testing

### Cypress

TBW

## Unit testing

We recommend [vitest](https://vitest.dev/) for your unit testing needs, if you are running a vite based project.

### Vitest

Start by installing `vitest` and the `jsdom` environment.

```bash
yarn -D vitest jsdom
```

Then configure vitest using the `test` object in the vite config. Make sure to add `vuetify` as an inline dependency.

```ts { data-resource="vite.config.ts" }
...

export default defineConfig({
  ...,
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['vuetify']
    }
  }
})
```

That should be enough to run tests. Go to the [Writing tests](#writing-tests) section to see how to render and test Vuetify components

### Jest

If you already have an existing jest setup that you want to continue using, have a look at [vite-jest](https://github.com/sodatea/vite-jest), which offers first-class Vite integration for jest.

### Writing tests

Here is a simple example component with a **VBtn** component.

```html { data-resource="Hello.vue" }
<script setup lang="ts">
    import { computed, ref } from 'vue'
    import { VBtn } from 'vuetify/components'

    const props = defineProps<{ count: number }>()
    const times = ref(2)
    const result = computed(() => props.count * times.value)

    defineExpose(props)
</script>

<template>
    <div>{{ count }} x {{ times }} = {{ result }}</div>
    <VBtn @click="times += 1">
    x1
    </VBtn>
</template>
```

To render Vue components in unit tests, you can use either [@testing-library/vue](https://github.com/testing-library/vue-testing-library) or [@vue/test-utils](https://github.com/vuejs/test-utils). You can find a good comparison of the two in the [Vue documentation](https://vuejs.org/guide/scaling-up/testing.html#mounting-libraries).

There is not much difference between the two when it comes to mounting Vuetify components. In the examples below we have created a helper function that registers Vuetify as a global plugin.

<v-tabs v-model="tab" color="primary">
  <v-tab value="testing-library" variant="plain">@testing-library/vue</v-tab>
  <v-tab value="test-utils" variant="plain">@vue/test-utils</v-tab>
</v-tabs>

<v-window v-model="tab">
  <v-window-item value="testing-library">

```ts { data-resource="Hello.spec.ts" }
import { render, fireEvent } from '@testing-library/vue'
import { test, expect } from 'vitest'
import { createVuetify } from 'vuetify'
import Hello from './Hello.vue'

function renderWithVuetify (component, options) {
    const vuetify = createVuetify()
    return render(component, {
        ...options,
        global: {
            plugins: [vuetify]
        },
    })
}

test('mount component', async () => {
  expect(Hello).toBeTruthy()

  const wrapper = renderWithVuetify(Hello, {
    props: {
      count: 4,
    },
  })

  expect(wrapper.queryByText('4 x 2 = 8')).toBeTruthy()
  expect(wrapper.html()).toMatchSnapshot()

  const button = wrapper.queryByText('x1')!

  await fireEvent.click(button)

  expect(wrapper.queryByText('4 x 3 = 12')).toBeTruthy()

  await fireEvent.click(button)

  expect(wrapper.queryByText('4 x 4 = 16')).toBeTruthy()
})
```

  </v-window-item>
  <v-window-item value="test-utils">

```ts { data-resource="Hello.spec.ts" }
import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'
import { createVuetify } from 'vuetify'
import Hello from './Hello.vue'

function mountWithVuetify (component, options) {
    const vuetify = createVuetify()
    return mount(component, {
        ...options,
        global: {
            plugins: [vuetify]
        },
    })
}

test('mount component', async () => {
  expect(Hello).toBeTruthy()

  const wrapper = mountWithVuetify(Hello, {
    props: {
      count: 4,
    },
  })

  expect(wrapper.text()).toContain('4 x 2 = 8')
  expect(wrapper.html()).toMatchSnapshot()

  await wrapper.get('.v-btn').trigger('click')

  expect(wrapper.text()).toContain('4 x 3 = 12')

  await wrapper.get('.v-btn').trigger('click')

  expect(wrapper.text()).toContain('4 x 4 = 16')
})
```

  </v-window-item>
</v-window>





