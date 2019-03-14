<template>
  <div class="text-xs-center">
    <v-menu transition="slide-x-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          color="primary"
          v-on="on"
        >
          Slide X Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-tile v-for="n in 5" :key="n" @click="">
          <v-list-tile-title v-text="'Item ' + n"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu transition="slide-x-reverse-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          color="secondary"
          v-on="on"
        >
          Slide X Reverse Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-tile v-for="n in 5" :key="n" @click="">
          <v-list-tile-title v-text="'Item ' + n"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>
