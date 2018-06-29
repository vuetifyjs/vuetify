<template lang="pug">
  div.text-xs-justify
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
