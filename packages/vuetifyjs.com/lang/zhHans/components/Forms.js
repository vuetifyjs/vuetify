export default {
  header: '表单',
  headerText: '在表单验证方面，Vuetify拥有集成了众多的功能，想要使用第三方验证插件？您可以开箱即用Vee-validate和Vuelidate。',
  components: ['v-form'],
  examples: [{
    basicValidation: {
      header: 'VForm - 基本验证',
      desc: ''
    },
    validationWithSubmitAndClear: {
      header: 'VForm - 提交和清除时验证和',
      desc: ''
    },
    vuelidate: {
      header: '验证',
      desc: ''
    },
    veeValidate: {
      header: 'Vee-validate',
      desc: 'Vee-validate是另一个验证插件，允许您检查您的表单。一个警告是，当您使用**value**属性时必须添加**type="checkbox"**来正确验证一个`v-checkbox`。'
    }
  }],
  props: {
    lazyValidation: '如果启用，**value**将永远是 _true_ ，除非有可见的验证错误。您仍然可以调用`validate()`来手动触发验证。'
  }
}
