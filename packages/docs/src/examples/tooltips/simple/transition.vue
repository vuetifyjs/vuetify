<template>
  <div class="text-xs-center">
    <v-tooltip
      top
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="mx-2"
          color="info"
          dark
          v-on="on"
        >
          Scale
        </v-btn>
      </template>
      <span>scale transtion</span>
    </v-tooltip>

    <v-tooltip
      top
      transition="fade-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          class="mx-2"
          color="info"
          dark
          v-on="on"
        >
          Fade
        </v-btn>
      </template>
      <span>fade transtion</span>
    </v-tooltip>
  </div>
</template>
