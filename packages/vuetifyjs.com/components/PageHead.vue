<template lang="pug">
  div.page-head.mb-5
    h1.display-1.primary--text.mb-3#introduction
      |{{ header }}
    markdown(:source="text")
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
