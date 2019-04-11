<template>
  <v-layout justify-center>
    <v-menu transition="slide-x-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on">
          Slide X Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          link
        >
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <div class="mx-4"></div>

    <v-menu transition="scroll-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="secondary" v-on="on">
          Scroll Y Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          link
        >
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-layout>
</template>
