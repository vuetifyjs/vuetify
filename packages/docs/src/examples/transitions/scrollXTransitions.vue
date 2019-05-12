<template>
  <v-layout
    justify-center
    wrap
  >
    <v-menu transition="scroll-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on">
          Scroll Y Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="n in 5" :key="n" link>
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <div class="mx-3 hidden-sm-and-down"></div>

    <v-menu transition="scroll-y-reverse-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="secondary" v-on="on">
          Scroll Y Reverse Transition
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
