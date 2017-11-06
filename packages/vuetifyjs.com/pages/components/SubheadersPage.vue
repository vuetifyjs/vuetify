<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'subheaders-page',

    data: () => ({
      component: 'v-subheader',
      usage: { file: 'list' },
      examples: [
        { file: 'grid' },
        { file: 'menu' }
      ]
    })
  }
</script>
