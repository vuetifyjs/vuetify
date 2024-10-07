---
meta:
  title: ウィンドウ・コンポーネント
  description: window コンポーネントは、コンテンツ間の遷移を可能にするラッパーコンテナです。 タブとカルーセルのベースラインとして機能します。
  keywords: windows, vuetify window component, vue window component
  related:
    - /components/caroussels
    - /components/steppers
    - /components/tabs
---

# Windows

`v-window` コンポーネントは、コンテンツを 1 つのペインから別のペインに移行するためのベースライン機能を提供します。 `v-tabs`, `v-carousel`, `v-stepper` などのコンポーネントは、コアでこのコンポーネントを利用しています。

<entry-ad />

## 使い方

コンテンツを簡単に切り替えるように設計された`v-window`は、真にカスタムな実装を作成するためのシンプルなインターフェイスを提供します。

<example file="v-window/usage" />

## API

- [v-window](/api/v-window)
- [v-window-item](/api/v-window-item)

<inline-api page="components/windows" />


<!-- ## Sub-components

### v-window-item

v-window-item description -->

## サンプル

コンテンツを簡単に切り替えるように設計された`v-window`は、真にカスタムな実装を作成するためのシンプルなインターフェイスを提供します。

### Props

#### Reverse

Reverse `v-window` は常にトランジションの方向が逆になります。

<example file="v-window/prop-reverse" />

#### Vertical

`v-window` は縦向きにすることができます。 Vertical windowsにはX軸のトランジションの代わりにY軸のトランジションがあります。

<example file="v-window/prop-vertical" />

#### 矢印のカスタマイズ

矢印は **prev** と **next** スロットを使用してカスタマイズできます。

<example file="v-window/slots-next-prev" />

### その他

#### アカウント作成

スムーズなアニメーションでリッチなフォームを作成できます。 `v-window` は現在選択中のインデックスを自動で追跡し、遷移する方向を自動で変更します。 これは**reverse** prop を使って手動で制御することもできます。

<example file="v-window/misc-account-creation" />

#### オンボーディング

`v-window` により、異なるスタイルのステッパーなどのカスタムコンポーネントを簡単に作成できます。

<example file="v-window/misc-onboarding" />

<backmatter />
