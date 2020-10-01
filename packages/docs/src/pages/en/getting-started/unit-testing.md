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

Unit tests are an important (and sometimes ignored) part of developing applications. They help us secure our processes and workflows, ensuring that the most critical parts of our projects are protected from accidental mistakes or oversights in our development. Because of this, Vue has its own testing utility called [vue-test-utils](https://vue-test-utils.vuejs.org/). It provides useful features for interacting with Vue components and works with many popular test runners.

<entry-ad />

<alert type="warning">

  Vuetify utilizes Typescript and currently must import and extend the Vue object. This has the potential in some applications to generate a warning "$attrs is readonly" or "$listeners is readonly". There is currently an ongoing [Github discussion](https://github.com/vuetifyjs/vuetify/issues/4068) with potential work-arounds in a variety of use-cases. If you have additional questions please join us in our [online community](https://community.vuetifyjs.com)

</alert>

## Test runners

Information on how to setup a test runner with Vue CLI can be found on the [official documentation](https://vue-test-utils.vuejs.org/guides/getting-started.html). At a glance, Vue CLI has getting started repositories for the following test runners:

- [Jest](https://cli.vuejs.org/core-plugins/unit-jest.html)
- [Mocha](https://cli.vuejs.org/core-plugins/unit-mocha.html)
- [tape](https://github.com/eddyerburgh/vue-test-utils-tape-example)
- [AVA](https://github.com/eddyerburgh/vue-test-utils-ava-example)

## Bootstrapping Vuetify

In order to properly utilize Typescript, Vuetify components extend the Vue object. This has the potential to [cause issues](https://github.com/vuetifyjs/vuetify/issues/4068) as noted in the above alert. Instead of using a [localVue instance](https://vue-test-utils.vuejs.org/api/options.html#localvue) we must instead install Vuetify globally in the unit tests setup file.
This can vary between test runners. Make sure to reference the appropriate documentation on setup files.

```js
// tests/setup.js

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
```

<alert type="info">

  If you are not using a `setup.js` file, you should add `Vue.use(Vuetify)` in the utilities section of your test.

</alert>

## Spec Tests

Creating unit tests in Vuetify are similar to **vuex** and **vue-router** in that you will use the Vuetify object in a **localVue** instance and pass an instance to the mount functions options. The difference is that **Vuetify** won't be used by the localVue instance.

```js
// Imports
import AppBtn from '../AppBtn.vue'
import Vuetify from 'vuetify'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

describe('AppBtn.vue', () => {
  const localVue = createLocalVue()

  // DO NOT use Vuetify on the localInstance
  // This is bootstrapped in the jest setup
  // file located in ./tests/setup.js
  //
  // localVue.use(Vuetify)

  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('should work', () => {
    //
  })
})

```

<alert type="info">

  In order to have proper **TypeScript** support, Vuetify has to extend the main _Vue_ object. This extension causes issues with Vuetify and multiple Vue instances when it comes to externalization. This caveat will not apply in **Vuetify 3**.

</alert>

Let's create an example test use-case that we might find in our application.

```html
<!-- Vue Component -->

<template>
  <v-card>
    <v-card-title>
      <span v-text="title"></span>

      <v-spacer></v-spacer>

      <v-btn @click="$emit('action-btn:clicked')">
        Action
      </v-btn>
    </v-card-title>

    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  }
</script>
```

In the example above we have created a custom component with a **title** prop and a `v-btn` that emits a custom event when clicked. We now want to create tests that ensure this behavior works correctly and continues to do so through future changes. The below examples are created with with the [Jest](https://jestjs.io/) test runner.

```js
// test/CustomCard.spec.js

// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Components
import CustomCard from '@/components/CustomCard'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

describe('CustomCard.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('should have a custom title and match snapshot', () => {
    const wrapper = mount(CustomCard, {
      localVue,
      vuetify,
      propsData: { title: 'Foobar' },
    })

    // With jest we can create snapshot files of the HTML output
    expect(wrapper.html()).toMatchSnapshot()

    // We could also verify this differently
    // by checking the text content
    const title = wrapper.find('.v-card__title > span')

    expect(title.text()).toBe('Foobar')
  })

  it('should emit an event when the action v-btn is clicked', () => {
    const wrapper = mount(CustomCard, {
      localVue,
      vuetify,
      propsData: { title: 'Foobar' },
    })

    const event = jest.fn()
    const button = wrapper.find('.v-btn')

    // Here we bind a listener to the wrapper
    // instance to catch our custom event
    // https://vuejs.org/v2/api/#Instance-Methods-Events
    wrapper.vm.$on('action-btn:clicked', event)

    expect(event).toHaveBeenCalledTimes(0)

    // Simulate a click on the button
    button.trigger('click')

    // Ensure that our mock event was called
    expect(event).toHaveBeenCalledTimes(1)
  })
})
```

<alert type="info">

  If you are stuck and have additional questions about testing or need help in general, please join us in our [online community](https://community.vuetifyjs.com).

</alert>

### Testing efficiency

When writing tests you will often find yourself repeating the same things over and over. In this case, it's beneficial to create helper functions to reduce the duplication for each individual test. Basically, [DRYing](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) up our code.

One of the most common duplicated code written in unit tests are the mount functions. This can easily be compacted into a reusable function for each run.

```js
// test/CustomCard.spec.js

describe('CustomCard.vue', () => {
  const localVue = createLocalVue()
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountFunction = options => {
    return mount(CustomCard, {
      localVue,
      vuetify,
      ...options,
    })
  }

  it('should have a custom title and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: { title: 'Fizzbuzz' },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

### Mocking Vuetify

Many of Vuetify's components utilize the global `$vuetify` object to derive settings such as default text or breakpoint information. When testing these components, you will need to provide `vue-test-utils` with a mock object.

```js
// test/CustomAlert.spec.js

// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Components
import CustomAlert from '@/components/CustomAlert'

// Utilities
import { createLocalVue, mount } from '@vue/test-utils'

const localVue = createLocalVue()

describe('CustomAlert.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = {
      mocks: {
        $vuetify: {
          lang: {
            t: (val: string) => val,
          },
        },
      }
    }
  })

  it('should have a custom title and match snapshot', () => {
    const wrapper = mount(CustomAlert, {
      localVue,
      vuetify,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

Keep in mind, you **only need to stub** the services that are being used. such as **lang** or **application**. You can also import these services manually.

```js
// test/CustomNavigationDrawer.spec.js

// Libraries
import Vue from 'vue'
import Vuetify from 'vuetify'

// Components
import CustomNavigationDrawer from '@/components/CustomNavigationDrawer'

// Utilities
import {
  createLocalVue,
  mount,
} from '@vue/test-utils'

const localVue = createLocalVue()

describe('CustomNavigationDrawer.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  it('should have a custom title and match snapshot', () => {
    const wrapper = mount(CustomNavigationDrawer, {
      localVue,
      vuetify,
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

A complete list of all services available are listed below:

- [application](https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/services/application)
- [breakpoint](https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/services/breakpoint)
- [goto](https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/services/goto)
- [icons](https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/services/icons)
- [lang](https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/services/lang)
- [theme](https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/services/theme)

## E2E tests

Vuetify passes the `data-*` attributes from components to the relevant HTML elements, which allows E2E test framework to locate them easily.

For example, [Cypress](https://docs.cypress.io/guides/references/best-practices.html#How-It-Works) recommends to add `data-cy` attributes to make it easy to target elements.

```html
<template>
  <!-- Vuetify component with data-cy -->
  <v-text-field v-model="name" data-cy="name-input" />

  <!-- HTML render output -->
  <input data-cy="name-input" id="input-120" type="text">
</template>
```

```js
// cypress/integration/test.spec.js

describe('Test With Attribute', () => {
  it('Find by data-cy', () => {
    cy.visit('/')
    cy.get('[data-cy=name-input]').type('Zak')  // Find element using data-cy
  })
})
```

<backmatter />
