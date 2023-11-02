<template>
  <v-list-item
    :title="t(auth.user ? 'login.connect-discord' : 'login.with-discord')"
    nav
    base-color="#5865F2"
    prepend-icon="mdi-discord"
    variant="flat"
    @click="auth.login('discord')"
  >
    <template #prepend>
      <v-icon class="me-n6" />
    </template>

    <template #subtitle>
      <span v-if="!auth.user && auth.lastLoginProvider() === 'discord'">
        {{ t('login.last-used') }}
      </span>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n'
  import { useAuthStore } from '@/store/auth'

  const auth = useAuthStore()

  const { t } = useI18n()
</script>
