<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'forms-page',

    data: () => ({
      namespace: 'Forms',
      folder: 'forms',
      usage: { file: 'basicValidation' },
      examples: [
        { file: 'submitAndClear' },
        { file: 'vuelidate' },
        { file: 'veeValidate' }
      ]
    })
  }
</script>
