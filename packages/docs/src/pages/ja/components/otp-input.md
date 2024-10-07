---
meta:
  title: OTP インプット・コンポーネント
  description: OTPインプットコンポーネントは入力フィールドを介したMFA認証に使用されます。
  keywords: OTP, MFA, vuetify OTP input component, vue OTP component
related:
  - /components/inputs/
  - /components/text-fields/
  - /components/forms/
---

# OTP Input

OTP input は、ワンタイムパスワードでユーザーを認証するMFA手順に使用されます。

<entry-ad />

## 使い方

以下はアプリケーション内で適用できる設定の一覧です。

<usage name="v-otp-input" />

## API

- [v-otp-input](/api/v-otp-input)

## サンプル

### Props

#### ダークテーマ

ダークテーマが適用されています。そして値を埋めることでボタンコンポーネントに影響を及ぼすようにされています。

<example file="v-otp-input/prop-dark" />

#### 終了イベント

OPT inputの挿入完了時に処理を行うローダーを簡単に構成することができます。

<example file="v-otp-input/misc-loading" />

#### 非表示の入力

入力された値は`type="password"` で隠すことができます。

<example file="v-otp-input/prop-type" />

<backmatter />
