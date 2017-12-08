<template lang="pug">
  section.page-head
    h1.display-1.primary--text#introduction
      markdown(:source="header")
    markdown(:source="text")
    slot(name="sup")
</template>

<script>
  export default {
    name: 'page-head',

    props: {
      header: null,
      text: null
    }
  }
</script>
