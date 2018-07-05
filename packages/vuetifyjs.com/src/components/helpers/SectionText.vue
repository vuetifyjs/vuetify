<template lang="pug">
  div.text-xs-justify
    translation-translatable(:i18n="value")
    helpers-markdown(:source="$t(value)")
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
