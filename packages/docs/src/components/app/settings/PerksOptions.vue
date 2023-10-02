<template>
  <promoted
    permanent
    slug="vuetify-github-sponsors"
  />

  <settings-header
    title="dashboard.perks.experience"
    text="dashboard.perks.experience-message"
  />

  <ad-option />

  <v-divider class="mt-4 mb-3" />

  <settings-header
    title="dashboard.perks.layout"
    text="dashboard.perks.layout-message"
  />

  <quickbar-option />

  <rail-drawer-option />
</template>

<script setup>
  // Components
  import AdOption from '@/components/app/settings/options/AdOption.vue'
  import QuickbarOption from '@/components/app/settings/options/QuickbarOption.vue'
  import RailDrawerOption from '@/components/app/settings/options/RailDrawerOption.vue'
  import SettingsHeader from '@/components/app/settings/SettingsHeader.vue'
</script>
