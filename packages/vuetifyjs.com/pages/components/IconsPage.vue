<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'icons-page',

    data: () => ({
      component: 'v-icon',
      usage: { file: 'standard' },
      examples: [
        { file: 'fontAwesome' },
        { file: 'mdi' },
        { file: 'color' },
        { file: 'buttons' }
      ]
    })
  }
</script>
