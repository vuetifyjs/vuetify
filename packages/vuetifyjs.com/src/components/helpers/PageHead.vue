<template lang="pug">
  section.page-head
    h1.display-1.primary--text#introduction
      translatable(:i18n="header")
        markdown(:source="$t(header)")
    translatable(:i18n="text")
      markdown(:source="$t(text)")
    slot(name="sup")
</template>

<script>
  export default {
    name: 'PageHead',

    props: {
      header: {
        type: null,
        default: null
      },
      text: {
        type: null,
        default: null
      }
    }
  }
</script>
