<template>
  <div class="text-xs-center">
    <v-tooltip left>
      <template v-slot:activator="data">
        <v-btn color="primary" dark v-on="data.on">Left</v-btn>
      </template>
      <span>Left tooltip</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="data">
        <v-btn color="primary" dark v-on="data.on">Top</v-btn>
      </template>
      <span>Top tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="data">
        <v-btn color="primary" dark v-on="data.on">Bottom</v-btn>
      </template>
      <span>Bottom tooltip</span>
    </v-tooltip>

    <v-tooltip right>
      <template v-slot:activator="data">
        <v-btn color="primary" dark v-on="data.on">Right</v-btn>
      </template>
      <span>Right tooltip</span>
    </v-tooltip>
  </div>
</template>
