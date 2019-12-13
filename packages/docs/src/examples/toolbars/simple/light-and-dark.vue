<template>
  <v-card flat>
    <v-container fluid>
      <v-row class="child-flex">
        <div>
          <v-toolbar>
            <v-btn icon class="hidden-xs-only">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-toolbar-title>Title</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon class="hidden-xs-only">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>
        </div>

        <div style="flex-basis: 20%">
          <v-toolbar dark>
            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-reply</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
        </div>
      </v-row>
    </v-container>
  </v-card>
</template>
