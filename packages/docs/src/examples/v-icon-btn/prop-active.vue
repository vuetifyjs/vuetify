<template>
  <v-toolbar class="px-3 mx-auto" rounded="lg" title="Toolbar">
    <template v-slot:append>
      <v-icon-btn :active="menu" active-color="surface-variant" icon="mdi-dots-vertical">
        <v-icon></v-icon>

        <v-menu v-model="menu" activator="parent" location="bottom end" offset="4">
          <v-list
            bg-color="surface-light"
            class="d-flex flex-column ga-1 pa-1"
            density="compact"
            rounded="lg"
            variant="text"
            slim
          >
            <v-list-item
              prepend-icon="mdi-account-circle-outline"
              rounded="lg"
              title="Account"
              link
            ></v-list-item>

            <v-list-item
              prepend-icon="mdi-cog-outline"
              rounded="lg"
              title="Settings"
              link
            ></v-list-item>

            <v-list-item
              prepend-icon="mdi-logout-variant"
              rounded="lg"
              title="Logout"
              link
            ></v-list-item>
          </v-list>
        </v-menu>
      </v-icon-btn>
    </template>
  </v-toolbar>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const menu = shallowRef(false)
</script>

<script>
  export default {
    data () {
      return {
        menu: false,
      }
    },
  }
</script>
