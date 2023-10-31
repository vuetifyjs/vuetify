<template>
  <v-divider />

  <v-hover>
    <template #default="{ props: hoverProps, isHovering }">
      <div v-bind="hoverProps">
        <v-expand-transition v-if="user.railDrawer || auth.isSubscriber">
          <drawer-toggle-rail v-if="isHovering" />
        </v-expand-transition>

        <AuthBox />
      </div>
    </template>
  </v-hover>
</template>

<script setup lang="ts">
  // Components
  import DrawerToggleRail from '@/components/app/drawer/DrawerToggleRail.vue'
  import AuthBox from '@/components/app/drawer/AuthBox.vue'

  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'

  const auth = useAuthStore()
  const user = useUserStore()
</script>
