<template>
  <v-container class="pa-4 text-center">
    <v-row
      align="center"
      class="fill-height"
      justify="center"
    >
      <template v-for="(item, i) in items" :key="i">
        <v-col
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              :class="{ 'on-hover': isHovering }"
              :elevation="isHovering ? 12 : 2"
              v-bind="props"
            >
              <v-img
                :src="item.img"
                height="225px"
                cover
              >
                <v-card-title class="text-h6 text-white d-flex flex-column">
                  <p class="mt-4">
                    {{ item.title }}
                  </p>

                  <div>
                    <p class="ma-0 text-body-1 font-weight-bold">
                      {{ item.text }}
                    </p>
                    <p class="text-caption font-weight-medium">
                      {{ item.subtext }}
                    </p>
                  </div>
                </v-card-title>
                <div class="align-self-center">
                  <v-btn
                    v-for="(icon, index) in icons"
                    :key="index"
                    :class="{ 'show-btns': isHovering }"
                    :color="transparent"
                    :icon="icon"
                    variant="text"
                  ></v-btn>
                </div>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script setup>
  const icons = ['mdi-rewind', 'mdi-play', 'mdi-fast-forward']
  const items = [
    {
      title: 'New Releases',
      text: `It's New Release Friday`,
      subtext: 'Newly released songs.',
      img: 'https://cdn.vuetifyjs.com/docs/images/cards/hands.jpg',
    },
    {
      title: 'Rock',
      text: 'Greatest Rock Hits',
      subtext: 'Lose yourself in rock tunes.',
      img: 'https://cdn.vuetifyjs.com/docs/images/cards/singer.jpg',
    },
    {
      title: 'Mellow Moods',
      text: 'Ambient Bass',
      subtext: 'Chill beats to mellow you out.',
      img: 'https://cdn.vuetifyjs.com/docs/images/cards/concert.jpg',
    },
  ]
  const transparent = 'rgba(255, 255, 255, 0)'
</script>

<script>
  export default {
    data: () => ({
      icons: ['mdi-rewind', 'mdi-play', 'mdi-fast-forward'],
      items: [
        {
          title: 'New Releases',
          text: `It's New Release Friday`,
          subtext: 'Newly released songs.',
          img: 'https://cdn.vuetifyjs.com/docs/images/cards/hands.jpg',
        },
        {
          title: 'Rock',
          text: 'Greatest Rock Hits',
          subtext: 'Lose yourself in rock tunes.',
          img: 'https://cdn.vuetifyjs.com/docs/images/cards/singer.jpg',
        },
        {
          title: 'Mellow Moods',
          text: 'Ambient Bass',
          subtext: 'Chill beats to mellow you out.',
          img: 'https://cdn.vuetifyjs.com/docs/images/cards/concert.jpg',
        },
      ],
      transparent: 'rgba(255, 255, 255, 0)',
    }),
  }
</script>

<style scoped>
  .v-card {
    transition: opacity .4s ease-in-out;
  }

  .v-card:not(.on-hover) {
    opacity: 0.6;
  }

  .show-btns {
    color: rgba(255, 255, 255, 1) !important;
  }
</style>
