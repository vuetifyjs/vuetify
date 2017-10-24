<template lang="pug">
  v-card(flat).transparent.page-heading
    v-card-title(primary).px-0
      h1.headline.primary--light--text.mb-0
        slot(name="title")
    v-card-text.px-0
      slot
</template>

<script>
  export default {
    name: 'page-heading'
  }
</script>
