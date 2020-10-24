<template>
  <div class="text-center">
    <v-menu
      transition="scale-transition"
      origin="center center"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          dark
          color="primary"
          v-bind="attrs"
          v-on="on"
        >
          Scale Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          @click="() => {}"
        >
          <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
