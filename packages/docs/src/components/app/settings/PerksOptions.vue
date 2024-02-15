<template>
  <alert
    v-if="!auth.isSubscriber"
    type="success"
  >
    {{ t('dashboard.perks.alert') }}

    <app-link :href="rpath('/user/subscriptions/')">$2.99 per month</app-link>
  </alert>

  <settings-header
    title="dashboard.perks.experience"
    text="dashboard.perks.experience-message"
  />

  <ad-option />

  <pin-option />

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
  import PinOption from '@/components/app/settings/options/PinOption.vue'
  import QuickbarOption from '@/components/app/settings/options/QuickbarOption.vue'
  import RailDrawerOption from '@/components/app/settings/options/RailDrawerOption.vue'
  import SettingsHeader from '@/components/app/settings/SettingsHeader.vue'

  // Composables
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { rpath } from '@/util/routes'

  // Stores
  import { useAuthStore } from '@vuetify/one'

  const auth = useAuthStore()
  const { t } = useI18n()
</script>
