<template>
  <div class="text-xs-center d-flex align-center">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" data-cy-btn="tooltip">Button</v-btn>
      </template>
      <span>Tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-icon color="primary" dark v-on="on" data-cy-btn="tooltip">home</v-icon>
      </template>
      <span>Tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <span v-on="on" data-cy-btn="tooltip">This text has a tooltip</span>
      </template>
      <span>Tooltip</span>
    </v-tooltip>
  </div>
</template>
