<template>
  <div class="ps-1 mb-3">
    <v-label :text="t('display')" class="mb-2 font-weight-medium" />

    <v-messages :messages="t('display-message')" active />
  </div>

  <ad-option />

  <br>

  <quickbar-option />

  <br>

  <v-divider />

  <br>

  <div class="ps-1 mb-3">
    <v-label :text="t('communication')" class="mb-2 font-weight-medium" />

    <v-messages :messages="t('communication-message')" active />
  </div>

  <banner-option />

  <br>

  <notifications-option />

  <br>

  <div class="d-flex justify-end">
    <v-btn
      :text="t('reset-all')"
      color="error"
      size="small"
      variant="flat"
      @click="onResetAll"
    />
  </div>

  <br>

  <v-divider />

  <br>

  <developer-mode />
</template>

<script setup>
  // Components
  import AdOption from './options/AdOption.vue'
  import BannerOption from './options/BannerOption.vue'
  import DeveloperMode from './DeveloperMode.vue'
  import NotificationsOption from './options/NotificationsOption.vue'
  import QuickbarOption from './options/QuickbarOption.vue'

  // Composables
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useUserStore } from '@/store/user'

  const { t } = useI18n()
  const user = useUserStore()

  function onResetAll () {
    user.banner = true
    user.notifications.read = []
    user.notifications.show = true
    user.notifications.last.banner = []
    user.quickbar = true
  }
</script>
