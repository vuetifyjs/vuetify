<template>
  <div
    v-if="!isAuthenticated"
    class="pa-2"
  >
    <v-btn
      :text="t('login-with-github')"
      block
      class="text-white text-none"
      color="#2a2a2a"
      prepend-icon="mdi-github"
      variant="flat"
      @click="loginWithPopup"
    />
  </div>

  <v-list-item
    v-else-if="user"
    :prepend-avatar="user.picture"
    :subtitle="user.email"
    class="px-4"
    lines="one"
    nav
  >
    <template #prepend>
      <v-avatar size="small" class="me-n2" />
    </template>

    <template #title>
      <div class="d-flex align-center">
        <span class="me-1">{{ user.name }}</span>

        <v-icon v-if="auth.admin" color="primary" icon="$vuetify" size="12" />

        <v-icon v-if="isSponsoring" icon="mdi-crown" color="#e98b20" size="12" />
      </div>
    </template>

    <template #append>
      <v-fade-transition leave-absolute>
        <v-icon
          :key="app.settings"
          :icon="app.settings ? 'mdi-cog' : 'mdi-cog-outline'"
          class="me-4"
          size="small"
          @click="app.settings = !app.settings"
        />
      </v-fade-transition>

      <v-icon
        icon="mdi-logout-variant"
        class="me-1"
        size="small"
        @click="onClickLogout"
      />
    </template>
  </v-list-item>
</template>

<script setup>
  // Composables
  import { useAuth0 } from '@/plugins/auth'
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { computed } from 'vue'

  // Stores
  import { useAppStore } from '@/store/app'
  import { useAuthStore } from '@/store/auth'

  const app = useAppStore()
  const auth = useAuthStore()
  const { loginWithPopup, user, logout, isAuthenticated } = useAuth0()
  const { t } = useI18n()

  const isSponsoring = computed(() => {
    if (!auth.sponsor) return false

    const sponsor = Array.isArray(auth.sponsor) ? auth.sponsor : [auth.sponsor]

    return sponsor.find(s => s.tier.monthlyPriceInDollars >= 1)
  })

  function onClickLogout () {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }
</script>
