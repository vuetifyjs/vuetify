<template>
  <v-container fluid="fluid" class="text-xs-center">
    <v-layout row wrap>
      <v-flex xs12="xs12" sm6="sm6"><span>Raised Light Theme</span>
        <v-card height="225px" class="elevation-0 white">
          <v-card-text>
            <div>
              <v-btn dark default>Normal</v-btn>
            </div>
            <div>
              <v-btn dark default class="btn--dark-flat-focused">Focused</v-btn>
            </div>
            <div>
              <v-btn dark default class="btn--dark-flat-pressed z-depth-2">Pressed</v-btn>
            </div>
            <div>
              <v-btn dark default disabled>Disabled</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12="xs12" sm6="sm6"><span>Raised Dark Theme</span>
        <v-card height="225px" class="secondary elevation-0">
          <v-card-text>
            <div>
              <v-btn primary light>Normal</v-btn>
            </div>
            <div>
              <v-btn primary light class="btn--light-flat-focused">Focused</v-btn>
            </div>
            <div>
              <v-btn primary light class="btn--light-flat-pressed z-depth-2">Pressed</v-btn>
            </div>
            <div>
              <v-btn primary light disabled>Disabled</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
