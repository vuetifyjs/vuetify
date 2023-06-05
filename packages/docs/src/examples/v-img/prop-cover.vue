<template>
  <div class="d-flex justify-space-around align-center bg-grey-lighten-4">
    <div class="ma-4">
      <div class="text-subtitle-2">Default</div>
      <v-img
        class="bg-white"
        width="300"
        :aspect-ratio="1"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
      ></v-img>
    </div>

    <div class="ma-4">
      <div class="text-subtitle-2">Cover</div>
      <v-img
        class="bg-white"
        width="300"
        :aspect-ratio="1"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        cover
      ></v-img>
    </div>
  </div>
</template>
