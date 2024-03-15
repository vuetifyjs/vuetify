<template>
  <PromotedCarbon v-if="!user.disableAds" />

  <br>
</template>

<script setup>
  const user = useUserStore()
</script>
