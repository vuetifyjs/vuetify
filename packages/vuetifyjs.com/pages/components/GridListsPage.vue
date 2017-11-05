<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'grid-lists-page',

    data: () => ({
      namespace: 'GridLists',
      folder: 'grid-lists',
      usage: { file: 'default' },
      examples: [
        { file: 'subheader' }
      ]
    })
  }
</script>
