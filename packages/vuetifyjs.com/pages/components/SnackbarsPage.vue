<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'snackbars-page',

    data: () => ({
      namespace: 'Snackbars',
      folder: 'snackbars',
      usage: { file: 'position' },
      examples: [
        { file: 'contextual' }
      ]
    })
  }
</script>
