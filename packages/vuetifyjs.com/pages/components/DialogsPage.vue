<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'dialogs-page',

    data: () => ({
      component: 'v-dialog',
      usage: { file: 'simple' },
      examples: [
        { file: 'withoutActivator' },
        { file: 'modal' },
        { file: 'fullscreen' },
        { file: 'form' },
        { file: 'scrollable' },
        { file: 'overflowed' }
      ]
    })
  }
</script>
