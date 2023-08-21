<template>
  <div class="pb-2 pe-2">
    <documentation-build />

    <v-divider />

    <developer-mode hide-details />
  </div>
</template>

<script setup>
  // Components
  import DeveloperMode from '@/components/app/settings/DeveloperMode.vue'
  import DocumentationBuild from '@/components/app/settings/DocumentationBuild.vue'
</script>
