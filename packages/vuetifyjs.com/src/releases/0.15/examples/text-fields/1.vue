<template>
  <v-card class="grey lighten-4 elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Normal with hint text/label</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-1"
              label="Label Text"
              id="testing"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Focus</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-2"
              label="Label Text"
              value="Input text"
              class="input-group--focused"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Normal with input text + label</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-3"
              label="Label Text"
              value="Input text"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader>Disabled</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-3"
              label="Label Text"
              value="Input text"
              disabled
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>