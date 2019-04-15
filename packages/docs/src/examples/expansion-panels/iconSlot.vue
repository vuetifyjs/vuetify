<template>
  <v-expansion-panel>
    <v-expansion-panel-content>
      <template v-slot:actions>
        <v-icon color="primary">$vuetify.icons.expand</v-icon>
      </template>
      <template v-slot:header>
        <div>Item</div>
      </template>
      <v-card>
        <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
      </v-card>
    </v-expansion-panel-content>
    <v-expansion-panel-content>
      <template v-slot:actions>
        <v-icon color="teal">done</v-icon>
      </template>
      <template v-slot:header>
        <div>Item</div>
      </template>
      <v-card>
        <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
      </v-card>
    </v-expansion-panel-content>
    <v-expansion-panel-content>
      <template v-slot:actions>
        <v-icon color="error">error</v-icon>
      </template>
      <template v-slot:header>
        <div>Item</div>
      </template>
      <v-card>
        <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
