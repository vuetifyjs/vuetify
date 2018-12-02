<template>
  <component :is="'ad-carbon'" />
</template>

<script>
  export default {
    props: {
      viewport: {
        type: String,
        default: undefined
      }
    }
  }
</script>
