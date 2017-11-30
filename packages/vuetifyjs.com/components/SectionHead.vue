<template lang="pug">
  h2.headline.primary--text.mb-3
    markdown(:source="$t(value)")
</template>

<script>
  export default {
    name: 'section-head',

    props: {
      value: String
    }
  }
</script>
