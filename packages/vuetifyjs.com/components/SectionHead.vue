<template lang="pug">
  h2(v-html="$t(value)").headline.primary--text.mb-3
</template>

<script>
  export default {
    name: 'section-head',

    props: {
      value: String
    }
  }
</script>
