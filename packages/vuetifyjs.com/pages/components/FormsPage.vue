<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'forms-page',

    data: () => ({
      component: 'v-form',
      usage: { file: 'basicValidation' },
      examples: [
        { file: 'submitAndClear' },
        { file: 'vuelidate' },
        { file: 'veeValidate' }
      ]
    })
  }
</script>
