<template>
  <template v-if="!auth.isSubscriber">
    <alert type="info">
      {{ t('dashboard.perks.alert') }}

      <app-link href="https://github.com/sponsors/johnleider">$1 per month</app-link>
    </alert>

    <promoted
      permanent
      slug="vuetify-github-sponsors"
    />
  </template>

  <settings-header
    title="dashboard.perks.experience"
    text="dashboard.perks.experience-message"
  />

  <ad-option />

  <v-divider class="mt-4 mb-3" />

  <settings-header
    title="dashboard.perks.avatar"
    text="dashboard.perks.avatar-message"
  />

  <avatar-option />

  <v-divider class="mt-4 mb-3" />

  <settings-header
    title="dashboard.perks.layout"
    text="dashboard.perks.layout-message"
  />

  <quickbar-option />

  <rail-drawer-option />
</template>

<script setup lang="ts">
  // Components
  import AdOption from '@/components/app/settings/options/AdOption.vue'
  import AvatarOption from '@/components/app/settings/options/AvatarOption.vue'
  import QuickbarOption from '@/components/app/settings/options/QuickbarOption.vue'
  import RailDrawerOption from '@/components/app/settings/options/RailDrawerOption.vue'
  import SettingsHeader from '@/components/app/settings/SettingsHeader.vue'

  // Composables
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useAuthStore } from '@/store/auth'

  const auth = useAuthStore()
  const { t } = useI18n()
</script>
