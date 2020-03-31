<template>
  <div class="text-center">
    <v-menu transition="fab-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          dark
          color="primary"
          v-on="on"
        >
          Fab Transition
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
