<template>
  <div class="text-xs-center">
    <v-tooltip left>
      <template #activator="data">
        <v-btn v-on="data.on" color="primary" dark>Left</v-btn>
      </template>
      <span>Left tooltip</span>
    </v-tooltip>

    <v-tooltip top>
      <template #activator="data">
        <v-btn v-on="data.on" color="primary" dark>Top</v-btn>
      </template>
      <span>Top tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template #activator="data">
        <v-btn v-on="data.on" color="primary" dark>Bottom</v-btn>
      </template>
      <span>Bottom tooltip</span>
    </v-tooltip>

    <v-tooltip right>
      <template #activator="data">
        <v-btn v-on="data.on" color="primary" dark>Right</v-btn>
      </template>
      <span>Right tooltip</span>
    </v-tooltip>
  </div>
</template>
