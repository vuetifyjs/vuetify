<template lang="pug">
  markdown(:source="$t(value)").mb-3
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
