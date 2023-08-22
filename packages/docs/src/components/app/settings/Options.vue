<template>
  <div class="ps-3 mb-3">
    <v-label class="mb-2 font-weight-medium">Theme</v-label>

    <v-messages
      active
      messages="Customize your documentation experience with light and dark themes, as well as a combination of both named"
    />
  </div>

  <theme-option />

  <br>

  <v-divider />

  <br>

  <div class="ps-3 mb-3">
    <v-label class="mb-2 font-weight-medium">General</v-label>

    <v-messages
      active
      messages="Enable composition API for examples, show component API inline, and more."
    />
  </div>

  <code-option />

  <br>

  <api-option />

  <br>

  <slash-search-option />

  <br>

  <sync-option />
</template>

<script setup>
  // Components
  import ApiOption from '@/components/app/settings/options/ApiOption.vue'
  import CodeOption from '@/components/app/settings/options/CodeOption.vue'
  import SyncOption from '@/components/app/settings/options/SyncOption.vue'
  import SlashSearchOption from '@/components/app/settings/options/SlashSearchOption.vue'
  import ThemeOption from '@/components/app/settings/options/ThemeOption.vue'
</script>
