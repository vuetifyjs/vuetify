<template>
  <v-container>
    <v-text-field class="mx-auto" max-width="400" variant="outlined" hide-details>
      <template v-slot:append-inner>
        <div class="d-flex">
          <v-menu
            :close-on-content-click="false"
            location="top"
            offset="25"
            transition="slide-x-transition"
          >
            <template v-slot:activator="{ props }">
              <v-icon-btn icon="mdi-emoticon" icon-color="yellow" v-bind="props"></v-icon-btn>
            </template>

            <v-card max-width="300">
              <v-text-field
                append-inner-icon="mdi-magnify"
                label="Search"
                hide-details
              ></v-text-field>
              <v-container>

                <div class="d-flex align-center justify-space-between  mt-4">
                  <span class="text-body-2 font-weight-bold"> Emoji's </span>
                  <v-btn size="x-small" variant="text">See all ></v-btn>
                </div>
                <div class="d-flex justify-space-between">
                  <v-btn size="small" variant="text" icon>✨</v-btn>
                  <v-btn size="small" variant="text" icon>🔥</v-btn>
                  <v-btn size="small" variant="text" icon>⭐</v-btn>
                  <v-btn size="small" variant="text" icon>😊</v-btn>
                  <v-btn size="small" variant="text" icon>💀</v-btn>
                  <v-btn size="small" variant="text" icon>😂</v-btn>
                </div>

                <div class="d-flex align-center justify-space-between  mt-4">
                  <span class="text-body-2 font-weight-bold"> Gifs </span>
                  <v-btn size="x-small" variant="text">See all ></v-btn>
                </div>

                <v-slide-group show-arrows="never">
                  <div class="d-flex ga-3">
                    <v-skeleton-loader
                      v-for="n in 7"
                      :key="`gifs-${n}`"
                      class="rounded-lg overflow-hidden"
                      height="96"
                      type="image"
                      width="130"
                    ></v-skeleton-loader>
                  </div>
                </v-slide-group>
                <div class="d-flex align-center justify-space-between mt-4">
                  <span class="text-body-2 font-weight-bold"> Stickers </span>
                  <v-btn size="x-small" variant="text">See all ></v-btn>
                </div>
                <v-slide-group show-arrows="never">
                  <div class="d-flex ga-3">
                    <v-skeleton-loader
                      v-for="n in 7"
                      :key="`stickers-${n}`"
                      class="rounded-lg overflow-hidden"
                      height="96"
                      type="image"
                      width="80"
                    ></v-skeleton-loader>
                  </div>
                </v-slide-group>
              </v-container>
            </v-card>
          </v-menu>
          <v-divider class="mx-2" vertical></v-divider>
          <v-icon-btn icon="mdi-send" icon-size="20"></v-icon-btn>
        </div>
      </template>
    </v-text-field>
  </v-container>
</template>
