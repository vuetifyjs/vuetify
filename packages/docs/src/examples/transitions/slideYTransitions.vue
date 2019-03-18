<template>
  <div class="text-xs-center">
    <v-menu transition="slide-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          color="primary"
          v-on="on"
        >
          Slide Y Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="">
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu transition="slide-y-reverse-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          color="secondary"
          v-on="on"
        >
          Slide Y Reverse Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="">
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
