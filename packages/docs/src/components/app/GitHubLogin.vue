<template>
  <div
    v-if="!isAuthenticated"
    class="pa-2"
  >
    <v-list-item
      :title="t('login-with-github')"
      nav
      base-color="#2a2a2a"
      prepend-icon="mdi-github"
      append-icon="mdi-login-variant"
      variant="flat"
      @click="loginWithPopup"
    >
      <template #prepend>
        <v-icon class="me-n6" />
      </template>

      <template #append>
        <v-icon size="small" />
      </template>
    </v-list-item>
  </div>

  <v-list-item
    v-else-if="user"
    :prepend-avatar="user.picture"
    :subtitle="`@${user.nickname}`"
    class="px-4"
    rounded="0"
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
        :color="isDashboard ? 'primary' : undefined"
        :icon="`mdi-view-dashboard${isDashboard ? '' : '-outline'}`"
        :style="{
          opacity: isDashboard ? 1 : undefined,
        }"
        class="me-4"
        size="small"
        @click="onClickDashboard"
      />

      <v-icon
        class="me-1"
        icon="mdi-logout-variant"
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
  import { useRoute, useRouter } from 'vue-router'

  // Utilities
  import { computed } from 'vue'
  import { rpath } from '@/util/routes'

  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()
  const { loginWithPopup, user, logout, isAuthenticated } = useAuth0()

  const isDashboard = computed(() => route.meta?.category === 'user')

  function onClickDashboard () {
    router.push(rpath('/user/dashboard/'))
  }

  function onClickLogout () {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }
</script>
