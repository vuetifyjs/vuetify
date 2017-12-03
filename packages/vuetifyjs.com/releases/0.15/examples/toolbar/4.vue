<template>
  <v-card flat>
    <v-container fluid>
      <v-layout row child-flex wrap>
      <div>
        <v-toolbar light>
          <v-btn icon class="hidden-xs-only">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-toolbar-title>Title</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon class="hidden-xs-only">
            <v-icon>search</v-icon>
          </v-btn>
        </v-toolbar>
      </div>
      <div style="flex-basis: 20%">
        <v-toolbar dark>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>reply</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>
      </div>
    </v-layout>
    </v-container>
  </v-card>
</template>
