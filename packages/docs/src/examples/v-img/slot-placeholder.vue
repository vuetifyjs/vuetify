<template>
  <v-img
    class="mx-auto"
    height="300"
    lazy-src="https://picsum.photos/id/11/100/60"
    max-width="500"
    src="https://bad.src/not/valid"
  >
    <template v-slot:placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
  </v-img>
</template>
