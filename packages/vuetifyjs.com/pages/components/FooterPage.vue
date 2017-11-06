<template lang="pug">
  component-page(:data="$data")
</template>

<script>
  export default {
    name: 'footer-page',

    data: () => ({
      component: 'v-footer',
      usage: { file: 'default' }
    })
  }
</script>
