<template>
  <app-btn
    :to="{
      name: 'Documentation',
      params: {
        category: 'introduction',
        page: 'meet-the-team'
      }
    }"
    path="team"
  />
</template>

<script>
  export default { name: 'TeamLink' }
</script>
