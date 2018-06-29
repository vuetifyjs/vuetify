<template>
  <div class="text-xs-center">
    <v-tooltip top>
      <v-btn dark color="primary" slot="activator">Top</v-btn>
      <span>Top tooltip</span>
    </v-tooltip>
    <v-tooltip right>
      <v-btn dark color="primary" slot="activator">Right</v-btn>
      <span>Right tooltip</span>
    </v-tooltip>
    <v-tooltip bottom>
      <v-btn dark color="primary" slot="activator">Bottom</v-btn>
      <span>Bottom tooltip</span>
    </v-tooltip>
    <v-tooltip left>
      <v-btn dark color="primary" slot="activator">Left</v-btn>
      <span>Left tooltip</span>
    </v-tooltip>
  </div>
</template>
