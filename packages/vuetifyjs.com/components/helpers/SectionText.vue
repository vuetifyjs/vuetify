<template lang="pug">
  markdown(:source="$t(value)")
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      }
    }
  }
</script>
