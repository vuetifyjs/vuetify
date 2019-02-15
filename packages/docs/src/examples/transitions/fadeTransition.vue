<template>
  <div class="text-xs-center">
    <v-menu transition="fade-transition">
      <template #activator="{ on: menu }">
        <v-btn
          dark
          color="primary"
          v-on="menu"
        >
          Fade Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-tile v-for="n in 5" :key="n" @click="">
          <v-list-tile-title v-text="'Item ' + n"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>
