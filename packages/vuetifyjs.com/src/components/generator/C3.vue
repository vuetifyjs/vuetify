<template>
  <div
    style="width: 360px; height: 650px; margin: auto;"
    class="grey lighten-3"
  >
    <v-toolbar dark color="primary" flat extended>
      <v-toolbar-side-icon/>

    </v-toolbar>
    <v-layout row>
      <v-flex xs10 offset-xs1>
        <v-card class="card--flex-toolbar">
          <v-toolbar card color="white" prominent>
            <v-toolbar-title class="body-2 grey--text">Title</v-toolbar-title>
            <v-spacer/>
            <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider/>
          <v-card-text style="height: 200px;"/>
          <v-card-actions>
            <v-spacer/>
            <v-btn flat color="accent">click me</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<style lang="stylus">
  .card--flex-toolbar {
    margin-top: -64px;
  }
</style>
