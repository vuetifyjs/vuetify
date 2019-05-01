<template>
  <div class="text-xs-center">
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
        >
          Button
        </v-btn>
      </template>
      <span>I'm a basic tooltip component.</span>
    </v-tooltip>
  </div>
</template>
