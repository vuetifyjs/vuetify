<template>
  <app-btn
    :to="{
      name: 'Documentation',
      params: {
        category: 'professional-support',
        page: 'enterprise'
      }
    }"
    path="enterprise"
  />
</template>

<script>
  export default { name: 'EnterpriseLink' }
</script>
