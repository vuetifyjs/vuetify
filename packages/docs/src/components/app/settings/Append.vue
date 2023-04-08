<template>
  <v-divider />

  <v-list-item
    :prepend-avatar="user?.picture"
    :prepend-icon="isAuthenticated ? undefined : 'mdi-github'"
    :append-icon="isAuthenticated ? 'mdi-logout-variant' : 'mdi-login-variant'"
    :title="isAuthenticated ? user?.name : 'Login w/ GitHub'"
    :subtitle="user?.email"
    :link="!isAuthenticated"
    lines="two"
    @click="onClick"
  >
    <template #append>
      <v-icon v-if="isAuthenticated" @click="onClickLogout" />
      <v-icon v-else />
    </template>
  </v-list-item>
</template>

<script setup>
  // Composables
  import { useAuth0 } from '@auth0/auth0-vue'

  const { loginWithPopup, user, isAuthenticated, logout } = useAuth0()

  function onClick () {
    if (isAuthenticated.value) return

    loginWithPopup()
  }

  function onClickLogout () {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }
</script>
