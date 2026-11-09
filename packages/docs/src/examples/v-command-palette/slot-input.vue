<template>
  <div class="text-center my-3">
    <v-btn text="Open" @click="model = !model"></v-btn>

    <v-command-palette
      v-model="model"
      v-model:search="search"
      :items="items"
      max-width="500"
    >
      <template v-slot:input="{ props }">
        <v-text-field
          v-model="search"
          v-bind="props"
          autocomplete="off"
          class="pa-2"
          placeholder="Jump to a page..."
          prepend-inner-icon="mdi-compass-outline"
          variant="underlined"
          clearable
          hide-details
        ></v-text-field>
      </template>
    </v-command-palette>
  </div>
</template>

<script setup>
  import { ref, shallowRef } from 'vue'

  const model = shallowRef(false)
  const search = shallowRef('')

  const items = ref([
    { title: 'Dashboard', prependIcon: 'mdi-view-dashboard-outline', value: 'dashboard' },
    { title: 'Projects', prependIcon: 'mdi-folder-outline', value: 'projects' },
    { title: 'Team', prependIcon: 'mdi-account-group-outline', value: 'team' },
    { title: 'Settings', prependIcon: 'mdi-cog-outline', value: 'settings' },
  ])
</script>
