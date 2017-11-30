<template lang="pug">
  markdown(:source="$t(value)")
</template>

<script>
  export default {
    name: 'section-text',

    props: {
      value: {
        type: String,
        default: ''
      }
    }
  }
</script>
