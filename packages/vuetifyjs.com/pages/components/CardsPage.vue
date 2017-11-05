<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'cards-page',

    data: () => ({
      namespace: 'Cards',
      folder: 'cards',
      usage: { file: 'components' },
      examples: [
        { file: 'mediaWithText' },
        { file: 'horizontal' },
        { file: 'grids' },
        { file: 'customActions' }
      ]
    })
  }
</script>
