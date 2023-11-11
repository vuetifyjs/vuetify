<template>
  <div
    v-if="!auth.user"
    class="pa-2"
  >
    <v-list-item
      nav
      link
      variant="flat"
      base-color="surface-variant"
      :title="t('login.login')"
      append-icon="mdi-login-variant"
    >
      <template #append>
        <v-icon size="small" />
      </template>

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
    </v-list-item>
  </div>
  <v-list-item
    v-else
    :prepend-avatar="user.avatar || auth.user.picture || ''"
    class="px-4"
    rounded="0"
    lines="one"
    nav
  >
    <template #prepend>
      <v-avatar size="small" class="me-n2" />
    </template>

    <template #title>
      <div>{{ auth.user.name }}</div>

      <user-badges size="12" />
    </template>

    <template #append>
      <v-btn
        to="/user/dashboard/"
        :color="isDashboard ? 'primary' : undefined"
        :icon="`mdi-view-dashboard${isDashboard ? '' : '-outline'}`"
        :style="{
          opacity: isDashboard ? 1 : undefined,
        }"
        size="small"
        variant="plain"
      />

      <v-btn
        icon="mdi-logout-variant"
        size="small"
        variant="plain"
        @click="auth.logout()"
      />
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
  import UserBadges from '@/components/user/UserBadges.vue'
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'
  import { useRoute } from 'vue-router'
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'
  import { useI18n } from 'vue-i18n'
  import GithubLogin from '@/components/user/GithubLogin.vue'
  import DiscordLogin from '@/components/user/DiscordLogin.vue'

  const auth = useAuthStore()
  const user = useUserStore()

  const route = useRoute()
  const theme = useTheme()
  const { t } = useI18n()

  const isDashboard = computed(() => route.meta?.category === 'user')
</script>
