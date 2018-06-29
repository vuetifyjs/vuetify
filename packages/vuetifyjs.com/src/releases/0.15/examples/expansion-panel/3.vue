<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 lg5>
        <v-expansion-panel popout>
          <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
            <div slot="header">Item</div>
            <v-card>
              <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
      <v-flex xs12 lg5 offset-lg2>
        <v-expansion-panel inset>
          <v-expansion-panel-content v-for="(item,i) in 5" :key="i">
            <div slot="header">Item</div>
            <v-card>
              <v-card-text class="grey lighten-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>
