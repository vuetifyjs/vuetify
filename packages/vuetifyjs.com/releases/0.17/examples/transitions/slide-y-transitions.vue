<template>
  <div class="text-xs-center">
    <v-menu transition="slide-y-transition">
      <v-btn dark color="primary" slot="activator">Slide Y Transition</v-btn>
      <v-list>
        <v-list-tile v-for="n in 5" :key="n" @click="">
          <v-list-tile-title v-text="'Item ' + n"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
    <v-menu transition="slide-y-reverse-transition">
      <v-btn dark color="primary" slot="activator">Slide Y Reverse Transition</v-btn>
      <v-list>
        <v-list-tile v-for="n in 5" :key="n" @click="">
          <v-list-tile-title v-text="'Item ' + n"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>
