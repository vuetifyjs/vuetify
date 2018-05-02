<template>
  <div class="text-xs-center">
    <v-tooltip left>
      <v-btn slot="activator" dark color="primary">Left</v-btn>
      <span>Left tooltip</span>
    </v-tooltip>
    <v-tooltip top>
      <v-btn slot="activator" dark color="primary">Top</v-btn>
      <span>Top tooltip</span>
    </v-tooltip>
    <v-tooltip bottom>
      <v-btn slot="activator" dark color="primary">Bottom</v-btn>
      <span>Bottom tooltip</span>
    </v-tooltip>
    <v-tooltip right>
      <v-btn slot="activator" dark color="primary">Right</v-btn>
      <span>Right tooltip</span>
    </v-tooltip>
  </div>
</template>
