<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.notifications.show ? 'primary' : 'disabled'
      }
    }"
  >
    <v-switch
      v-model="user.notifications.show"
      class="ps-3 flex-0-0"
      inset
      color="primary"
      label="Enable Notifications"
      messages="Notifications are located at the top right of the screen in the actions bar and provide information about new releases, updates, and other important information."
      density="compact"
      true-icon="mdi-check"
      false-icon="$close"
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
  </v-defaults-provider>
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
