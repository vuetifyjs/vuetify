---
meta:
  title: タブ・コンポーネント
  description: tabs コンポーネントは、同じ階層レベルで関連するコンテンツのグループ間を整理しナビゲートする方法を提供します。
  keywords: tabs, vuetify tabs component, vue tabs component
related:
  - /components/icons/
  - /components/toolbars/
  - /components/windows/
---

# Tabs

`v-tabs`コンポーネントは、選択可能なアイテムの背後にコンテンツを隠すために使用されます。 これは、タブがリンクであり、tab-items がコンテンツであるページの疑似ナビゲーションとしても使用できます。

<entry-ad />

## 使い方

`v-tabs` コンポーネントは [v-item-group](/components/item-groups) のスタイル付き拡張です。 コンテンツのグループを管理するための使いやすいインターフェイスを提供します。

<example file="v-tabs/usage" />

## API

- [v-tabs](/api/v-tabs)
- [v-tab](/api/v-tab)
- [v-tab-item](/api/v-tab-item)
- [v-tabs-items](/api/v-tabs-items)
- [v-tabs-slider](/api/v-tabs-slider)

<inline-api page="components/tabs" />


<!-- ## Sub-components

### v-tab

v-tab description

### v-tab-item

v-tab-item description

### v-tabs-items

v-tabs-items description

### v-tabs-slider

v-tabs-slider description -->

## 注意事項

<alert type="warning">

  **dark** propと **NOT** を使用してカスタム **color** を提供する場合、`v-tabs` コンポーネントはデフォルトで色を _white_ に設定します。

</alert>

<alert type="warning">

  必須入力フィールドを含む`v-tab-item`を使用する場合、まだ表示されていない必須フィールドを検証するために**eager** propを使用する必要があります。

</alert>

## サンプル

### Props

#### Align with title

**align-with-title** propを使用して、`v-tabs` を `v-toolbar-title` コンポーネントに並べます。 (`v-app-bar-nav-icon` または `v-btn` は `v-toolbar` で使用する必要があります)。

<example file="v-tabs/prop-align-with-title" />

#### Center active

**center-active** prop は、アクティブなタブを常に中央にします。

<example file="v-tabs/prop-center-active" />

#### カスタムアイコン

**prev-icon** と **next-icon** をカスタムペジネーションアイコンに適用できます。

<example file="v-tabs/prop-icons" />

#### Fixed tabs

The **fixed-tabs** prop forces `v-tab` to take up all available space up to the maximum width (300px).

<example file="v-tabs/prop-fixed-tabs" />

#### Grow

The **grow** prop will make the tab items take up all available space up to a maximum width of 300px.

<example file="v-tabs/prop-grow" />

#### アイコンとテキスト

Using **icons-and-text** prop increases the `v-tabs` height to 72px to allow for both icons as well as text to be used.

<example file="v-tabs/prop-icons-and-text" />

#### Pagination

タブ項目がコンテナにオーバーフローすると、デスクトップではページネーションコントロール表示されます。 モバイルデバイスでは、矢印は **show-arrows** プロパティでのみ表示されます。

<example file="v-tabs/misc-pagination" />

#### Right

The **right** prop aligns the tabs to the right.

<example file="v-tabs/prop-right" />

#### Vertical タブ

The **vertical** prop allows for `v-tab` components to stack vertically.

<example file="v-tabs/prop-vertical" />

### その他

#### Content

`v-toolbar` の **extension** スロットに `v-tabs` を入れるのが一般的です。 Using `v-toolbar`'s **tabs** prop auto adjusts its height to 48px to match `v-tabs`.

<example file="v-tabs/misc-content" />

#### デスクトップタブ

You can represent `v-tab` actions by using single icons. This is useful when it is easy to correlate content to each tab.

<example file="v-tabs/misc-desktop" />

#### 動的高さ

When changing your `v-tab-item`, the content area will smoothly scale to the new size.

<example file="v-tabs/misc-dynamic-height" />

#### 動的なタブ

タブを動的に追加および削除することができます。 This allows you to update to any number and the `v-tabs` component will react. この例では、新しいタブを追加すると、それに合わせてモデルも自動的に変更されます。 さらにタブを追加してコンテナからはみ出すと、選択されたアイテムが自動的にスクロールして表示されます。 Remove all `v-tab`s and the slider will disappear.

<example file="v-tabs/misc-dynamic" />

#### オーバーフローしたものはメニューに

メニューを使って追加のタブを保持し、その場で入れ替えることができます。

<example file="v-tabs/misc-overflow-to-menu" />

#### タブアイテム

The `v-tabs-items` component allows for you to customize the content per tab. Using a shared `v-model`, the `v-tabs-items` will sync with the currently selected `v-tab`.

<example file="v-tabs/misc-tab-items" />

<backmatter />
