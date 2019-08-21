<template>
  <v-card flat>
    <v-container fluid>
      <v-row class="child-flex">
        <div>
          <v-toolbar>
            <v-btn icon class="hidden-xs-only">
              <v-icon>arrow_back</v-icon>
            </v-btn>

            <v-toolbar-title>Title</v-toolbar-title>

            <div class="flex-grow-1"></div>

            <v-btn icon class="hidden-xs-only">
              <v-icon>search</v-icon>
            </v-btn>
          </v-toolbar>
        </div>

        <div style="flex-basis: 20%">
          <v-toolbar dark>
            <div class="flex-grow-1"></div>

            <v-btn icon>
              <v-icon>reply</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
        </div>
      </v-row>
    </v-container>
  </v-card>
</template>
