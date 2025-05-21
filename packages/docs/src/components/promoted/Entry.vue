<template>
  <PromotedCarbon v-if="!user.disableAds" />

  <VoPromotionsCardVuetify v-else-if="user.showHouseAds" />

  <br v-if="!user.disableAds || user.showHouseAds">
</template>

<script setup>
  const user = useUserStore()
</script>
