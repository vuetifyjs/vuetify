<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.disableAds && canToggle ? 'primary' : 'disabled'
      }
    }"
  >
    <settings-switch
      v-model="user.disableAds"
      :readonly="!canToggle"
      :label="t('disable-ads')"
      :messages="t('disable-ads-message')"
      :disabled="!canToggle"
    />

    <v-btn
      v-if="!canToggle"
      :href="isAuthenticated ? 'https://github.com/sponsors/johnleider' : undefined"
      :text="isAuthenticated ? t('subscribe-to-unlock') : t('login-with-github')"
      block
      class="mb-3 text-none"
      color="surface-variant"
      prepend-icon="mdi-github"
      rel="noopener"
      size="small"
      target="_blank"
      variant="outlined"
      @click="onClick"
    >
      <template #prepend>
        <v-icon color="surface-variant" />
      </template>
    </v-btn>
  </v-defaults-provider>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'
  import { useAuth0 } from '@/plugins/auth'

  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'

  // Utilities
  import { computed } from 'vue'

  const { t } = useI18n()
  const auth = useAuthStore()
  const user = useUserStore()
  const { isAuthenticated, loginWithPopup } = useAuth0()

  const isSponsoring = computed(() => {
    if (!auth.sponsor) return false

    const sponsor = Array.isArray(auth.sponsor) ? auth.sponsor : [auth.sponsor]

    return sponsor.find(s => s.tier.monthlyPriceInDollars >= 1)
  })

  const canToggle = computed(() => auth.admin || isSponsoring.value)

  function onClick () {
    if (!isAuthenticated.value) loginWithPopup()
  }
</script>
