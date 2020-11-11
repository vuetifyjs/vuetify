<template>
  <div class="text-center">
    <v-menu transition="fade-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          Fade Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
        >
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
