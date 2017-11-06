<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'dividers-page',

    data: () => ({
      component: 'v-divider',
      usage: { file: 'fullBleed' },
      examples: [
        { file: 'lightAndDark' },
        { file: 'inset' },
        { file: 'subheaders' }
      ]
    })
  }
</script>
