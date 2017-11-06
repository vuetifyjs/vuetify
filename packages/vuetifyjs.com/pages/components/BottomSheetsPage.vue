<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'bottom-sheets-page',

    data: () => ({
      component: 'v-bottom-sheet',
      usage: { file: 'standard' },
      examples: [
        { file: 'inset' }
      ]
    })
  }
</script>
