<template>
  <v-toolbar class="px-3" title="Toolbar">
    <template #append>
      <div class="d-flex ga-2">
        <v-icon-btn icon="mdi-magnify" :opacity="dialog ? 1 : 0.32">
          <v-icon  />

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
      </div>
    </template>
  </v-toolbar>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const menu = shallowRef(false)
  const dialog = shallowRef(false)
</script>
