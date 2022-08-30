<template>
  <v-navigation-drawer
    v-model="app.drawer"
    width="300"
  >
    <app-list :items="app.items" nav>
      <template #divider>
        <v-divider class="my-3 mb-4 ms-16" />
      </template>
    </app-list>
  </v-navigation-drawer>
</template>

<script setup>
  // Components
  import AppList from '@/components/app/list/List.vue'

  // Composables
  import { useAppStore } from '@/store/app'

  const app = useAppStore()
</script>
