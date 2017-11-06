<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'navigation-drawers-page',

    data: () => ({
      component: 'v-navigation-drawer',
      usage: { file: 'permanent' },
      examples: [
        { file: 'permanentClipped' },
        { file: 'permanentFloating' },
        { file: 'persistent' },
        { file: 'mini' },
        { file: 'temporary' },
        { file: 'dark' }
      ]
    })
  }
</script>
