<template>
  <div class="text-xs-center">
    <v-menu transition="slide-y-transition">
      <v-btn slot="activator" dark color="primary">Slide Y Transition</v-btn>
      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="">
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu transition="slide-y-reverse-transition">
      <v-btn slot="activator" dark color="primary">Slide Y Reverse Transition</v-btn>
      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="">
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
