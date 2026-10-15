<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-container class="pa-1">
      <v-item-group
        v-model="selection"
        multiple
      >
        <v-row>
          <v-col
            v-for="(item, i) in items"
            :key="i"
            cols="12"
            md="6"
          >
            <v-item v-slot="{ isSelected, toggle }">
              <v-img
                :src="`https://cdn.vuetifyjs.com/images/${item.src}`"
                class="text-right pa-2"
                height="150"
                cover
                @click="toggle"
              >
                <v-btn :icon="isSelected ? 'mdi-heart' : 'mdi-heart-outline'"></v-btn>
              </v-img>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const items = [
    {
      src: 'backgrounds/bg.jpg',
    },
    {
      src: 'backgrounds/md.jpg',
    },
    {
      src: 'backgrounds/bg-2.jpg',
    },
    {
      src: 'backgrounds/md2.jpg',
    },
  ]

  const selection = ref([])
</script>

<script>
  export default {
    data: () => ({
      items: [
        {
          src: 'backgrounds/bg.jpg',
        },
        {
          src: 'backgrounds/md.jpg',
        },
        {
          src: 'backgrounds/bg-2.jpg',
        },
        {
          src: 'backgrounds/md2.jpg',
        },
      ],
      selection: [],
    }),
  }
</script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14400-140885"
}
</example-meta>
