<template>
  <div class="d-flex ga-1 justify-center">
    <user-admin-badge :size="size" />

    <user-sponsor-badge :size="size" />

    <user-one-badge :size="size" />
  </div>
</template>

<script setup>
  // Components
  import UserAdminBadge from '@/components/user/badges/UserAdminBadge.vue'
  import UserOneBadge from '@/components/user/badges/UserOneBadge.vue'
  import UserSponsorBadge from '@/components/user/badges/UserSponsorBadge.vue'

  defineProps({ size: [Number, String] })
</script>
