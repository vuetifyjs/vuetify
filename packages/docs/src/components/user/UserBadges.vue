<template>
  <user-admin-badge :size="size" />

  <user-sponsor-badge :size="size" />
</template>

<script setup>
  // Components
  import UserAdminBadge from '@/components/user/badges/UserAdminBadge.vue'
  import UserSponsorBadge from '@/components/user/badges/UserSponsorBadge.vue'

  defineProps({ size: [Number, String] })
</script>
