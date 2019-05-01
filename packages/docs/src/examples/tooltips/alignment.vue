<template>
  <div class="text-xs-center">
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" data-cy-btn="tooltip">Left</v-btn>
      </template>
      <span>Left tooltip</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" data-cy-btn="tooltip">Top</v-btn>
      </template>
      <span>Top tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" data-cy-btn="tooltip">Bottom</v-btn>
      </template>
      <span>Bottom tooltip</span>
    </v-tooltip>

    <v-tooltip right>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" data-cy-btn="tooltip">Right</v-btn>
      </template>
      <span>Right tooltip</span>
    </v-tooltip>
  </div>
</template>
