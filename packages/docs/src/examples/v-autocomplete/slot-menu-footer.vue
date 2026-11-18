<template>
  <v-container>
    <v-autocomplete
      v-model="model"
      v-model:menu="menu"
      :items="items"
      item-title="value"
      item-value="id"
      hide-details
      multiple
    >
      <template v-slot:menu-footer>
        <div class="d-flex justify-space-between pa-2 border-t">
          <v-btn text="Clear" variant="text" @click="model = []"></v-btn>
          <v-btn text="Done" variant="tonal" @click="menu = false"></v-btn>
        </div>
      </template>
    </v-autocomplete>
  </v-container>
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

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14083-171374"
  }
</example-meta>
