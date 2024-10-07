---
meta:
  title: メニュー・コンポーネント
  description: menuコンポーネントは、選択またはアクションのドロップダウンを表示します。
  keywords: menus, vuetify menu component, vue menu component
related:
  - /components/dialog/
  - /components/tooltips/
  - /styles/transitions/
---

# Menus

`v-menu` コンポーネントは、アクティベート要素の位置にメニューを表示します。

<entry-ad />

## 使い方

メニューを有効にする要素を `activator` スロットに入れてください。

<example file="v-menu/usage" />

## API

- [v-menu](/api/v-menu)

<inline-api page="components/menus" />

## サンプル

### Props

#### Absolute

メニューは **absolute** プロパティを使用してアクティベーター要素の上に絶対的に配置することもできます。 画像上の任意の場所をクリックしてみてください。

<example file="v-menu/prop-absolute" />

#### アクティベーター無しのabsolute

メニューは **absolute** と **position-x** や **position-y** プロパティを併用することで、アクティベーターなしでも使用できます。 画像上の任意の場所を右クリックしてみてください。

<example file="v-menu/prop-absolute-without-activator" />

#### クリックで閉じる

フォーカスが失ったときメニューを閉じることができます。

<example file="v-menu/prop-close-on-click" />

#### コンテンツクリック時に閉じる

コンテンツがクリックされた時に`v-menu`を閉じるかどうか設定することができます。

<example file="v-menu/prop-close-on-content-click" />

#### Disabled

メニューを無効にすることができます。 無効化されたメニューを開くことはできません。

<example file="v-menu/prop-disabled" />

#### Offset x

メニューをX軸でオフセットして、アクティベータを隠さないようにすることができます。

<example file="v-menu/prop-offset-x" />

#### Offset y

メニューをY軸でオフセットして、アクティベータを隠さないようにすることができます。

<example file="v-menu/prop-offset-y" />

#### Open on hover

メニューは、 **open-on-hover** プロパティで、クリックする代わりにホバーすることでアクセスできます。

<example file="v-menu/prop-open-on-hover" />

#### Rounded

メニューは **rounded** プロパティで border-radius を設定できます。 rounded クラスの詳細については、 [Border Radius](/styles/border-radius) ページを参照してください。

<example file="v-menu/prop-rounded" />

### Slots

#### アクティベーターとツールチップ

新しい`v-slot`構文では、ネストされたアクティベーター、例えば`v-menu`と`v-tooltip`が同じアクティベーターボタンに適用されているものが正しく機能するためには特定の設定が必要です。 **注：同じ構文が `v-dialog` w/`v-tooltip` のような他のネストされたアクティベータにも使われています。**

<example file="v-menu/slot-activator-and-tooltip" />

### その他

#### カスタムトランジション

Vuetifyには、 **scale**、 **slide-x** 、 **slide-y** の3つの標準トランジションが付属しています。 独自のトランジションを作成し、 transition引数として渡すこともできます。 For an example of how the stock transitions are constructed, visit [here](https://github.com/vuetifyjs/vuetify/blob/v2-stable/packages/vuetify/src/util/helpers.ts).

<example file="v-menu/misc-custom-transition" />

#### Popover メニュー

メニューを開いたときに静的になるように構成して、ポップオーバーとして機能させることができます。 メニュー内に複数のインタラクティブな項目がある場合に便利です。

<example file="v-menu/misc-popover" />

#### コンポーネントでの使用

メニューはほぼすべてのコンポーネント内に配置できます。

<example file="v-menu/misc-use-in-components" />

## アクセシビリティ

デフォルトでは、 `v-menu` コンポーネントは切り離されて（_detached_）、アプリケーションのルートに移動されます。 [動的コンテンツのDOMへの挿入](https://www.w3.org/WAI/WCAG21/Techniques/client-side-script/SCR26)を適切にサポートするには、**attach** propを使用する_必要_があります。 これにより、 <kbd>tab</kbd> キーを押すと、アクティベーターからコンテンツにフォーカスが転送されます。

<backmatter />
