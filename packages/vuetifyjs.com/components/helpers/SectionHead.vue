<template lang="pug">
  h2.headline.primary--text
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
