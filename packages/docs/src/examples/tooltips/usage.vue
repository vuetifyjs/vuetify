<template>
  <div class="text-center d-flex align-center">
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >Button</v-btn>
      </template>
      <span>Tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >mdi-home</v-icon>
      </template>
      <span>Tooltip</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on">This text has a tooltip</span>
      </template>
      <span>Tooltip</span>
    </v-tooltip>
  </div>
</template>
