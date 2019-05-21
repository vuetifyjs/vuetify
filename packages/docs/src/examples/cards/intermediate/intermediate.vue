<template>
  <v-card
    max-width="344"
    class="mx-auto"
  >
    <v-layout
      py-3
      pl-3
    >
      <v-flex shrink>
        <v-img
          height="200"
          width="200"
          src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
        ></v-img>
      </v-flex>
      <v-flex text-xs-center>
        <v-container
          grid-list-lg
          pa-0
        >
          <v-layout column>
            <v-flex>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-flex>
            <v-flex>
              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
            </v-flex>
            <v-flex>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-card>
</template>
