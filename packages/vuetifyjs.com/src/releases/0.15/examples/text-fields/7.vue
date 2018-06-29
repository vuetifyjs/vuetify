<template>
  <v-card class="grey lighten-4 elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Normal with hint text</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-7-1"
              label="Label Text"
              multi-line
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Focus</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-7-2"
              label="Label Text"
              value="Input Text"
              class="input-group--focused"
              multi-line
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Normal with multi-line input text</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-7-3"
              label="Label Text"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
              multi-line
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Normal with multi-line input text</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-7-4"
              label="Label Text"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
              multi-line
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>