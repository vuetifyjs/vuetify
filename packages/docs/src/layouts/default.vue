<template>
  <v-app>
    <app-settings-drawer />
    <app-bar />
    <app-drawer />
    <v-main>
      <v-container
        class="pa-4 pa-sm-6 pa-md-8"
        :style="{ maxWidth: isApi ? '1368px' : '960px' }"
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
  import { computed, defineComponent } from 'vue'
  import { useRoute } from 'vue-router'

  import AppSettingsDrawer from '@/components/app/settings/Drawer.vue'
  import AppBar from '@/components/app/bar/Bar.vue'
  import AppToc from '@/components/app/Toc.vue'
  import AppDrawer from '@/components/app/drawer/Drawer.vue'

  export default defineComponent({
    name: 'DefaultLayout',

    components: { AppSettingsDrawer, AppBar, AppToc, AppDrawer },

    setup () {
      const route = useRoute()
      const isApi = computed(() => route.name?.startsWith('api-'))

      return { isApi }
    },
  })
</script>
