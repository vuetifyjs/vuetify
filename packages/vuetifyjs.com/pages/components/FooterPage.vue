<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'footer-page',

    data: () => ({
      namespace: 'Footer',
      folder: 'footer',
      usage: { file: 'default' }
    })
  }
</script>
