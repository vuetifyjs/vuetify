<template>
  <v-container fluid class="text-xs-center">
    <v-layout row wrap>
      <v-flex xs12 sm6><span>Light Theme</span>
        <v-card height="185px" flat color="white">
          <v-card-text>
            <div>
              <v-btn flat>Normal</v-btn>
            </div>
            <div>
              <v-btn flat color="primary">Primary</v-btn>
            </div>
            <div>
              <v-btn flat disabled>Disabled</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6><span>Dark Theme</span>
        <v-card height="185px" flat color="secondary">
          <v-card-text>
            <div>
              <v-btn flat dark>Normal</v-btn>
            </div>
            <div>
              <v-btn flat dark color="primary">Primary</v-btn>
            </div>
            <div>
              <v-btn flat dark disabled>Disabled</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
