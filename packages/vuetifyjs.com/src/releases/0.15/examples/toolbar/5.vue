<template>
  <v-card class="grey lighten-5" flat>
    <v-toolbar dark class="primary elevation-0" extended>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      
    </v-toolbar>
    <v-layout row>
      <v-flex xs8 offset-xs2>
        <v-card class="card--flex-toolbar">
          <v-toolbar card class="white" prominent>
            <v-toolbar-title class="body-2 grey--text">Title</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>apps</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text style="height: 200px;"></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<style>
  .card--flex-toolbar {
    margin-top: -64px;
  }
</style>
