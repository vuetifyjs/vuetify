<template>
  <PromotedBitterBrains v-if="user.one.ads.enabled" />

  <PromotedCarbon v-if="user.one.ads.enabled" />

  <VoPromotionsCardVuetify v-else-if="user.one.ads.house" />

  <br v-if="user.one.ads.enabled || user.one.ads.house">
</template>

<script setup>
  const user = useUserStore()
</script>
