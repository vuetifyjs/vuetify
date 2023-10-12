<template>
  <app-sheet width="250">
    <v-skeleton-loader
      :loading="isLoading || !user"
      type="image, paragraph, divider, list-item-avatar"
    >
      <div class="text-center py-4 flex-grow-1">
        <v-avatar :image="user.picture" size="80" />

        <v-card-title class="mb-n2">{{ user.name }}</v-card-title>

        <a
          :href="`https://github.com/${user.nickname}`"
          class="text-decoration-none text-medium-emphasis d-flex align-center justify-center mb-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <v-card-subtitle class="px-0">@{{ user.nickname }}</v-card-subtitle>

          <v-icon
            class="ms-1"
            color="medium-emphasis"
            icon="mdi-open-in-new"
            size="13"
          />
        </a>

        <user-badges />
      </div>

      <v-divider />

      <v-list class="flex-grow-1">
        <v-list-subheader class="text-high-emphasis">
          {{ t('dashboard.connected-accounts') }}:
        </v-list-subheader>

        <v-list-item>
          <template #prepend>
            <v-avatar
              class="me-n3"
              color="white"
              image="https://cdn.vuetifyjs.com/docs/images/logos/github.png"
              size="25"
            />
          </template>

          <template #title>
            <strong class="text-medium-emphasis">{{ t('github') }}:</strong>
          </template>

          <template #append>
            <div class="text-caption text-medium-emphasis">{{ user.sub }}</div>
          </template>
        </v-list-item>
      </v-list>
    </v-skeleton-loader>
  </app-sheet>
</template>

<script setup>
  // Components
  import UserBadges from '@/components/user/UserBadges.vue'

  // Composables
  import { useAuth0 } from '@/plugins/auth'
  import { useI18n } from 'vue-i18n'

  const { isLoading, user } = useAuth0()
  const { t } = useI18n()
</script>
