<template>
  <v-row justify="center">
    <v-menu transition="slide-x-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          class="ma-2"
          v-bind="attrs"
          v-on="on"
        >
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

    <div class="mx-6 hidden-sm-and-down"></div>

    <v-menu transition="scroll-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="secondary"
          class="ma-2"
          v-bind="attrs"
          v-on="on"
        >
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
  </v-row>
</template>
