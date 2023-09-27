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

        <user-badges size="12" />
      </div>
    </template>

    <template #append>
      <v-icon
        icon="mdi-view-dashboard-outline"
        class="me-4"
        size="small"
        @click="onClickDashboard"
      />

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
  // Components
  import UserBadges from '@/components/user/UserBadges.vue'

  // Composables
  import { useAuth0 } from '@/plugins/auth'
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  // Utilities
  import { rpath } from '@/util/routes'

  const { t } = useI18n()
  const router = useRouter()
  const { loginWithPopup, user, logout, isAuthenticated } = useAuth0()

  function onClickDashboard () {
    router.push(rpath('/user/dashboard/'))
  }

  function onClickLogout () {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }
</script>
