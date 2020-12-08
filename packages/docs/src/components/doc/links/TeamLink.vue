<template>
  <app-btn
    :to="{
      name: 'Documentation',
      params: {
        category: 'about',
        page: 'meet-the-team'
      }
    }"
    path="team"
  />
</template>

<script>
  export default { name: 'TeamLink' }
</script>
