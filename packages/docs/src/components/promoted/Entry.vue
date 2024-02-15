<template>
  <carbon v-if="!user.disableAds" />

  <br>
</template>

<script setup>
  // Stores
  import { useUserStore } from '@vuetify/one'

  const user = useUserStore()
</script>
