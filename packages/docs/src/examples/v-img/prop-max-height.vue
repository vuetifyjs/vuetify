<template>
  <v-container
    class="fill-height"
    style="min-height: 434px"
    fluid
  >
    <v-fade-transition mode="out-in">
      <v-row>
        <v-col cols="6">
          <v-card>
            <v-img
              class="bg-grey-lighten-2"
              height="125"
              src="https://picsum.photos/350/165?random"
            ></v-img>
            <v-card-title class="text-title-large">
              height
            </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card>
            <v-img
              class="bg-grey-lighten-2"
              height="125"
              src="https://picsum.photos/350/165?random"
              cover
            ></v-img>
            <v-card-title class="text-title-large">
              height with cover
            </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card>
            <v-img
              class="bg-grey-lighten-2"
              max-height="125"
              src="https://picsum.photos/350/165?random"
            ></v-img>
            <v-card-title class="text-title-large">
              max-height
            </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card>
            <v-img
              class="bg-grey-lighten-2"
              max-height="125"
              src="https://picsum.photos/350/165?random"
              cover
            ></v-img>
            <v-card-title class="text-title-large">
              max-height with cover
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>
</template>
