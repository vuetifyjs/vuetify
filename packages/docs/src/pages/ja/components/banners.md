---
meta:
  title: バナー・コンポーネント
  description: バナーコンポーネントは、ユーザーが対処するための重要で簡潔なメッセージを表示します。 また、ユーザーが取るべきアクションを提供することもできます。
  keywords: banners, vuetify banner component, vue banner component
related:
  - /components/alerts/
  - /components/icons/
  - /components/snackbars/
---

# Banners

`v-banner` コンポーネントは、ユーザーに対する中間の割り込みメッセージとして使用できます。ユーザーに1〜2つ、アクションを尋ねることができます。 **single-line** と暗黙的な **multi-line** の2つのバリエーションがあります。 いずれも、メッセージやアクションとともにアイコンを使用できます。

<entry-ad />

## 使い方

バナーには、1〜2行のテキストと、アクションおよびアイコンを含めることができます。

<usage name="v-banner" />

## API

- [v-banner](/api/v-banner)

<inline-api page="components/banners" />

## サンプル

### Props

#### Single line

**single-line** の v-banner は、少量の情報表示に使用します。**デスクトップ**向けの実装にのみ推奨されます。 オプションで **sticky** prop を指定することができます。これを指定すると、バナーのコンテンツがスクリーンに固定されます (注意: IE11 では動作しません)。 詳しくは、[sticky positioning](https://developer.mozilla.org/ja/docs/Web/CSS/position) を参照してください。

<example file="v-banner/prop-single-line" />

### イベント

#### アイコンをクリックしたとき

v-banner では、アイコンをクリックすると `click:icon` イベントが発生します。これはカスタムのアイコンスロットがある場合でも発生します。

<example file="v-banner/event-icon-click" />

### Slots

#### Actions

`actions` スロットには `dismiss` 機能があり、スコープ内でバナーを簡単に閉じることができます。

<example file="v-banner/slot-actions" />

#### Icon

アイコンスロットを使用すると、バナー内のコンテンツや機能を明示的にコントロールすることができます。

<example file="v-banner/slot-icon" />

### その他

#### Two line

**two-line** の v-banner には、より長いデータを収めることができます。メッセージが長い場合に使用します。 **モバイル**向けの実装で推奨されます。

<example file="v-banner/misc-two-line" />

<backmatter />
