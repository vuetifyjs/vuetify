<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'navigation-drawers-page',

    data: () => ({
      namespace: 'NavigationDrawers',
      folder: 'navigation-drawers',
      usage: { file: 'default' },
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
