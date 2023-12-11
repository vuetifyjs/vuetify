<template>
  <app-sheet width="250">
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

          <user-badges />
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
  </app-sheet>

  <v-card
    v-if="auth.isOneSubscriber"
    image="https://cdn.vuetifyjs.com/docs/images/one/banners/one-sub-banner.png"
    class="pa-4 text-white font-weight-bold d-flex align-start flex-column mt-2"
    flat
    width="250"
  >
    <div>
      Vuetify One

      <span class="font-weight-light">Subscriber</span>
    </div>

    <div class="text-caption font-weight-regular text-grey-lighten-2 mb-2">
      Since {{ memberSince }}
    </div>

    <border-chip
      :to="rpath('/user/subscriptions/')"
      target="_blank"
      rel="noopener noreferrer"
      text="Manage Subscription"
      theme="dark"
    />
  </v-card>
</template>

<script setup lang="ts">
  // Components
  import DiscordLogin from '@/components/user/DiscordLogin.vue'
  import GithubLogin from '@/components/user/GithubLogin.vue'
  import UserBadges from '@/components/user/UserBadges.vue'

  // Composables
  import { useDate } from 'vuetify'
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { computed } from 'vue'
  import { rpath } from '@/util/routes'

  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'

  const auth = useAuthStore()
  const user = useUserStore()

  const { t } = useI18n()
  const adapter = useDate()

  const memberSince = computed(() => {
    if (!auth.subscription) return ''

    const createdAt = auth.subscription.firstPayment

    if (!adapter.isValid(createdAt)) return ''

    return adapter.format(adapter.date(createdAt), 'monthAndYear')
  })

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
