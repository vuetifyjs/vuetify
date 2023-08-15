<template>
  <v-switch
    :model-value="true"
    class="ps-3 flex-0-0"
    label="Enable Banners"
    messages="Banners are located at the top of the screen and usually provide general information about Vuetify."
    density="compact"
    color="success"
    readonly
    inset
  >
    <template #append>
      <v-btn
        :color="isDisabled ? undefined : 'error'"
        :disabled="isDisabled"
        variant="outlined"
        size="small"
        @click="onResetNotifications"
      >
        Reset
      </v-btn>
    </template>
  </v-switch>
</template>

<script setup>
  // Utilities
  import { computed } from 'vue'

  // Stores
  import { useUserStore } from '@/store/user'

  const user = useUserStore()

  const isDisabled = computed(() => user.notifications.last.banner.length === 0)

  function onResetNotifications () {
    user.notifications.last.banner = []
  }
</script>
