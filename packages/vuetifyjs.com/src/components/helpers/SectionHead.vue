<template lang="pug">
  h2.headline.primary--text
    translatable(:i18n="value")
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
