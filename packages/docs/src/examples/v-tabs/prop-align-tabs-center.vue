<template>
  <v-card>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      color="deep-purple-accent-4"
    >
      <v-tab :value="1">Landscape</v-tab>
      <v-tab :value="2">City</v-tab>
      <v-tab :value="3">Abstract</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        v-for="n in 3"
        :key="n"
        :value="n"
      >
        <v-container fluid>
          <v-row>
            <v-col
              v-for="i in 6"
              :key="i"
              cols="12"
              md="4"
            >
              <v-img
                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                aspect-ratio="1"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const tab = ref(null)
</script>

<script>
  export default {
    data: () => ({
      tab: null,
    }),
  }
</script>
