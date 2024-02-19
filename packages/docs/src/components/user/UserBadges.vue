<template>
  <div class="d-flex ga-1 justify-center">
    <UserBadgesUserAdminBadge :size="size" />

    <UserBadgesUserSponsorBadge :size="size" />

    <UserBadgesUserOneBadge :size="size" />
  </div>
</template>

<script setup>
  defineProps({ size: [Number, String] })
</script>
