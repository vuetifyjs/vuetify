<template>
  <AppSheet width="250">
    <v-skeleton-loader
      :loading="auth.isLoading"
      type="image, paragraph, divider, list-item-avatar"
    >
      <template v-if="!auth.user">
        <v-list class="flex-1-0 d-flex flex-column ga-2">
          <template v-for="button in loginButtons" :key="button">
            <component :is="button" class="mx-2 mb-0" />
          </template>
        </v-list>
      </template>

      <template v-else>
        <div class="text-center py-4 flex-grow-1">
          <v-avatar :image="user.avatar || auth.user.picture || ''" size="80" />

          <v-card-title class="mb-n2">{{ auth.user.name }}</v-card-title>

          <UserUserBadges />
        </div>

        <v-divider />

        <v-list class="flex-grow-1">
          <v-list-subheader class="text-high-emphasis">
            {{ t('dashboard.connected-accounts') }}:
          </v-list-subheader>

          <template v-for="identity in auth.user.identities" :key="identity.id">
            <v-list-item slim>
              <template #prepend>
                <v-avatar
                  :icon="`mdi-${identity.provider}`"
                  rounded="0"
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
  </AppSheet>

  <UserOneSubCard />
</template>

<script setup lang="ts">
  // Components
  import DiscordLogin from '@/components/user/DiscordLogin.vue'
  import GithubLogin from '@/components/user/GithubLogin.vue'

  const auth = useAuthStore()
  const user = useUserStore()

  const { t } = useI18n()

  const loginButtons = computed(() => {
    if (!auth.user) {
      return [GithubLogin, DiscordLogin]
    }
    return Object.fromEntries(
      Object.entries({
        github: GithubLogin,
        discord: DiscordLogin,
      }).filter(([k, v]) => !auth.user!.identities.some((i: any) => i.provider === k))
    )
  })
</script>
