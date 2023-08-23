<template>
  <div
    v-if="!isAuthenticated"
    class="pa-2"
  >
    <v-btn
      block
      class="text-white text-none"
      color="#2a2a2a"
      prepend-icon="mdi-github"
      text="Login w/ GitHub"
      variant="flat"
      @click="loginWithPopup"
    />
  </div>

  <v-list-item
    v-else-if="user"
    :prepend-avatar="user.picture"
    :title="user.name"
    :subtitle="user.email"
    lines="one"
    nav
  >
    <template #prepend>
      <v-avatar size="small" class="me-n2" />
    </template>

    <template #append>
      <v-icon
        icon="mdi-logout-variant"
        size="small"
        @click="onClickLogout"
      />
    </template>
  </v-list-item>
</template>

<script setup>
  // Composables
  import { useAuth0 } from '@auth0/auth0-vue'

  const { loginWithPopup, user, logout, isAuthenticated } = useAuth0()

  function onClickLogout () {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }
</script>
