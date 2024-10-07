---
meta:
  title: ユニットテスト
  description: あなたのVueアプリケーション内でVuetifyコンポーネントとvue-test-utilsを使ってユニットテストを書く方法を学ぶ。
  keywords: unit testing vuetify, testing vuetify, vuetify spec tests
related:
  - /getting-started/frequently-asked-questions/
  - /getting-started/contributoring/
  - /components/text-fields/
---

# ユニットテスト

ユニットテストは、アプリケーション開発の重要な（そして時には無視される）部分です。 プロセスとワークフローを保護するのに役立ち、プロジェクトの最も重要な部分が、開発における偶発的なミスや見落としから確実に保護されます。 Vue には [vue-test-utils](https://vue-test-utils.vuejs.org/ja/) と呼ばれる独自のテストユーティリティがあります。 Vueコンポーネントとのやり取りに便利な機能を提供し、多くの一般的なテストランナーと連携します。

<entry-ad />

<alert type="warning">

  VuetifyはTypescriptを利用しており、現在Vueオブジェクトをimport およびextendする必要があります。 これは、一部のアプリケーションで "$attrs is readonly" or "$listeners is readonly" の警告を生成する可能性があります。 現在、さまざまなユースケースでの潜在的な回避策を含む [GitHubディスカッション](https://github.com/vuetifyjs/vuetify/issues/4068) が進行中です。 これ以外に質問がある場合は、[online community](https://community.vuetifyjs.com) に参加してください。

</alert>

## テスト ランナー

Vue CLI でテストランナーをセットアップする方法については、 [公式ドキュメント](https://vue-test-utils.vuejs.org/ja/guides/getting-started.html) を参照してください。 Vue CLIには以下のテストランナーのための getting started リポジトリがあります:

- [Jest](https://cli.vuejs.org/core-plugins/unit-jest.html)
- [Mocha](https://cli.vuejs.org/core-plugins/unit-mocha.html)
- [tape](https://github.com/eddyerburgh/vue-test-utils-tape-example)
- [AVA](https://github.com/eddyerburgh/vue-test-utils-ava-example)

## Vuetifyのブートストラップ

Typescriptを適切に利用するために、VuetifyコンポーネントはVueオブジェクトを拡張します。 これは、上記のアラートに記載されているように、[問題を引き起こす](https://github.com/vuetifyjs/vuetify/issues/4068)可能性があります。 [localVueインスタンス](https://vue-test-utils.vuejs.org/api/options.html#localvue) を使用する代わりに、ユニットテストのセットアップファイルに Vuetify をグローバルにインストールする必要があります。 これはテストランナーによって異なる場合があります。 セットアップファイルに関する適切なドキュメントを参照してください。

```js
// tests/setup.js

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
```

<alert type="info">

  `setup.js`ファイルを使用していない場合は、テストのユーティリティセクションに`Vue.use(Vuetify)`を追加してください。

</alert>

## Spec Tests

Creating unit tests in Vuetify is similar to **vuex** and **vue-router** in that you will use the Vuetify object in a **localVue** instance and pass an instance to the mount functions options. 違いは、 **Vuetify** が localVue インスタンスでは使用されないことです。

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

  適切な**TypeScript**をサポートするためには、Vuetifyはメインの _Vue_ オブジェクトを extend する必要があります。 この拡張機能は、Vuetifyや複数のVueインスタンスで外部化に関して問題を引き起こします。 この警告は **Vuetify 3** では適用されません。

</alert>

アプリケーションで見つかる可能性のあるサンプルテストユースケースを作成しましょう。

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

上の例では、 **title** prop と `v-btn` をクリックしたときにカスタムイベントを発生させるカスタムコンポーネントを作成しました。 この動作が正しく動作するようにテストを作成し、今後の変更を通じて継続的にテストを行いたいと考えています。 以下の例は [Jest](https://jestjs.io/ja/) のテストランナーで作成されています。

```js
// test/CustomCard.spec.js

// Libraries
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

  立ち往生していて、テストに関する追加の質問がある場合や一般的なサポートが必要な場合は、[オンラインコミュニティ](https://community.vuetifyjs.com) にご参加ください。

</alert>

### 効率的にテストする

テストを書く場合は、何度も何度も同じことを繰り返すことになります。 この場合、個々のテストの重複を減らすためのヘルパー関数を作成することが有益です。 基本的には、コードを [DRYing](https://ja.wikipedia.org/wiki/Don%27t_repeat_yourself) にします。

単体テストで書かれる最も一般的な重複コードの1つは、マウント機能です。 これは、実行ごとに簡単に再利用可能な機能に圧縮できます。

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

### Vuetify の Mocking

Vuetifyのコンポーネントの多くは、デフォルトテキストやブレークポイント情報などの設定を導出するためにグローバル `$vuetify` オブジェクトを使用しています。 これらのコンポーネントをテストする場合は、 `vue-test-utils` にモックオブジェクトを渡す必要があります。

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

使用されているサービス**だけをスタブ**する必要があることを覚えておいてください （**lang** や **application**のように）。 これらのサービスを手動でインポートすることもできます。

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

利用可能なサービスは以下のとおりです。

- [application](https://github.com/vuetifyjs/vuetify/tree/v2-stable/packages/vuetify/src/services/application)
- [breakpoint](https://github.com/vuetifyjs/vuetify/tree/v2-stable/packages/vuetify/src/services/breakpoint)
- [goto](https://github.com/vuetifyjs/vuetify/tree/v2-stable/packages/vuetify/src/services/goto)
- [icons](https://github.com/vuetifyjs/vuetify/tree/v2-stable/packages/vuetify/src/services/icons)
- [lang](https://github.com/vuetifyjs/vuetify/tree/v2-stable/packages/vuetify/src/services/lang)
- [theme](https://github.com/vuetifyjs/vuetify/tree/v2-stable/packages/vuetify/src/services/theme)

## E2E テスト

Vuetifyは、コンポーネントから関連するHTML要素に `data-*` 属性を渡します。これにより、E2Eテストフレームワークはそれらの要素を簡単に見つけることができます。

たとえば、[Cypress](https://docs.cypress.io/guides/references/best-practices.html#How-It-Works) は、要素を簡単にターゲティングできるようにするために `data-cy` 属性を追加することを推奨しています。

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
    cy.get('[data-cy=name-input]').type('Zak')  // data-cyを使った要素の検索
  })
})
```

<promoted-ad type="theme" />

<backmatter />
