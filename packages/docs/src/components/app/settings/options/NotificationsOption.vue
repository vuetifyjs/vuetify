<template>
  <v-switch
    v-model="user.notifications.show"
    class="ps-3 flex-0-0"
    inset
    color="success"
    label="Enable Notifications"
    messages="Notifications are located at the top right of the screen in the actions bar and provide information about new releases, updates, and other important information."
    density="compact"
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

  const isDisabled = computed(() => user.notifications.read.length === 0)

  function onResetNotifications () {
    user.notifications.read = []
  }
</script>
