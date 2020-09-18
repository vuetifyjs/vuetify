<template>
  <app-btn
    :to="{
      name: 'Documentation',
      params: {
        category: 'introduction',
        page: 'what-is-vuetify'
      }
    }"
    path="guide"
  />
</template>

<script>
  export default { name: 'GuideLink' }
</script>
