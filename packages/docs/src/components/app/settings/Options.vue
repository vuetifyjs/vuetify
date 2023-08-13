<template>
  <banner-option />

  <br>

  <notifications-option />

  <br>

  <quickbar-option />

  <br>

  <developer-mode />

  <br>

  <v-footer
    app
    absolute
    class="text-caption justify-end text-medium-emphasis"
    height="47"
  >
    <v-btn
      variant="flat"
      size="small"
      color="error"
      @click="onResetAll"
    >
      Reset All
    </v-btn>
  </v-footer>
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
    user.notifications.read = []
    user.notifications.show = true
    user.notifications.last.banner = []
    user.quickbar = true
  }
</script>
