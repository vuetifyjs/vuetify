<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'carousels-page',

    data: () => ({
      namespace: 'Carousels',
      folder: 'carousels',
      usage: { file: 'default' },
      examples: [
        { file: 'customTransition' },
        { file: 'customDelimiter' },
        { file: 'hideControls' }
      ]
    })
  }
</script>
