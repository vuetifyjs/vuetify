<template lang="pug">
  h2(v-text="$t(value)").headline.primary--text.mb-3
</template>

<script>
  export default {
    name: 'section-heading',

    props: {
      value: String
    }
  }
</script>
