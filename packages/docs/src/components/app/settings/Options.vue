<template>
  <div>
    <div class="mb-3">
      <v-label :text="t('theme')" class="mb-2 font-weight-medium" />

      <v-messages :messages="t('theme-message')" active />
    </div>

    <theme-option />

    <v-divider class="mt-4 mb-3" />

    <div class="mb-3">
      <v-label :text="t('general')" class="mb-2 font-weight-medium" />

      <v-messages :messages="t('general-message')" active />
    </div>

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
  import SlashSearchOption from '@/components/app/settings/options/SlashSearchOption.vue'
  import SyncOption from '@/components/app/settings/options/SyncOption.vue'
  import ThemeOption from '@/components/app/settings/options/ThemeOption.vue'

  // Composables
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
