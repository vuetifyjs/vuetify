<template>
  <div>
    <settings-header
      title="theme"
      text="theme-message"
    />

    <theme-option />

    <v-divider class="mt-4 mb-3" />

    <settings-header
      title="general"
      text="general-message"
    />

    <code-option />

    <api-option />

    <slash-search-option />

    <sync-option />
  </div>
</template>

<script setup>
  // Components
  import ApiOption from '@/components/app/settings/options/ApiOption.vue'
  import CodeOption from '@/components/app/settings/options/CodeOption.vue'
  import SettingsHeader from '@/components/app/settings/SettingsHeader.vue'
  import SlashSearchOption from '@/components/app/settings/options/SlashSearchOption.vue'
  import SyncOption from '@/components/app/settings/options/SyncOption.vue'
  import ThemeOption from '@/components/app/settings/options/ThemeOption.vue'
</script>
