---
meta:
  title: 单元测试
  description: 学习如何在您的 Vue 应用程序中使用 vue-test-utils 和 Vuetify 组件创建单元测试。
  keywords: vuetify 单元测试，vuetify 测试，vuetify 测试标准
related:
  - /getting-started/frequently-asked-questions/
  - /getting-started/contributing/
  - /components/text-fields/
---

# 单元测试

单元测试是开发应用程序的一个重要部分（有时被忽略）。 它们帮助我们确保我们的进程和工作流程。 确保我们项目的最关键部分免受我们开发过程中的意外错误或疏忽。 因此，Vue 有自己的测试工具，名为 [vue-test-utils](https://vue-test-utils.vuejs.org/)。 它提供了与Vue组件互动的有用功能，并且与许多受欢迎的测试运行器合作。

<entry-ad />

<alert type="warning">

  Vuetify 使用Typescript，当前必须导入并扩展Vue 对象。 这在某些应用程序中有可能生成警告"$attrs" 是只读的, 或者"$listeners" 是只读的。 There is currently an ongoing [GitHub discussion](https://github.com/vuetifyjs/vuetify/issues/4068) with potential work-arounds in a variety of use-cases. 如果您有其他问题，请加入我们的[在线社区](https://community.vuetifyjs.com)

</alert>

## 测试运行程序

有关如何使用Vue CLI设置测试运行程序的信息，请访问<a href=“https://vue-test-utils.vuejs.org/guides/getting-started.html“>官方文件</a>。 简而言之，Vue CLI为以下测试运行程序提供了入门仓库：

- [Jest](https://cli.vuejs.org/core-plugins/unit-jest.html)
- [Mocha](https://cli.vuejs.org/core-plugins/unit-mocha.html)
- [tape](https://github.com/eddyerburgh/vue-test-utils-tape-example)
- [AVA](https://github.com/eddyerburgh/vue-test-utils-ava-example)

## 引导 Vuetify

为了正确使用 Typescript，Vuetify组件扩展Vue 对象。 这有可能导致如上述警报所述的 [潜在问题](https://github.com/vuetifyjs/vuetify/issues/4068) 。 不要使用 [localVue 实例](https://vue-test-utils.vuejs.org/api/options.html#localvue) ，我们必须在设备测试设置文件中全局安装 Vuetify 。 这可能因不同的测试运行程序而异。 请确保在设置文件时参考适当的文档。

```js
// tests/setup.js

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
```

<alert type="info">

  如果您没有使用 `setup.js` 文件，则应在测试的程序部分中添加 `Vue.use(Vuetify)` 。

</alert>

## 规范测试

Creating unit tests in Vuetify is similar to **vuex** and **vue-router** in that you will use the Vuetify object in a **localVue** instance and pass an instance to the mount functions options. 区别是 **Vuetify** 不会被localVue 实例所使用。

```js
// Imports
import AppBtn from '../AppBtn.vue'
import Vuetify from 'vuetify'

// Utilities
import { createLocalVue } from '@vue/test-utils'

describe('AppBtn.vue', () => {
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

  为了获得正确的 **TypeScript** 支持，Vuetify 必须扩展 _Vue_ 对象. 当涉及外部化时，此扩展会导致Vuetify和多个Vue实例出现问题。 此警告不适用于 **Vuetify 3**。

</alert>

让我们创建一个在应用程序中的测试用例示例。

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

在上面的示例中，我们创建了一个自定义组件，其中有 **title** prop 和 `v-btn` 组件, 当点击组件时发出了自定义事件。 我们现在希望创建测试，以确保此行为正确工作，并在将来的更改中继续这样做。 下面的示例是用<a href=“https://jestjs.io/“>Jest</a>创建的测试运行程序。

```js
// test/CustomCard.spec.js

// 库
import Vuetify from 'vuetify'

// 组件
import CustomCard from '@/components/CustomCard'

// 工具
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

    // 使用jest，我们可以创建HTML输出的快照文件
    expect(wrapper.html()).toMatchSnapshot()

    // 我们也可以校验区别
    // 通过检查文字内容
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

    // 在这里，我们绑定一个监听器到包装器实例上
    // 以捕获我们的自定义事件
    // https://vuejs.org/v2/api/#Instance-Methods-Events
    wrapper.vm.$on('action-btn:clicked', event)

    expect(event).toHaveBeenCalledTimes(0)

    // 模拟按钮点击事件
    button.trigger('click')

    // 确保我们的模拟事件被调用了
    expect(event).toHaveBeenCalledTimes(1)
  })
})
```

<alert type="info">

  如果你遇到有关测试或者一般问题并且需要帮助，请访问我们的 [在线社区](https://community.vuetifyjs.com)。

</alert>

### 测试效率

在写测试时，您常常发现自己重复同样的内容。 在这种情况下，创建辅助功能对减少每项测试的重复是有益的。 基本上， [DRYing](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) 提升我们的代码。

设备测试中最常见的重复代码之一是挂载功能。 这可以很容易地压缩为每次运行的可重用函数。

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

<vuetify-ad slug="material-dashboard-pro" />

### 模拟 Vuetify

许多Vuetify组件利用全局`$vuetify`对象来派生设置，例如默认文本或断点信息。 测试这些组件时，您需要提供 `vue-test-utils` 模拟对象。

```js
// test/CustomAlert.spec.js

// Libraries
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

请记住，您 **只需要满足** 正在使用的服务。 例如 **lang** 或 ** application **。 您也可以手动导入这些服务。

```js
// test/CustomNavigationDrawer.spec.js

// Libraries
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

所有可用服务的完整列表如下：

- [应用程序](https://github.com/vuetifyjs/vuetify/tree/v2-stable/packages/vuetify/src/services/application)
- [断点](https://github.com/vuetifyjs/vuetify/tree/v2-stable/packages/vuetify/src/services/breakpoint)
- [跳转](https://github.com/vuetifyjs/vuetify/tree/v2-stable/packages/vuetify/src/services/goto)
- [图标](https://github.com/vuetifyjs/vuetify/tree/v2-stable/packages/vuetify/src/services/icons)
- [语言](https://github.com/vuetifyjs/vuetify/tree/v2-stable/packages/vuetify/src/services/lang)
- [主题](https://github.com/vuetifyjs/vuetify/tree/v2-stable/packages/vuetify/src/services/theme)

## E2E 测试

Vuetify将组件的 `data-*` 属性传递到相关的 HTML 元素，这使得E2E 测试框架能够轻松地定位它们。

例如， [ Cypress ](https://docs.cypress.io/guides/references/best-practices.html#How-It-Works) 建议添加 `data-cy` 属性以便更容易定位元素。

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

<promoted-ad type="theme" />

<backmatter />
