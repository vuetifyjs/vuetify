<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'carousels-page',

    data: () => ({
      component: 'v-carousel',
      components: ['v-carousel-item'],
      usage: { file: 'default' },
      examples: [
        { file: 'customTransition' },
        { file: 'customDelimiter' },
        { file: 'hideControls' }
      ]
    })
  }
</script>
