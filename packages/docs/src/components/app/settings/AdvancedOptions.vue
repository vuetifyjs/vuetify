<template>
  <banner-option />

  <br>

  <notifications-option />

  <br>

  <quickbar-option />

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
