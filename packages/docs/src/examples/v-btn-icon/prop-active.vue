<template>
  <v-toolbar class="px-3" title="Toolbar">
    <template #append>
      <div class="d-flex ga-2">
        <v-icon-btn icon="mdi-magnify">
        <v-icon />

        <v-dialog v-model="dialog" activator="parent" width="400">
          <v-card title="Find in page">
            <v-card-text>
              <v-text-field label="Search" hide-details="auto" />
            </v-card-text>

            <template #actions>
              <v-btn text="Cancel" variant="plain" @click="dialog = false"></v-btn>

              <v-btn text="Search" @click="dialog = false"></v-btn>
            </template>
          </v-card>
        </v-dialog>
      </v-icon-btn>

      <v-icon-btn icon="mdi-dots-vertical" active-color="surface-variant" :active="menu">
        <v-icon />

        <v-menu v-model="menu" activator="parent" offset="4">
          <v-list rounded="lg" class="d-flex flex-column ga-1 pa-1" variant="text" slim density="compact" bg-color="surface-light">
            <v-list-item prepend-icon="mdi-account-circle" title="Account" link rounded="lg"></v-list-item>
            <v-list-item prepend-icon="mdi-cog" title="Settings" link rounded="lg"></v-list-item>
            <v-list-item prepend-icon="mdi-logout" title="Logout" link rounded="lg"></v-list-item>
          </v-list>
        </v-menu>
      </v-icon-btn>
      </div>
    </template>
  </v-toolbar>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const menu = shallowRef(false)
  const dialog = shallowRef(false)
</script>
