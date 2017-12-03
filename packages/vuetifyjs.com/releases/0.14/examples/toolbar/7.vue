<template>
  <v-card class="grey lighten-2" flat>
    <v-container fluid>
      <v-layout row>
      <v-flex xs8>
        <v-card flat height="300px"></v-card>
      </v-flex>
      <v-flex xs4>
        <v-card flat>
          <v-toolbar flat dense class="white">
            <v-toolbar-title class="body-2">Type options</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list dense class="grey lighten-5">
            <v-list-tile>
              <v-list-tile-title>
                Heading 1
                <v-icon>arrow_drop_down</v-icon>
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile>
              <v-list-tile-title>
                Roboto
                <v-icon>arrow_drop_down</v-icon>
              </v-list-tile-title>
            </v-list-tile>
            <li>
              <v-btn-toggle
                :items="items"
                v-model="toggle"
              ></v-btn-toggle>
            </li>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      toggle: null,
      items: [
        { icon: 'format_align_left', value: 1 },
        { icon: 'format_align_center', value: 2 },
        { icon: 'format_align_right', value: 3 },
        { icon: 'format_align_justify', value: 4 }
      ]
    })
  }
</script>

<style>
  .card--flex-toolbar {
    margin-top: -64px;
  }
</style>
