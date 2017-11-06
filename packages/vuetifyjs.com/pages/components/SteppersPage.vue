<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'steppers-page',

    data: () => ({
      component: 'v-stepper',
      components: [
        'v-stepper-step',
        'v-stepper-content',
        'v-stepper-header'
      ],
      usage: { file: 'example' },
      examples: [
        { file: 'editable' },
        { file: 'nonEditable' },
        { file: 'optional' },
        { file: 'horizontal' },
        { file: 'vertical' },
        { file: 'linear' },
        { file: 'nonLinear' },
        { file: 'alternateLabels' },
        { file: 'error' },
        { file: 'alternateError' },
        { file: 'verticalError' },
        { file: 'dynamic' }
      ]
    })
  }
</script>
