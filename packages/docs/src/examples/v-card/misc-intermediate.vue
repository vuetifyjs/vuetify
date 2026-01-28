<template>
  <v-card class="d-inline-block mx-auto">
    <v-container>
      <v-row class="justify-space-between">
        <v-col cols="auto">
          <v-img
            height="200"
            src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
            width="200"
          ></v-img>
        </v-col>

        <v-col
          class="text-center ps-0"
          cols="auto"
        >
          <v-row class="flex-column fill-height justify-center" gap="0">
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
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
