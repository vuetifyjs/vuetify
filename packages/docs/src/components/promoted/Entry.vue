<template>
  <carbon v-if="!user.disableAds" />

  <app-btn
    v-if="!user.disableAds || user.dev"
    :text="user.disableAds ? 'dashboard.perks.enable-ads' : 'dashboard.perks.disable-ads'"
    class="text-caption text-none mb-5 mt-2"
    color="surface-variant"
    prepend-icon="$vuetify"
    variant="flat"
    @click="onClickDisableAds"
  />
</template>

<script setup>
  // Composables
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/user'

  // Utilities
  import { rpath } from '@/util/routes'

  // Stores
  import { useAuthStore } from '@/store/auth'

  const auth = useAuthStore()
  const router = useRouter()
  const user = useUserStore()

  function onClickDisableAds () {
    if (!auth.isSubscriber) {
      return router.push(rpath('/user/dashboard/'))
    }

    user.disableAds = !user.disableAds
  }
</script>
