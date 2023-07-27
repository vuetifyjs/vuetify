<template>
  <v-container class="pa-4 text-center">
    <v-row
      class="fill-height"
      align="center"
      justify="center"
    >
      <template v-for="(item, i) in items">
        <v-col
          :key="i"
          cols="12"
          md="4"
        >
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 2"
              :class="{ 'on-hover': hover }"
            >
              <v-img
                :src="item.img"
                height="225px"
              >
                <v-card-title class="text-h6 white--text">
                  <v-row
                    class="fill-height flex-column"
                    justify="space-between"
                  >
                    <p class="mt-4 subheading text-left">
                      {{ item.title }}
                    </p>

                    <div>
                      <p class="ma-0 text-body-1 font-weight-bold font-italic text-left">
                        {{ item.text }}
                      </p>
                      <p class="text-caption font-weight-medium font-italic text-left">
                        {{ item.subtext }}
                      </p>
                    </div>

                    <div class="align-self-center">
                      <v-btn
                        v-for="(icon, index) in icons"
                        :key="index"
                        :class="{ 'show-btns': hover }"
                        :color="transparent"
                        icon
                      >
                        <v-icon
                          :class="{ 'show-btns': hover }"
                          :color="transparent"
                        >
                          {{ icon }}
                        </v-icon>
                      </v-btn>
                    </div>
                  </v-row>
                </v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

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
