<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'pagination-page',

    data: () => ({
      namespace: 'Pagination',
      folder: 'pagination',
      usage: { file: 'short' },
      examples: [
        { file: 'long' },
        { file: 'limit' },
        { file: 'round' },
        { file: 'disabled' }
      ]
    })
  }
</script>
