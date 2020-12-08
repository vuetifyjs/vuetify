<template>
  <app-btn
    :to="{
      name: 'Documentation',
      params: {
        category: 'introduction',
        page: 'enterprise'
      }
    }"
    path="enterprise"
  />
</template>

<script>
  export default { name: 'EnterpriseLink' }
</script>
