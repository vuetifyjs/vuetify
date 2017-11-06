<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'expansion-panels-page',

    data: () => ({
      component: 'v-expansion-panel',
      components: ['v-expansion-panel-content'],
      usage: { file: 'accordion' },
      examples: [
        { file: 'expand' },
        { file: 'popout' },
        { file: 'focusable' }
      ]
    })
  }
</script>
