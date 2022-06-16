<template>
  <v-row justify="center">
    <v-img
      src="https://bad.src/not/valid"
      lazy-src="https://picsum.photos/id/11/100/60"
      max-width="500"
      max-height="300"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular
            indeterminate
            color="grey-lighten-4"
          ></v-progress-circular>
        </div>
      </template>
    </v-img>
  </v-row>
</template>
