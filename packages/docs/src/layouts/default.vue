<template>
  <v-app>
    <app-settings-drawer />

    <app-bar />

    <app-drawer />

    <v-main>
      <v-container
        :style="style"
        class="pa-4 pa-sm-6 pa-md-8"
        fluid
        tag="section"
      >
        <router-view />
      </v-container>
    </v-main>

    <app-toc />
  </v-app>
</template>

<script lang="ts">
  // Components
  import AppBar from '@/components/app/bar/Bar.vue'
  import AppDrawer from '@/components/app/drawer/Drawer.vue'
  import AppSettingsDrawer from '@/components/app/settings/Drawer.vue'
  import AppToc from '@/components/app/Toc.vue'

  // Composables
  import { useRoute } from 'vue-router'
  import { useAppStore } from '@/store/app'

  // Utilities
  import { computed, defineComponent, onBeforeMount } from 'vue'

  export default defineComponent({
    name: 'DefaultLayout',

    components: {
      AppBar,
      AppDrawer,
      AppSettingsDrawer,
      AppToc,
    },

    setup () {
      const app = useAppStore()
      const route = useRoute()
      const isApi = computed(() => route.name?.toString().startsWith('api-'))
      const style = { maxWidth: isApi.value ? '1368px' : '960px' }

      onBeforeMount(() => {
        app.drawer = null
      })

      return { isApi, style }
    },
  })
</script>
