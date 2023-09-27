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
    :title="user.name"
    :subtitle="user.email"
    class="px-4"
    lines="one"
    nav
  >
    <template #prepend>
      <v-avatar size="small" class="me-n2" />
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

  // Stores
  import { useAppStore } from '@/store/app'

  const app = useAppStore()
  const { loginWithPopup, user, logout, isAuthenticated } = useAuth0()
  const { t } = useI18n()

  function onClickLogout () {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }
</script>
