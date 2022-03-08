<template>
  <v-navigation-drawer
    v-model="app.drawer"
    width="300"
  >
    <template #prepend>
      <app-drawer-prepend />
    </template>

    <app-list :items="items" nav />
  </v-navigation-drawer>
</template>

<script lang="ts">
  // Components
  import AppDrawerPrepend from './DrawerPrepend.vue'
  import AppList from '@/components/app/list/List.vue'

  // Composables
  import { useAppStore } from '@/store/app'
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { defineComponent } from 'vue'

  // Data
  import nav from '@/data/nav-alpha.json'

  export default defineComponent({
    name: 'AppDrawer',

    components: {
      AppList,
      AppDrawerPrepend,
    },

    setup () {
      const { locale } = useI18n()
      const app = useAppStore()

      return { app, items: nav, locale }
    },
  })
</script>
