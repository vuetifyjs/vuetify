<template>
  <v-layout
    justify-center
    wrap
  >
    <v-menu transition="slide-x-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on">
          Slide X Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="n in 5" :key="n" link>
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <div class="mx-3 hidden-sm-and-down"></div>

    <v-menu transition="slide-x-reverse-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="secondary" v-on="on">
          Slide X Reverse Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="n in 5" :key="n" link>
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-layout>
</template>
