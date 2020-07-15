<template>
  <v-btn
    :to="{
      name: 'Documentation',
      params: {
        category: 'jobs',
        page: 'for-vue'
      }
    }"
    icon
  >
    <v-icon>$mdiBriefcaseSearch</v-icon>
  </v-btn>
</template>

<script>
  export default {
    name: 'JobsLink',
  }
</script>
