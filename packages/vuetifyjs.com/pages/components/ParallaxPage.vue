<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'parallax-page',

    data: () => ({
      namespace: 'Parallax',
      folder: 'parallax',
      usage: { file: 'default' },
      examples: [
        { file: 'content' },
        { file: 'customHeight' },
        { file: 'jumbotron' }
      ]
    })
  }
</script>
