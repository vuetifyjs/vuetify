<template>
  <div class="pt-3 px-2">
    <v-divider />

    <latest-release />

    <documentation-build />

    <latest-commit />
  </div>
</template>

<script setup>
  // Components
  import DocumentationBuild from '@/components/app/settings/DocumentationBuild.vue'
  import LatestCommit from '@/components/app/settings/LatestCommit.vue'
  import LatestRelease from '@/components/app/settings/LatestRelease.vue'
</script>
