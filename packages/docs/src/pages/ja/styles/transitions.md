---
meta:
  title: Transitions
  description: Vuetifyに内蔵されたCSSとJavascriptのトランジションをコンポーネント内で利用します。
  keywords: motion, transitions, vuetify transitions
related:
  - /components/menus/
  - /styles/colors/
  - /components/expansion-panels/
---

# Transitions

スムーズなアニメーションはUIを素晴らしくするのに役立ちます。 Vue のトランジションシステムと再利用可能な関数型コンポーネントを使用すると、アプリケーションの動きを簡単に制御できます。 ほとんどのコンポーネントは、トランジション **transition** プロパティを介してトランジションを変更することができます。

<entry-ad />

## 使い方

Vuetifyには10を超えるカスタムcssアニメーションが付属しており、多数のコンポーネントまたは独自のカスタムユースケースに適用できます。

<example file="transitions/usage" />

## API

- [v-fab-transition](/api/v-fab-transition)
- [v-fade-transition](/api/v-fade-transition)
- [v-expand-transition](/api/v-expand-transition)
- [v-scale-transition](/api/v-scale-transition)
- [v-scroll-x-transition](/api/v-scroll-x-transition)
- [v-scroll-x-reverse-transition](/api/v-scroll-x-reverse-transition)
- [v-scroll-y-transition](/api/v-scroll-y-transition)
- [v-scroll-y-reverse-transition](/api/v-scroll-y-reverse-transition)
- [v-slide-x-transition](/api/v-slide-x-transition)
- [v-slide-x-reverse-transition](/api/v-slide-x-reverse-transition)
- [v-slide-y-transition](/api/v-slide-y-transition)
- [v-slide-y-reverse-transition](/api/v-slide-y-reverse-transition)

<inline-api page="styles/transitions" />

## サンプル

### Props

#### カスタムOrigin

シンプルなプロパティでトランジションのoriginを制御することができます。

<example file="transitions/prop-custom-origin" />

### その他

#### Expand x

expandトランジションは、Expansion Panelやリストグループで使用されます。 `v-expand-x-transition` で利用できる水平バージョンもあります。

<example file="transitions/misc-expand-x" />

#### Fab

FABトランジションの例は、`v-speed-dial` コンポーネントにあります。

<example file="transitions/misc-fab" />

#### Fade

Fadeトランジションの例はCarouselで見ることができます。

<example file="transitions/misc-fade" />

#### Scale

Vuetifyのコンポーネントの多くには、 **transition** プロパティが含まれており、独自のプロパティを指定することができます。

<example file="transitions/misc-scale" />

#### Scroll x

Scroll X トランジションは、水平方向に移動します。

<example file="transitions/misc-scroll-x" />

#### Scroll y

Scroll Y トランジションは、垂直方向に移動します。

<example file="transitions/misc-scroll-y" />

#### Slide x

Slide x transitionは水平方向に移動します。

<example file="transitions/misc-slide-x" />

#### Slide y

アニメーションはアプリケーションの`$primary-transition`を利用します。

<example file="transitions/misc-slide-y" />

#### Todo リスト

複数のトランジションを使用すれば、簡単にToDoリストを作成することができます！

<example file="transitions/misc-todo" />

## 独自のトランジションを作成する

Vuetifyのトランジションヘルパー機能を使用すると、独自のカスタムトランジションを簡単に作成できます。 この関数は、Vue にインポートできるオブジェクトを返します。 Vue の [関数型コンポーネント](https://jp.vuejs.org/v2/guide/render-function.html#%E9%96%A2%E6%95%B0%E5%9E%8B%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88) オプションを使用すると、可能な限り効率的にトランジションを行うことができます。 関数をインポートするだけです:

```js
import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'

const myTransition = createSimpleTransition('my-transition')

Vue.component('my-transition', myTransition)
```

**createSimpleTransition** 関数の引数1つで、name を受け取ります。 これは、定義するスタイルでフックできる名前になります。 以下は、 `v-fade-transition` がどのように見えるかの例です。

```stylus
.fade-transition
  &-leave-active
    position: absolute

  &-enter-active, &-leave, &-leave-to
    transition: $primary-transition

  &-enter, &-leave-to
    opacity: 0
```

<backmatter />
