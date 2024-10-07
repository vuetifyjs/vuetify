---
meta:
  title: Range Slider component
  description: 範囲スライダーコンポーネントは、数値入力をより良く視覚化します。 様々な数値データを収集するために使用されます。
  keywords: sliders, range, vuetify slider component, vuetify range slider component, vue slider component
related:
  - /components/forms/
  - /components/selects/
  - /components/sliders/
---

# Range Sliders

`v-slider` コンポーネントは数値入力の可視化を向上させます。 数値データを収集するために使用します。

<entry-ad />

## 使い方

バーに沿って値の範囲を反映し、そこから単一の値を選択できます。 音量、明るさ、画像フィルタの適用などの設定を調整するのに最適です。

<usage name="v-range-slider" />

## API

- [v-range-slider](/api/v-range-slider)
- [v-slider](/api/v-slider)

<inline-api page="components/range-sliders" />

## サンプル

### Props

#### Disabled

**disabled**(無効化)設定されたスライダーの操作はできません。

<example file="v-range-slider/prop-disabled" />

#### min と max

**min** と **max** の値を設定できます。

<example file="v-range-slider/prop-min-and-max" />

#### Step

`v-range-slider` は1以外のステップを持つことができます。 これは、値を調整する必要がある一部のアプリケーションで役立ちます。

<example file="v-range-slider/prop-step" />

#### 垂直スライダー

**vertical** propを使用して、スライダーを垂直方向に切り替えることができます。 スライダーの高さを変更する必要がある場合は、css を使用します。

<example file="v-range-slider/prop-vertical" />

### Slots

#### Thumb label

**tick-labels** propと`thumb-label`slotを使用すると、非常にカスタマイズされたソリューションを作成できます。

<example file="v-range-slider/slot-thumb-label" />

<backmatter />
