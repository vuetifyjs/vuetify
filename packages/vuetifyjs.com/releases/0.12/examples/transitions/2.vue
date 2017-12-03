<template>
  <div class="text-xs-center">
    <v-menu transition="v-slide-y-transition">
      <v-btn light primary slot="activator">Slide Y Transition</v-btn>
      <v-list>
        <v-list-item v-for="n in 5" :key="n">
          <v-list-tile>
            <v-list-tile-title v-text="'Item ' + n"></v-list-tile-title>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu transition="v-slide-y-reverse-transition">
      <v-btn light primary slot="activator">Slide Y Reverse Transition</v-btn>
      <v-list>
        <v-list-item v-for="n in 5" :key="n">
          <v-list-tile>
            <v-list-tile-title v-text="'Item ' + n"></v-list-tile-title>
          </v-list-tile>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
