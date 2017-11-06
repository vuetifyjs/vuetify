<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'tooltips-page',

    data: () => ({
      component: 'v-tooltip',
      usage: { file: 'default' },
      examples: [
        { file: 'visibility' }
      ]
    })
  }
</script>
