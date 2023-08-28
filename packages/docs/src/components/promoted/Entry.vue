<template>
  <carbon v-if="!user.disableAds" />
</template>

<script setup>
  import { useUserStore } from '@/store/user'

  const user = useUserStore()
</script>
