<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'dividers-page',

    data: () => ({
      namespace: 'Dividers',
      folder: 'dividers',
      usage: { file: 'fullBleed' },
      examples: [
        { file: 'lightAndDark' },
        { file: 'inset' },
        { file: 'subheaders' }
      ]
    })
  }
</script>
