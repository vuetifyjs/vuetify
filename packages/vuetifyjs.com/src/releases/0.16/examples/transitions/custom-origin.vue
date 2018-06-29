<template>
  <div class="text-xs-center">
    <v-menu transition="scale-transition" origin="center center">
      <v-btn dark color="primary" slot="activator">Scale Transition</v-btn>
      <v-list>
        <v-list-tile v-for="n in 5" :key="n" @click="">
          <v-list-tile-title v-text="'Item ' + n"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>
