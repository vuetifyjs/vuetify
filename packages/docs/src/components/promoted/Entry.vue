<template>
  <carbon v-if="user.ads" />
</template>

<script setup>
  import { useUserStore } from '@/store/user'

  const user = useUserStore()
</script>
