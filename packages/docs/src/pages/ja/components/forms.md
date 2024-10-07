---
meta:
  title: フォーム・コンポーネント
  description: フォームコンポーネントは、入力コンポーネントの検証状態の処理と制御を容易にするラッパーを提供します。
  keywords: forms, vuetify form component, vue form component, form validation
related:
  - /components/selects/
  - /components/selection-controls/
  - /components/text-fields/
---

# Forms

フォームバリデーションに関して、Vuetifyには多くの統合機能と組み込み機能があります。 サードパーティの検証プラグインを使用したいですか？ すぐに [Vee-validate](https://github.com/baianat/Vee-validate)と[vuelidate](https://github.com/vuelidate/vuelidate)を使用することができます。

<promoted-ad slug="vuemastery-forms" />

## 使い方

`v-form` コンポーネントにより、入力フォームにバリデーションを簡単に追加できます。 すべての入力コンポーネントには、`function`, `boolean`, `string`の型の混合配列を受け付ける**rules** propがあります。 これにより、入力が _有効_ または _無効_ となる条件を指定できます。 入力の値が変更されるたびに、配列内の各関数は新しい値を受け取り、各配列要素が評価されます。 関数または配列要素が `false` または `string` を返した場合は、バリデーションに失敗したことになり、`string`の値がエラーメッセージとして表示されます。

<example file="v-form/usage" />

## API

- [v-form](/api/v-form)

<inline-api page="components/forms" />

## サンプル

### Props

#### Rules

Rulesを使用すると、すべてのフォームコンポーネントにカスタム・バリデーションを適用できます。 これらは順次バリデートされ、**maximum**なエラーが一度に1つ表示されるので、それに応じてルールを順番に並べるようにしてください。

<example file="v-form/prop-rules" />

### その他

#### submit & clearでのバリデーション

`v-form`コンポーネントには、コンポーネントに_ref_設定することでアクセスできる**3つ** の関数があります。 refはコンポーネントの内部メソッド、例えば`<v-form ref="form">`にアクセスすることができます。 **this.$refs.form.validate()** はすべての入力を検証し、それらがすべて有効であるかどうかを確認します。 **this.$refs.form.reset()** はすべての入力を消去し、バリデーション・エラーをリセットします。 **this.$refs.form.resetValidation()** は入力バリデーションをリセットするだけで、状態を変更しません。

<example file="v-form/misc-validation-with-submit-and-clear" />

#### Vee-validate

**vee-validate** は Vue.js 用のテンプレートベース・バリデーション・フレームワークです。 [ドキュメント](https://vee-validate.logaretm.com/v3)

<example file="v-form/misc-vee-validate" />

#### Vuelidate

**vuelidate** は、Vue.jsのシンプルで軽量なモデルベースのバリデーションです。 [ドキュメント](https://vuelidate.netlify.com/)

<example file="v-form/misc-vuelidate" />

<backmatter />
