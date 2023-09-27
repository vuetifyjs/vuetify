<template>
  <app-sheet width="250">
    <v-skeleton-loader
      :loading="isLoading"
      type="image, paragraph, divider, list-item-avatar"
      width="100%"
    >
      <div class="text-center py-4 flex-grow-1">
        <v-avatar :image="user.picture" size="80" />

        <v-card-title class="mb-n2">{{ user.name }}</v-card-title>

        <v-card-subtitle class="mb-2">{{ user.email }}</v-card-subtitle>

        <user-badges />
      </div>

      <v-divider />

      <v-list class="flex-grow-1">
        <v-list-subheader>Connected Accounts</v-list-subheader>

        <v-list-item>
          <template #prepend>
            <v-avatar
              class="me-n3"
              image="https://cdn.vuetifyjs.com/docs/images/logos/github.png"
              size="28"
            />
          </template>

          <template #title>
            <strong>GitHub:</strong>
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

  const { isLoading, user } = useAuth0()
</script>
