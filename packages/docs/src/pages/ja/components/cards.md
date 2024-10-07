---
meta:
  title: カード・コンポーネント
  description: v-card コンポーネントは、パネルから静止画まであらゆるものに使用できる汎用性の高いコンポーネントです。
  keywords: cards, vuetify card component, vue card component, v-card
related:
  - /components/buttons/
  - /components/images/
  - /styles/text-and-typography/
---

# Cards

`v-card`コンポーネントは、パネルから静的画像まであらゆるものに使用できる汎用性の高いコンポーネントです。 **v-card** コンポーネントには、マークアップをできるだけ簡単にするためのヘルパー コンポーネントが多数用意されています。 オプションを持たないコンポーネントは、Vue の関数型コンポーネント オプションを使用した高速なレンダリングと、開発を容易にする手軽なマークアップ記法として機能します。 <inline-ad slug="scrimba-cards" />

<entry-ad />

## 使い方

v-card には `v-card-title`、`v-card-subtitle`、`v-card-text`、`v-card-actions`の 4 つの基本コンポーネントがあります。

<usage name="v-card" />

## API

- [v-card](/api/v-card)
- [v-card-actions](/api/v-card-actions)
- [v-card-subtitle](/api/v-card-subtitle)
- [v-card-text](/api/v-card-text)
- [v-card-title](/api/v-card-title)

<inline-api page="components/cards" />

## 関数型コンポーネント

<vuetify-ad slug="vs-video-functional-components" />

### v-card-actions

The container used for placing **actions** for a card, such as [v-btn](/components/buttons) or [v-menu](/components/menus). Also applies *special margin* to buttons so that they properly line up with other card content areas.

### v-card-subtitle

Provides a default **font-size** and **padding** for card subtitles. Font-size can be overwritten with [typography classes](/styles/typography).

### v-card-text

Primarily used for **text content** in a card. Applies padding for text, reduces its font-size to .875rem.

### v-card-title

Provides a default **font-size** and **padding** for card titles. Font-size can be overwritten with [typography classes](/styles/typography).

## サンプル

### Props

#### Loading

Cards can be set to a loading state when processing a user action. This disables further actions and provides visual feedback with an indeterminate [v-progress-linear](/components/progress-linear).

<example file="v-card/prop-loading" />

#### Outlined

An **outlined** card has 0 elevation and contains a soft border.

<example file="v-card/prop-outlined" />

### その他

#### カードを表示

Using [v-expand-transition](/api/v-expand-transition/) and a `@click` event you can have a card that reveals more information once the button is clicked, activating the hidden card to be revealed.

<example file="v-card/misc-card-reveal" />

#### ラッピングされたコンテンツ

The `v-card` component is useful for wrapping content.

<example file="v-card/misc-content-wrapping" />

#### カスタムアクション

With a simple conditional, you can easily add supplementary text that is hidden until opened.

<example file="v-card/misc-custom-actions" />

#### グリッド

Using grids, you can create beautiful layouts.

<example file="v-card/misc-grids" />

#### 水平型カード

Using `v-col`, you can create customized horizontal cards. Use the `contain` property to shrink the `v-img` to fit inside the container, instead of covering.

<example file="v-card/misc-horizontal-cards" />

#### インフォメーションカード

Cards are entry points to more detailed information. To keep things concise, ensure to limit the number of actions the user can take.

<example file="v-card/misc-information-card" />

#### テキスト付きメディア

Using the layout system, we can add custom text anywhere within the background.

<example file="v-card/misc-media-with-text" />

#### Twitterカード

The `v-card` component has multiple children components that help you build complex examples without having to worry about spacing. This example is comprised of the `v-card-title`, `v-card-text` and `v-card-actions` components.

<example file="v-card/misc-twitter-card" />

#### お天気カード

Using [v-list-items](/components/lists) and a [v-slider](/components/sliders), we are able to create a unique weather card. The list components ensure that we have consistent spacing and functionality while the slider component allows us to provide a useful interface of selection to the user.

<example file="v-card/misc-weather-card" />

<backmatter />
