<template>
  <v-divider />

  <v-hover>
    <template #default="{ props: hoverProps, isHovering }">
      <div v-bind="hoverProps">
        <v-expand-transition v-if="auth.isSubscriber">
          <drawer-toggle-rail v-if="isHovering" />
        </v-expand-transition>

        <git-hub-login />
      </div>
    </template>
  </v-hover>
</template>

<script setup>
  // Components
  import DrawerToggleRail from '@/components/app/drawer/DrawerToggleRail.vue'
  import GitHubLogin from '@/components/app/GitHubLogin.vue'

  // Stores
  import { useAuthStore } from '@/store/auth'

  const auth = useAuthStore()
</script>
