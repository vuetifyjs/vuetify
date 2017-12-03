<template>
  <div class="text-xs-center">
    <v-menu transition="v-scale-transition">
      <v-btn light primary slot="activator">Scale Transition</v-btn>
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
