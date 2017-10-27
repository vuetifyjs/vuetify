<template lang="pug">
  p(v-html="$t(value)").section-text
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
