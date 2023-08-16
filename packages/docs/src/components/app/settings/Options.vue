<template>
  <theme-option />

  <br>

  <v-divider class="mb-4" />

  <div class="ps-3">
    <v-label class="mb-2 font-weight-medium">General</v-label>

    <v-messages
      active
      messages="Enable composition API for examples, show component API inline, and more."
      class="mb-n3"
    />
  </div>

  <br>

  <code-option />

  <br>

  <api-option />

  <br>

  <developer-mode />
</template>

<script setup>
  // Components
  import ApiOption from '@/components/app/settings/options/ApiOption.vue'
  import CodeOption from '@/components/app/settings/options/CodeOption.vue'
  import DeveloperMode from './DeveloperMode.vue'
  import ThemeOption from '@/components/app/settings/options/ThemeOption.vue'
</script>
