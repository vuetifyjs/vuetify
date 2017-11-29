<template>
  <v-tabs grow>
    <v-tabs-bar color="purple" dark>
      <v-tabs-slider color="purple lighten-3"></v-tabs-slider>
      <v-tabs-item
        v-for="i in 3"
        :key="i"
        :href="'#mobile-tabs-1-' + i" ripple
      >
          Item {{ i }}
      </v-tabs-item>
    </v-tabs-bar>
  </v-tabs>
</template>
