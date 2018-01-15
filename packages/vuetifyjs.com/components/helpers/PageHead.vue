<template lang="pug">
  section.page-head
    h1.display-1.primary--text#introduction
      markdown(:source="header")
    markdown(:source="text")
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
