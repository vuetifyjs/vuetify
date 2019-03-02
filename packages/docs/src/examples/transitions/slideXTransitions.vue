<template>
  <div class="text-xs-center">
    <v-menu transition="slide-x-transition">
      <v-btn slot="activator" dark color="primary">Slide X Transition</v-btn>
      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="">
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu transition="slide-x-reverse-transition">
      <v-btn slot="activator" dark color="secondary">Slide X Reverse Transition</v-btn>
      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="">
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
