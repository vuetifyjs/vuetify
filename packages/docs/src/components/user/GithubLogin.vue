<template>
  <v-list-item
    :title="t(auth.user ? 'login.connect-github' : 'login.with-github')"
    nav
    base-color="#2a2a2a"
    prepend-icon="mdi-github"
    variant="flat"
    @click="auth.login('github')"
  >
    <template #prepend>
      <v-icon class="me-n6" />
    </template>

    <template #subtitle>
      <span v-if="!auth.user && auth.lastLoginProvider() === 'github'">
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
