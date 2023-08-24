<template>
  <div class="ps-3 mb-3">
    <v-label class="mb-2 font-weight-medium">Display</v-label>

    <v-messages
      active
      messages="Toggle various elements of the documentation experience."
    />
  </div>

  <ad-option />

  <br>

  <quickbar-option />

  <br>

  <v-divider />

  <br>

  <div class="ps-3 mb-3">
    <v-label class="mb-2 font-weight-medium">Communication</v-label>

    <v-messages
      active
      messages="Vuetify will communicate with you through banners and notifications. You can disable these features here or reset your local notification cache."
    />
  </div>

  <banner-option />

  <br>

  <notifications-option />

  <br>

  <v-divider />

  <br>

  <developer-mode />

  <br>

  <div class="d-flex justify-end">
    <v-btn
      color="error"
      size="small"
      variant="flat"
      @click="onResetAll"
    >
      Reset All
    </v-btn>
  </div>
</template>

<script setup>
  // Components
  import AdOption from './options/AdOption.vue'
  import BannerOption from './options/BannerOption.vue'
  import DeveloperMode from './DeveloperMode.vue'
  import NotificationsOption from './options/NotificationsOption.vue'
  import QuickbarOption from './options/QuickbarOption.vue'

  // Stores
  import { useUserStore } from '@/store/user'

  const user = useUserStore()

  function onResetAll () {
    user.banner = true
    user.notifications.read = []
    user.notifications.show = true
    user.notifications.last.banner = []
    user.quickbar = true
  }
</script>
