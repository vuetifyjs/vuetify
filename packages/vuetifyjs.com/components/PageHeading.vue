<template lang="pug">
  v-card(flat).transparent.page-heading
    v-card-title(primary)
      h1.headline.primary--text.mb-0
        slot(name="title")
    v-card-text
      slot
</template>

<script>
  export default {
    name: 'page-heading'
  }
</script>
