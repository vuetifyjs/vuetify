<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'sliders-page',

    data: () => ({
      component: 'v-slider',
      usage: { file: 'continuous' },
      examples: [
        { file: 'discrete' },
        { file: 'icons' },
        { file: 'editableNumericValue' },
        { file: 'dark' },
        { file: 'customColors' }
      ]
    })
  }
</script>
