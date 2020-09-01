<template>
  <v-container fluid>
    <v-row justify="space-around">
      <v-col cols="5">
        <div class="title mb-1">
          Default (cover)
        </div>
        <div class="subheading">
          Matching
        </div>
        <v-img
          src="https://picsum.photos/510/300?random"
          aspect-ratio="1.7"
        ></v-img>
        <div class="subheading pt-4">
          Too high
        </div>
        <v-img
          src="https://picsum.photos/510/300?random"
          aspect-ratio="2"
        ></v-img>
        <div class="subheading pt-4">
          Too low
        </div>
        <v-img
          src="https://picsum.photos/510/300?random"
          aspect-ratio="1.4"
        ></v-img>
      </v-col>

      <v-col cols="5">
        <div class="title mb-1">
          Contain
        </div>
        <div class="subheading">
          Matching
        </div>
        <v-img
          src="https://picsum.photos/510/300?random"
          aspect-ratio="1.7"
          contain
        ></v-img>
        <div class="subheading pt-4">
          Too high
        </div>
        <v-img
          src="https://picsum.photos/510/300?random"
          aspect-ratio="2"
          contain
        ></v-img>
        <div class="subheading pt-4">
          Too low
        </div>
        <v-img
          src="https://picsum.photos/510/300?random"
          aspect-ratio="1.4"
          contain
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
