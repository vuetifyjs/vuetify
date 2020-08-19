<template>
  <app-tooltip-btn
    :to="{
      name: 'Documentation',
      params: {
        category: 'jobs',
        page: 'for-vue'
      }
    }"
    icon="$mdiBriefcaseSearchOutline"
    path="jobs"
  />
</template>

<script>
  export default { name: 'JobsLink' }
</script>
