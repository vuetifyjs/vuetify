<template>
  <div class="text-xs-center d-flex align-center">
    <v-tooltip bottom>
      <v-btn slot="activator" dark color="primary">Button</v-btn>
      <span>Tooltip</span>
    </v-tooltip>
    <v-tooltip bottom>
      <v-icon slot="activator" dark color="primary">home</v-icon>
      <span>Tooltip</span>
    </v-tooltip>
    <v-tooltip bottom>
      <span slot="activator">This text has a tooltip</span>
      <span>Tooltip</span>
    </v-tooltip>
  </div>
</template>
