<template>
  <carbon
    v-if="!user.disableAds"
    class="mb-4"
  />

  <border-chip
    v-if="auth.isSubscriber && (!user.disableAds || user.dev)"
    :prepend-icon="user.disableAds ? 'mdi-bullhorn-outline' : 'mdi-bullhorn'"
    :text="t('toggle', [t('ads')])"
    class="mb-2"
    @click="onClickDisableAds"
  />
</template>

<script setup>
  // Composables
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/store/user'
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { rpath } from '@/util/routes'

  // Stores
  import { useAuthStore } from '@/store/auth'

  const auth = useAuthStore()
  const router = useRouter()
  const user = useUserStore()
  const { t } = useI18n()

  function onClickDisableAds () {
    if (!auth.isSubscriber) {
      return router.push(rpath('/user/dashboard/'))
    }

    user.disableAds = !user.disableAds
  }
</script>
