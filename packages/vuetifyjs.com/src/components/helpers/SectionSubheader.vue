<template lang="pug">
  translation-translatable(:i18n="value")
    h3.mb-3 {{ $t(value) }}
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        required: true
      }
    }
  }
</script>
