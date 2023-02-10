<template>
  <v-navigation-drawer
    id="app-drawer"
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

  // Utilities
  import { onMounted } from 'vue'
  import { wait } from '@/util/helpers'

  const app = useAppStore()

  onMounted(async () => {
    await wait(1000)

    const element = document.querySelector('#app-drawer .v-list-item--active:not(.v-list-group__header)')

    if (!element) return

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    })
  })
</script>
