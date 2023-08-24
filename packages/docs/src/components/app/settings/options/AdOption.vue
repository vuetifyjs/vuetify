<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.ads && canToggle ? 'primary' : 'disabled'
      }
    }"
  >
    <v-switch
      v-model="user.ads"
      :color="canToggle ? 'primary' : 'disabled'"
      :readonly="!canToggle"
      class="ps-3 flex-0-0"
      density="compact"
      inset
      label="Enable Ads"
      messages="Enable advertisements on documentation pages."
      true-icon="mdi-check"
      false-icon="$close"
    />
  </v-defaults-provider>
</template>

<script setup>
  // Stores
  import { useUserStore } from '@/store/user'
  import { useAuthStore } from '@/store/auth'

  // Utilities
  import { computed } from 'vue'

  const user = useUserStore()
  const auth = useAuthStore()

  const canToggle = computed(() => auth.admin || auth.sponsor?.monthlyPriceInDollars >= 1)
</script>
