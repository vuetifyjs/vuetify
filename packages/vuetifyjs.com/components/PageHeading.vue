<template lang="pug">
  div.page-heading.mb-5
    h1.headline.primary--light--text
      slot(name="title")
    div
      slot
</template>

<script>
  export default {
    name: 'page-heading'
  }
</script>
