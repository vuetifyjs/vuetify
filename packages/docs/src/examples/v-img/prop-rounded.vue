<template>
  <v-row class="align-stretch">
    <v-col cols="12" sm="6">
      <v-img
        color="red"
        height="180"
        rounded="xl"
        src="https://picsum.photos/300/180?image=503"
      ></v-img>
      <h4 class="my-0 text-center">height</h4>
    </v-col>
    <v-col cols="12" sm="6">
      <v-img
        color="red"
        height="180"
        rounded="xl"
        src="https://picsum.photos/300/180?image=503"
        cover
      ></v-img>
      <h4 class="my-0 text-center">height with cover</h4>
    </v-col>
    <v-col cols="12" sm="6">
      <v-img
        class="mx-auto"
        rounded="xl"
        src="https://picsum.photos/300/180?image=503"
        width="fit-content"
      ></v-img>
      <h4 class="my-0 text-center">width="fit-content"</h4>
    </v-col>
  </v-row>
</template>
