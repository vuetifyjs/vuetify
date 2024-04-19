<template>
  <div class="d-flex justify-space-around align-center bg-grey-lighten-4">
    <div class="ma-4">
      <div class="text-subtitle-2">Default</div>
      <v-img
        :aspect-ratio="1"
        class="bg-white"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        width="300"
      ></v-img>
    </div>

    <div class="ma-4">
      <div class="text-subtitle-2">Cover</div>
      <v-img
        :aspect-ratio="1"
        class="bg-white"
        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        width="300"
        cover
      ></v-img>
    </div>
  </div>
</template>
