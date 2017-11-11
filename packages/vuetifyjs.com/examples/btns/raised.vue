<template>
  <v-container fluid="fluid" class="text-xs-center">
    <v-layout row wrap>
      <v-flex xs12 sm6><span>Raised Light Theme</span>
        <v-card height="185px" flat color="transparent">
          <v-card-text>
            <div>
              <v-btn color="primary">Primary</v-btn>
            </div>
            <div>
              <v-btn color="error">Error</v-btn>
            </div>
            <div>
              <v-btn light disabled>Disabled</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6><span>Raised Dark Theme</span>
        <v-card height="185px" flat color="grey darken-3">
          <v-card-text>
            <div>
              <v-btn color="primary" dark>Primary</v-btn>
            </div>
            <div>
              <v-btn color="error" dark>Error</v-btn>
            </div>
            <div>
              <v-btn color="primary" dark disabled>Disabled</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
