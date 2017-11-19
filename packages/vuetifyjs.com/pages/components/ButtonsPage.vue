<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'buttons-page',

    data: () => ({
      component: 'v-btn',
      usage: { file: 'usage' },
      examples: [
        { file: 'flat' },
        { file: 'raised' },
        { file: 'depressed' },
        { file: 'dropdown', uninverted: true },
        { file: 'toggle' },
        { file: 'icon' },
        { file: 'floating' },
        { file: 'loaders' },
        { file: 'sizing' },
        { file: 'outline' },
        { file: 'round' },
        { file: 'block' }
      ]
    })
  }
</script>
