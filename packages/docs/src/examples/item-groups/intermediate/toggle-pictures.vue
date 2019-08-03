<template>
  <v-card
    max-width="400"
    class="mx-auto"
  >
    <v-container
      grid-list-sm
      pa-1
    >
      <v-item-group
        v-model="selected"
        multiple
      >
        <v-layout wrap>
          <v-flex
            v-for="(item, i) in items"
            :key="i"
            xs12
            md6
          >
            <v-item v-slot:default="{ active, toggle }">
              <v-img
                :src="`https://cdn.vuetifyjs.com/images/${item.src}`"
                height="150"
                class="text-right pa-2"
                @click="toggle"
              >
                <v-btn
                  icon
                  dark
                >
                  <v-icon>
                    {{ active ? 'mdi-heart' : 'mdi-heart-outline' }}
                  </v-icon>
                </v-btn>
              </v-img>
            </v-item>
          </v-flex>
        </v-layout>
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
      selected: [],
    }),
  }
</script>
