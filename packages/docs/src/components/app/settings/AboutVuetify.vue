<template>
  <latest-release />

  <documentation-build />

  <latest-commit />

  <v-divider class="mt-4" />
</template>

<script setup>
  // Components
  import DocumentationBuild from '@/components/app/settings/DocumentationBuild.vue'
  import LatestCommit from '@/components/app/settings/LatestCommit.vue'
  import LatestRelease from '@/components/app/settings/LatestRelease.vue'
</script>
