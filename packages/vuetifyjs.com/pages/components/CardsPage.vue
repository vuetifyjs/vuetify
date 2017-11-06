<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'cards-page',

    data: () => ({
      component: 'v-card',
      components: ['v-card-media', 'v-card-title', 'v-card-actions'],
      usage: { file: 'components' },
      examples: [
        { file: 'mediaWithText' },
        { file: 'horizontal' },
        { file: 'grids' },
        { file: 'customActions' }
      ]
    })
  }
</script>
