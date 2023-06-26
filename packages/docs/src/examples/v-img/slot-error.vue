<template>
  <v-img
    class="mx-auto"
    height="300"
    max-width="500"
    src="https://bad.src/not/valid"
  >
    <template v-slot:error>
      <v-img
        class="mx-auto"
        height="300"
        max-width="500"
        src="https://picsum.photos/500/300?image=232"
      ></v-img>
    </template>
  </v-img>
</template>
