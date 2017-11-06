<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'grid-lists-page',

    data: () => ({
      component: 'v-container',
      components: ['v-layout', 'v-flex', 'v-spacer'],
      usage: { file: 'default' },
      examples: [
        { file: 'subheader' }
      ]
    })
  }
</script>
