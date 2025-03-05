---
meta:
  title: Unit testing
  description: Learn how to create unit tests with vue-test-utils and Vuetify components in your Vue application.
  keywords: unit testing vuetify, testing vuetify, vuetify spec tests
related:
  - /getting-started/frequently-asked-questions/
  - /getting-started/contributing/
  - /components/text-fields/
---

# Unit Testing

Add regression protection by adding unit tests to your Vuetify application

<PageFeatures />

<PromotedEntry />

## Usage

Unit tests are an important (and sometimes ignored) part of developing applications. They help us secure our processes and workflows, ensuring that the most critical parts of our projects are protected from accidental mistakes or oversights in our development.

Because of this, Vue has its own testing utility called [vue-test-utils](https://test-utils.vuejs.org/). It provides useful features for interacting with Vue components and works with many popular test runners.

## Using Vite

[Vite](https://vitejs.dev/) is a fast, opinionated frontend build tool that serves your code via native ES Module imports during dev and bundles it with Rollup for production. It provides a great developer experience and is the recommended build tool for Vuetify applications.

First, update your **vite.config.js** file to inline the `vuetify` dependency:

```js { resource="vite.config.js" }
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
  },
})
```

### Setup Vitest

[Vitest](https://vitest.dev/) is a popular test runner that provides a great developer experience. It is fast, easy to use, and provides useful features like snapshot testing. To get started, install the following dependencies:

::: tabs

```bash [pnpm]
pnpm add @vue/test-utils vitest resize-observer-polyfill --save-dev
```

```bash [yarn]
yarn add @vue/test-utils vitest resize-observer-polyfill --dev
```

```bash [npm]
npm install @vue/test-utils vitest resize-observer-polyfill --save-dev
```

```bash [bun]
bun add @vue/test-utils vitest resize-observer-polyfill --dev
```

:::

Once installed, create a new folder at the root of your application named **tests/spec** and add a new file named **HelloWorld.spec.js**. The following example shows how to setup a basic unit test for a Vuetify component:

```js { resource="tests/spec/HelloWorld.spec.js" }
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import HelloWorld from '../../src/components/HelloWorld.vue'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

test('displays message', () => {
  const wrapper = mount({
    template: '<v-layout><hello-world></hello-world></v-layout>'
  }, {
    props: {},
    global: {
      components: {
        HelloWorld,
      },
      plugins: [vuetify],
    }
  })

  // Assert the rendered text of the component
  expect(wrapper.text()).toContain('Components')
})
```
