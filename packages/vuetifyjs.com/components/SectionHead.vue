<template lang="pug">
  h2.headline.primary--text
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
