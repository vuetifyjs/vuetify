<template>
  <v-card>
    <v-data-iterator
      :items="games"
      :items-per-page="3"
      :search="search"
    >
      <template v-slot:header>
        <v-toolbar class="px-2">
          <v-text-field
            v-model="search"
            density="comfortable"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px;"
            variant="solo"
            clearable
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid>
          <v-row dense>
            <v-col
              v-for="item in items"
              :key="item.title"
              cols="auto"
              md="4"
            >
              <v-card class="pb-3" border flat>
                <v-img :src="item.raw.img"></v-img>

                <v-list-item :subtitle="item.raw.subtitle" class="mb-2">
                  <template v-slot:title>
                    <strong class="text-h6 mb-2">{{ item.raw.title }}</strong>
                  </template>
                </v-list-item>

                <div class="d-flex justify-space-between px-4">
                  <div class="d-flex align-center text-caption text-medium-emphasis me-1">
                    <v-icon icon="mdi-clock" start></v-icon>

                    <div class="text-truncate">{{ item.raw.duration }}</div>
                  </div>

                  <v-btn
                    class="text-none"
                    size="small"
                    text="Read"
                    variant="flat"
                    border
                  >
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn
            :disabled="page === 1"
            density="comfortable"
            icon="mdi-arrow-left"
            variant="tonal"
            rounded
            @click="prevPage"
          ></v-btn>

          <div class="mx-2 text-caption">
            Page {{ page }} of {{ pageCount }}
          </div>

          <v-btn
            :disabled="page >= pageCount"
            density="comfortable"
            icon="mdi-arrow-right"
            variant="tonal"
            rounded
            @click="nextPage"
          ></v-btn>
        </div>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const search = shallowRef('')
  const games = [
    {
      img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/4.png',
      title: 'The Sci-Fi Shooter Experience',
      subtitle: 'Dive into a futuristic world of intense battles and alien encounters.',
      advanced: false,
      duration: '8 minutes',
    },
    {
      img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/2.png',
      title: 'Epic Adventures in Open Worlds',
      subtitle: 'Embark on a journey through vast, immersive landscapes and quests.',
      advanced: true,
      duration: '10 minutes',
    },
    {
      img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/3.png',
      title: 'Surviving the Space Station Horror',
      subtitle: 'Navigate a haunted space station in this chilling survival horror game.',
      advanced: false,
      duration: '9 minutes',
    },
    {
      img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/5.png',
      title: 'Neon-Lit High-Speed Racing Thrills',
      subtitle: 'Experience adrenaline-pumping races in a futuristic, neon-soaked city.',
      advanced: true,
      duration: '12 minutes',
    },
    {
      img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/6.png',
      title: 'Retro-Style Platformer Adventures',
      subtitle: 'Jump and dash through pixelated worlds in this classic-style platformer.',
      advanced: false,
      duration: '11 minutes',
    },
    {
      img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/7.png',
      title: 'Medieval Strategic War Campaigns',
      subtitle: 'Lead armies into epic battles and conquer kingdoms in this strategic war game.',
      advanced: true,
      duration: '10 minutes',
    },
    {
      img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/1.png',
      title: 'Underwater VR Exploration Adventure',
      subtitle: 'Dive deep into the ocean and discover the mysteries of the underwater world.',
      advanced: true,
      duration: '11 minutes',
    },
    {
      img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/8.png',
      title: '1920s Mystery Detective Chronicles',
      subtitle: 'Solve crimes and uncover secrets in the glamorous 1920s era.',
      advanced: false,
      duration: '9 minutes',
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      search: '',
      games: [
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/4.png',
          title: 'The Sci-Fi Shooter Experience',
          subtitle: 'Dive into a futuristic world of intense battles and alien encounters.',
          advanced: false,
          duration: '8 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/2.png',
          title: 'Epic Adventures in Open Worlds',
          subtitle: 'Embark on a journey through vast, immersive landscapes and quests.',
          advanced: true,
          duration: '10 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/3.png',
          title: 'Surviving the Space Station Horror',
          subtitle: 'Navigate a haunted space station in this chilling survival horror game.',
          advanced: false,
          duration: '9 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/5.png',
          title: 'Neon-Lit High-Speed Racing Thrills',
          subtitle: 'Experience adrenaline-pumping races in a futuristic, neon-soaked city.',
          advanced: true,
          duration: '12 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/6.png',
          title: 'Retro-Style Platformer Adventures',
          subtitle: 'Jump and dash through pixelated worlds in this classic-style platformer.',
          advanced: false,
          duration: '11 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/7.png',
          title: 'Medieval Strategic War Campaigns',
          subtitle: 'Lead armies into epic battles and conquer kingdoms in this strategic game.',
          advanced: true,
          duration: '10 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/1.png',
          title: 'Underwater VR Exploration Adventure',
          subtitle: 'Dive deep into the ocean and discover the mysteries of the underwater world.',
          advanced: true,
          duration: '11 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/8.png',
          title: '1920s Mystery Detective Chronicles',
          subtitle: 'Solve crimes and uncover secrets in the glamorous 1920s era.',
          advanced: false,
          duration: '9 minutes',
        },
      ],
    }),
  }
</script>
