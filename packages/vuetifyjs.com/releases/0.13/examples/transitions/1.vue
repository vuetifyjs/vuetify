<template>
  <div class="text-xs-center">
    <v-menu transition="slide-x-transition">
      <v-btn dark primary slot="activator">Slide X Transition</v-btn>
      <v-list>
        <v-list-tile v-for="n in 5" :key="n">
          <v-list-tile-title v-text="'Item ' + n"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu transition="slide-x-reverse-transition">
      <v-btn dark secondary slot="activator">Slide X Reverse Transition</v-btn>
      <v-list>
        <v-list-tile v-for="n in 5" :key="n">
          <v-list-tile-title v-text="'Item ' + n"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>
