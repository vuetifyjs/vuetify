<template>
  <v-list-item v-if="GITHUB_SHA" class="text-caption">
    Build
    <a
      :href="`https://github.com/vuetifyjs/vuetify/commit/${GITHUB_SHA}`"
      target="_blank"
      rel="noopener noreferrer"
    >{{ GITHUB_SHA }}</a>
  </v-list-item>

  <v-divider />

  <v-list-item
    :prepend-avatar="user?.picture"
    :prepend-icon="isAuthenticated ? undefined : 'mdi-github'"
    :title="isAuthenticated ? user?.name : 'Login w/ GitHub'"
    :subtitle="user?.email"
    :link="!isAuthenticated"
    lines="two"
    @click="onClick"
  >
    <template #append>
      <v-icon
        v-if="isAuthenticated"
        icon="mdi-logout-variant"
        @click="onClickLogout"
      />

      <v-icon
        v-else
        icon="mdi-login-variant"
      />
    </template>
  </v-list-item>
</template>

<script setup>
  // Composables
  import { useAuth0 } from '@auth0/auth0-vue'

  const GITHUB_SHA = import.meta.env.VITE_GITHUB_SHA

  const { loginWithPopup, user, isAuthenticated, logout } = useAuth0()

  function onClick () {
    if (isAuthenticated.value) return

    loginWithPopup()
  }

  function onClickLogout () {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }
</script>
