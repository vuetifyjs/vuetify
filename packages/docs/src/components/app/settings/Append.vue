<template>
  <div class="py-3 px-2">
    <v-divider />

    <latest-release />

    <documentation-build />

    <latest-commit />

    <v-divider />

    <developer-mode />
  </div>
</template>

<script setup>
  // Components
  import DeveloperMode from '@/components/app/settings/DeveloperMode.vue'
  import DocumentationBuild from '@/components/app/settings/DocumentationBuild.vue'
  import LatestCommit from '@/components/app/settings/LatestCommit.vue'
  import LatestRelease from '@/components/app/settings/LatestRelease.vue'
</script>
