<template>
  <app-sheet width="250">
    <v-skeleton-loader
      :loading="auth.isLoading"
      type="image, paragraph, divider, list-item-avatar"
    >
      <template v-if="!auth.user">
        <v-list class="flex-1-0">
          <template v-for="button in loginButtons" :key="button">
            <component :is="button" class="mx-2" />
          </template>
        </v-list>
      </template>
      <template v-else>
        <div class="text-center py-4 flex-grow-1">
          <v-avatar :image="user.avatar || auth.user.picture || ''" size="80" />

          <v-card-title class="mb-n2">{{ auth.user.name }}</v-card-title>

          <user-badges />
        </div>

        <v-divider />

        <v-list class="flex-grow-1">
          <v-list-subheader class="text-high-emphasis">
            {{ t('dashboard.connected-accounts') }}:
          </v-list-subheader>

          <template v-for="identity in auth.user.identities" :key="identity.id">
            <v-list-item>
              <template #prepend>
                <v-avatar
                  class="me-n3"
                  :icon="`mdi-${identity.provider}`"
                  size="25"
                />
              </template>

              <template #title>
                <strong class="text-medium-emphasis">{{ t(identity.provider) }}:</strong>
              </template>

              <template #append>
                <div class="text-caption text-medium-emphasis">{{ identity.userHandle }}</div>
              </template>
            </v-list-item>
          </template>
          <template v-for="button in loginButtons" :key="button">
            <component :is="button" class="mx-2" />
          </template>
        </v-list>
      </template>
    </v-skeleton-loader>
  </app-sheet>
</template>

<script setup lang="ts">
  // Components
  import UserBadges from '@/components/user/UserBadges.vue'
  import GithubLogin from '@/components/user/GithubLogin.vue'
  import DiscordLogin from '@/components/user/DiscordLogin.vue'

  // Composables
  import { useI18n } from 'vue-i18n'
  import { computed } from 'vue'

  // Stores
  import { useUserStore } from '@/store/user'
  import { useAuthStore } from '@/store/auth'

  const user = useUserStore()
  const auth = useAuthStore()

  const { t } = useI18n()

  const loginButtons = computed(() => {
    if (!auth.user) {
      return [GithubLogin, DiscordLogin]
    }
    return Object.fromEntries(
      Object.entries({
        github: GithubLogin,
        discord: DiscordLogin,
      }).filter(([k, v]) => !auth.user!.identities.some(i => i.provider === k))
    )
  })
</script>
