<template>
  <app-btn
    :to="{
      name: 'Documentation',
      params: {
        category: 'beginners-guide',
        page: 'guide'
      }
    }"
    path="guide"
  />
</template>

<script>
  export default { name: 'GuideLink' }
</script>
