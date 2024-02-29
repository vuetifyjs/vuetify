<template>
  <v-card
    class="mx-auto"
    max-width="360"
    variant="flat"
    border
  >
    <v-layout>
      <v-system-bar class="ga-1" color="surface-light">
        <v-icon icon="mdi-square" size="x-small"></v-icon>

        <v-icon icon="mdi-circle" size="x-small"></v-icon>

        <v-icon icon="mdi-triangle" size="x-small"></v-icon>
      </v-system-bar>

      <v-app-bar title="My Library">
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <template v-slot:extension>
          <v-tabs v-model="tabs" color="#4c00d5" grow>
            <v-tab text="My Movies"></v-tab>

            <v-tab text="My Tv Shows"></v-tab>
          </v-tabs>
        </template>
      </v-app-bar>

      <v-main>
        <div class="pt-4 pb-16">
          <v-window v-model="tabs">
            <v-window-item class="pa-2" value="0">
              <v-card>
                <v-empty-state
                  class="pa-0"
                  image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-cat.svg"
                  size="200"
                >
                  <template v-slot:media>
                    <v-sheet class="py-4 mb-4" color="#fdefff">
                      <v-img></v-img>
                    </v-sheet>
                  </template>

                  <template v-slot:title>
                    <div class="text-h6 text-high-emphasis">Get Started</div>
                  </template>

                  <template v-slot:text>
                    <div class="text-body-2 font-weight-medium text-medium-emphasis">
                      Find a great movie, then relax and enjoy with the Movies & TV app.
                    </div>
                  </template>

                  <template v-slot:actions>
                    <v-spacer></v-spacer>

                    <v-btn color="#4c00d5" text="Shop Movies"></v-btn>

                    <v-spacer></v-spacer>
                  </template>
                </v-empty-state>
              </v-card>
            </v-window-item>

            <v-window-item class="pa-2" value="0">
              <v-card>
                <v-empty-state
                  class="pa-0"
                  image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-dog.svg"
                  size="200"
                >
                  <template v-slot:media>
                    <v-sheet class="py-4 mb-4" color="#fdefff">
                      <v-img></v-img>
                    </v-sheet>
                  </template>

                  <template v-slot:title>
                    <div class="text-h6 text-high-emphasis">Get Started</div>
                  </template>

                  <template v-slot:text>
                    <div class="text-body-2 font-weight-medium text-medium-emphasis">
                      Watch your favorite TV Shows with the Movies & TV app.
                    </div>
                  </template>

                  <template v-slot:actions>
                    <v-spacer></v-spacer>

                    <v-btn color="#4c00d5" text="Shop TV Shows"></v-btn>

                    <v-spacer></v-spacer>
                  </template>
                </v-empty-state>
              </v-card>
            </v-window-item>
          </v-window>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const tabs = shallowRef(0)
</script>

<script>
  export default {
    data: () => ({
      tabs: 0,
    }),
  }
</script>
