<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'snackbars-page',

    data: () => ({
      component: 'v-snackbar',
      usage: { file: 'position' },
      examples: [
        { file: 'contextual' }
      ]
    })
  }
</script>
