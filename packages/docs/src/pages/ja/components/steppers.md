---
meta:
  title: ステッパー・コンポーネント
  description: ステッパーコンポーネントは、フォームウィザードと同様に、ユーザーに情報を収集して表示するための直線的な進行プロセスを提供します。
  keywords: steppers, vuetify stepper component, vue stepper component
related:
  - /components/tabs/
  - /components/buttons/
  - /components/windows/
---

# Steppers

`v-stepper` コンポーネントは、番号付きでステップの進行状況を表示します。

<entry-ad />

## 使い方

ステッパーは、ショッピングカート、新規レコードの作成など、さまざまなシナリオに使用できます

<example file="v-stepper/usage" />

## API

- [v-stepper](/api/v-stepper)
- [v-stepper-content](/api/v-stepper-content)
- [v-stepper-header](/api/v-stepper-header)
- [v-stepper-items](/api/v-stepper-items)
- [v-stepper-step](/api/v-stepper-step)

<inline-api page="components/steppers" />


<!-- ## Sub-components

### v-stepper-content

v-stepper-content description

### v-stepper-header

v-stepper-header description

### v-stepper-items

v-stepper-header description

### v-stepper-step

v-stepper-step description -->

## サンプル

### Props

#### Alternate label（代替ライベル）

ステッパーには、ステップの下にタイトルを配置する別のラベルスタイルもあります。

<example file="v-stepper/prop-alternate-label" />

#### Non linear（非線形）

ノンリニアステッパーにより、順不同でプロセスを移動できます。

<example file="v-stepper/prop-non-linear" />

#### Vertical

垂直ステッパーは、Y軸に沿って移動し、水平の場合とまったく同じように動作します。

<example file="v-stepper/prop-vertical" />

### その他

#### エラー状態の代替ラベル

エラー状態は、代替ラベルスタイルにも適用することができます。

<example file="v-stepper/misc-alternate-error" />

#### 動的なステップ

ステッパーはステップを動的に追加したり削除したりすることができます。 現在アクティブなステップが削除された場合は、適用されるモデルを変更してください。

<example file="v-stepper/misc-dynamic" />

#### Editable steps（編集可能なステップ）

編集可能なステップは、ユーザーがいつでも選択でき、それらのステップにナビゲートします。

<example file="v-stepper/misc-editable" />

#### エラー

エラー状態を表示して、実行する必要のあるアクションをユーザーに通知できます。

<example file="v-stepper/misc-error" />

#### 水平ステッパー

水平ステッパーは、定義されたステップをX軸に沿って移動します。

<example file="v-stepper/misc-horizontal" />

#### Linear steppers（線形ステッパー）

リニアステッパーは、常に一方通行で移動します。

<example file="v-stepper/misc-linear" />

#### 編集不可能なステップ

編集不可能なステップでは、ユーザーはプロセスを一本道で処理する必要があります。

<example file="v-stepper/misc-non-editable" />

#### Optional steps

オプションのステップはサブテキストで呼び出すことができます。

<example file="v-stepper/misc-optional" />

#### Vertical errors（縦型のエラー）

縦型ステッパーも同様の状態になります。

<example file="v-stepper/misc-vertical-error" />

<backmatter />
