<template>
  <v-card class="grey lighten-4 elevation-0">
    <v-card-text>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>Normal with hint text</v-subheader>
          </v-flex>
          <v-flex xs12 sm5>
            <v-text-field
              name="input-1-3"
              label="Hint Text"
              single-line
              prepend-icon="phone"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3>
            <v-select v-bind:items="[{ text: 'Mobile' }]" label="Mobile"></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>Focus</v-subheader>
          </v-flex>
          <v-flex xs12 sm5>
            <v-text-field
              name="input-2-3"
              label="Hint Text"
              class="input-group--focused"
              prepend-icon="phone"
              value="650"
              single-line
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3>
            <v-select v-bind:items="[{ text: 'Mobile' }]" label="Mobile"></v-select>
          </v-flex>

        </v-layout>
        <v-layout row wrap>
          <v-flex xs4>
            <v-subheader>Normal with input text</v-subheader>
          </v-flex>
          <v-flex xs12 sm5>
            <v-text-field
              name="input-3-3"
              label="Hint Text"
              value="650-555-1234"
              prepend-icon="phone"
              single-line
            ></v-text-field>
          </v-flex>
          <v-flex xs12 sm3>
            <v-select v-bind:items="[{ text: 'Mobile' }]" label="Mobile"></v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
</v-card>
</template>
