<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'progress-page',

    data: () => ({
      namespace: 'Progress',
      folder: 'progress',
      usage: { file: 'default' },
      examples: [
        { file: 'circularColored' },
        { file: 'circularIndeterminate' },
        { file: 'circularSizeAndWidth' },
        { file: 'circularRotate' },
        { file: 'linearDeterminate' },
        { file: 'linearIndeterminate' },
        { file: 'linearBuffer' },
        { file: 'linearQueryIndeterminateAndDeterminate' },
        { file: 'linearCustomHeightAndContextualColors' },
        { file: 'linearCustomColors' }
      ]
    })
  }
</script>
