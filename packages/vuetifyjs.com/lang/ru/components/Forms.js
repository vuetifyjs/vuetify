export default {
  header: 'Форма',
  headerText: 'Когда дело доходит до формы подтверждения, Vuetify имеет множество интеграций и отлично работает. Хотите использовать сторонний плагин проверки? Из коробки вы можете использовать Vee-validate и Vuelidate.',
  components: ['v-form'],
  examples: [{
    basicValidation: {
      header: 'VForm - Базовая проверка',
      desc: ''
    },
    validationWithSubmitAndClear: {
      header: 'VForm - Проверка с помощью отправки и очистка',
      desc: ''
    },
    vuelidate: {
      header: 'Vuelidate',
      desc: ''
    },
    veeValidate: {
      header: 'Vee-validate',
      desc: 'Vee-validate - это еще один плагин проверки, который позволяет вам проверять свои формы. Одно из предостережений заключается в том, что вы должны добавить ** type = "checkbox" ** для правильной проверки `v-checkbox` при использовании **value**.'
    }
  }],
  props: {
    lazyValidation: 'Если включено, **value** всегда будет _true_, если нет видимых ошибок проверки. Вы все равно можете вызвать `validate()` для ручного запуска проверки'
  }
}
