<template>
  <app-btn
    :to="{
      name: 'Documentation',
      params: {
        category: 'introduction',
        page: 'why-vuetify'
      }
    }"
    path="guide"
  />
</template>

<script>
  export default { name: 'GuideLink' }
</script>
