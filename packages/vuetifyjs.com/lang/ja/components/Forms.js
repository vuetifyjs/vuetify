export default {
  header: 'Form',
  headerText:
    'フォームのバリデーションに関して、Vuetifyには多数の機能が組み込まれています。なお、サードパーティのバリデーションプラグインである[Vee-validate](https://github.com/baianat/Vee-validate)や[vuelidate](https://github.com/monterail/vuelidate)も使用することができます。',
  components: ['v-form'],
  examples: [
    {
      basicValidation: {
        header: 'VForm - 基本的なバリデーション',
        desc:
          '内部の `v-form` コンポーネントを使用すると、簡単にフォームにバリデーションを追加できます。全てのフォームコンポーネントは、 `rules` prop という関数の配列を保持しています。入力値が変更される度に、配列内の各関数は新しいフォームの値を受け取ります。関数がfalseまたは文字列を返却した場合、バリデーションの結果はfalseです。'
      },
      validationWithSubmitAndClear: {
        header: '送信時のバリデーションとバリデーションのクリア',
        desc:
          ' `v-form` コンポーネントは、コンポーネントからのrefを設定することでアクセスが可能になる2つの関数を保持しています。 `validate()` は全ての入力値をバリデートし、全てが有効な入力かどうかを返却します。 `reset()` は、全ての入力値からバリデーションエラーをクリアにします。'
      },
      vuelidate: {
        header: 'Vuelidate',
        desc: ''
      },
      veeValidate: {
        header: 'Vee-validate',
        desc:
          'Vee-validateは、フォームのバリデーションが可能なもうひとつのバリデーションプラグインです。なお、 **value** propを使用するときに `v-checkbox`を正しくバリデートするには、**type =" checkbox "** を追加する必要があるので注意して下さい。'
      }
    }
  ],
  props: {
    lazyValidation: '有効にすると、表示されるバリデーションエラーが無い限り、 **value** は常に _true_ となります。'
  },
  functions: {
    reset: '全ての入力値に対するバリデートをリセットします。',
    validate: '全ての入力値をバリデートし結果を返却します。'
  }
}
