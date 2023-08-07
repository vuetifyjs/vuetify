<template>
  <v-list-item
    :prepend-avatar="user?.picture"
    :prepend-icon="isAuthenticated ? undefined : 'mdi-github'"
    :title="isAuthenticated ? user?.name : 'Login w/ GitHub'"
    :subtitle="user?.email"
    :link="!isAuthenticated"
    lines="two"
    nav
    @click="onClick"
  >
    <template #append>
      <v-icon
        v-if="isAuthenticated"
        icon="mdi-logout-variant"
        size="small"
        @click="onClickLogout"
      />

      <v-icon
        v-else
        icon="mdi-login-variant"
        size="small"
      />
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
