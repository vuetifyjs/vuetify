<template>
  <v-select
    v-model="model"
    v-model:menu="menu"
    :items="items"
    item-title="value"
    item-value="id"
    label="Select with menu header and footer"
    chips
    closable-chips
    multiple
  >
    <template v-slot:menu-header>
      <div class="pa-2 border-b">
        <v-text-field
          append-inner-icon="$close"
          density="compact"
          placeholder="Search..."
          prepend-inner-icon="mdi-magnify"
          hide-details
          @click:append-inner="menu = false"
        ></v-text-field>
      </div>
    </template>
    <template v-slot:menu-footer>
      <div class="d-flex justify-space-between pa-2 border-t">
        <v-btn text="Clear" variant="text" @click="model = []"></v-btn>
        <v-btn text="Done" variant="tonal" @click="menu = false"></v-btn>
      </div>
    </template>
  </v-select>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const items = Array.from({ length: 50 }, (_, i) => ({ id: i, value: `Item ${i + 1}` }))

  const model = shallowRef([])
  const menu = shallowRef(false)
</script>

<script>
  export default {
    data: () => ({
      items: Array.from({ length: 50 }, (_, i) => ({ id: i, value: `Item ${i + 1}` })),
      model: [],
      menu: false,
    }),
  }
</script>
