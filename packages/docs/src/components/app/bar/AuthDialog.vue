<template>
  <app-btn
    v-if="!auth.user && !auth.isLoading"
    v-bind="{
      [`${lgAndUp ? 'append-' : ''}icon`]: 'mdi-login',
      text: lgAndUp ? 'login.login' : undefined,
    }"
    :rounded="mdAndDown"
    class="ms-1"
    color="primary"
    variant="outlined"
  >
    <v-dialog activator="parent" max-width="480">
      <v-card class="pt-6 pb-1 pb-sm-4 px-4 px-sm-8">
        <v-img
          :src="`https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-${theme.name.value}.svg`"
          class="mb-4"
          height="30"
        />

        <div class="text-center mb-6">
          <v-card-title class="text-h5 mb-1 text-md-h4 font-weight-bold">
            {{ auth.lastLoginProvider() ? t('login.welcome-back') : t('login.to-vuetify') }}
          </v-card-title>

          <v-card-subtitle class="text-wrap">{{ t('login.tagline') }}</v-card-subtitle>
        </div>

        <v-list class="mx-auto" max-width="300" width="100%">
          <GithubLogin class="mb-3" />

          <DiscordLogin />
        </v-list>
      </v-card>
    </v-dialog>
  </app-btn>

  <v-btn
    v-else
    id="login-btn"
    :loading="auth.isLoading"
    class="ms-1"
    icon
  >
    <app-menu
      :disabled="!auth.user || auth.isLoading"
      :items="items"
      :open-on-hover="false"
      activator="parent"
    />

    <v-avatar :image="user.avatar || auth.user?.picture || ''" />

    <template #loader>
      <v-skeleton-loader type="avatar" />
    </template>
  </v-btn>
</template>

<script setup lang="ts">
  // Components
  import GithubLogin from '@/components/user/GithubLogin.vue'
  import DiscordLogin from '@/components/user/DiscordLogin.vue'

  // Composables
  import { useDisplay, useTheme } from 'vuetify'
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'

  // Utilities
  import { rpath } from '@/util/routes'

  const auth = useAuthStore()
  const user = useUserStore()

  const { mdAndDown, lgAndUp } = useDisplay()
  const theme = useTheme()
  const { t } = useI18n()

  const items = [
    { subheader: t('options') },
    {
      title: t('my-dashboard'),
      appendIcon: 'mdi-view-dashboard-outline',
      to: rpath('/user/dashboard/'),
    },
    {
      title: t('login.logout'),
      appendIcon: 'mdi-logout-variant',
      onClick: () => {
        user.railDrawer = false

        auth.logout()
      },
    },
  ]
</script>

<style lang="sass">
  #login-btn
    .v-skeleton-loader__avatar
      min-height: 40px
      height: 40px
      width: 40px
      max-height: 40px
      min-width: 40px
      max-width: 40px
</style>
