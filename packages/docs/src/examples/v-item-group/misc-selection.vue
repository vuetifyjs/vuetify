<template>
  <v-card
    max-width="400"
    class="mx-auto"
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
                cover
                height="150"
                class="text-right pa-2"
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
