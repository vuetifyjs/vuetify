<template>
  <v-container fluid>
    <v-row justify="space-around">
      <v-col cols="5">
        <div class="text-h6 mb-1">
          Default (cover)
        </div>
        <div class="subheading">
          Matching
        </div>
        <v-img
          aspect-ratio="1.7"
          src="https://picsum.photos/510/300?random"
        ></v-img>
        <div class="subheading pt-4">
          Too high
        </div>
        <v-img
          aspect-ratio="2"
          src="https://picsum.photos/510/300?random"
        ></v-img>
        <div class="subheading pt-4">
          Too low
        </div>
        <v-img
          aspect-ratio="1.4"
          src="https://picsum.photos/510/300?random"
        ></v-img>
      </v-col>

      <v-col cols="5">
        <div class="text-h6 mb-1">
          Contain
        </div>
        <div class="subheading">
          Matching
        </div>
        <v-img
          aspect-ratio="1.7"
          src="https://picsum.photos/510/300?random"
          contain
        ></v-img>
        <div class="subheading pt-4">
          Too high
        </div>
        <v-img
          aspect-ratio="2"
          src="https://picsum.photos/510/300?random"
          contain
        ></v-img>
        <div class="subheading pt-4">
          Too low
        </div>
        <v-img
          aspect-ratio="1.4"
          src="https://picsum.photos/510/300?random"
          contain
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
