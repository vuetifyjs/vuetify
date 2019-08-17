<template>
  <v-card
    max-width="344"
    class="mx-auto"
  >
    <v-row
      class="py-4 pl-4"
    >
      <v-col class="shrink">
        <v-img
          height="200"
          width="200"
          src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
        ></v-img>
      </v-col>
      <v-col class="text-center">
        <v-container class="pa-0">
          <v-row>
            <v-col>
              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>
