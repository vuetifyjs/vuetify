<template>
  <v-app>
    <app-settings-drawer />
    <app-bar />
    <app-drawer />
    <v-main>
      <v-container
        class="pa-4 pa-sm-6 pa-md-8"
        fluid
        tag="section"
      >
        <v-responsive :max-width="868" class="mx-auto overflow-visible">
          <router-view />
        </v-responsive>
      </v-container>
    </v-main>
    <app-toc />
  </v-app>
</template>

<script lang="ts">
// Utilities
  import { defineComponent } from 'vue'

  import AppSettingsDrawer from '@/components-v3/app/settings/Drawer.vue'
  import AppBar from '@/components-v3/app/bar/index.vue'
  import AppToc from '@/components-v3/app/Toc.vue'
  import AppDrawer from '@/components-v3/app/drawer/index.vue'

  export default defineComponent({
    name: 'DefaultLayout',

    components: { AppSettingsDrawer, AppBar, AppToc, AppDrawer },
  })
</script>
