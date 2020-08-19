<template>
  <app-tooltip-btn
    :to="{
      name: 'Documentation',
      params: {
        category: 'resources',
        page: 'jobs-for-vue'
      }
    }"
    icon="$mdiBriefcaseSearchOutline"
    path="jobs"
  />
</template>

<script>
  export default { name: 'JobsLink' }
</script>
