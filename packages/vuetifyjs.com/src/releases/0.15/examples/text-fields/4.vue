<template>
  <v-card class="secondary elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row>
          <v-flex xs4>
            <v-subheader class="grey--text text--lighten-1">Normal with hint text</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-1-3"
              label="Hint Text"
              single-line
              dark
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader class="grey--text text--lighten-1">Press</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-2-3"
              label="Hint Text"
              class="input-group--focused"
              dark
              single-line
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader class="grey--text text--lighten-1">Focus</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-3-3"
              label="Hint Text"
              value="Input text"
              class="input-group--focused"
              dark
              single-line
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader class="grey--text text--lighten-1">Normal with input text</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-3-4"
              label="Hint Text"
              value="Input text"
              dark
              single-line
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader class="grey--text text--lighten-1">Error</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-3-5"
              label="Hint Text"
              value="Input text"
              :rules="[() => 'Username or Password is incorrect.']"
              error
              class="input-group--focused"
              dark
              single-line
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <v-subheader class="grey--text text--lighten-1">Disabled</v-subheader>
          </v-flex>
          <v-flex xs8>
            <v-text-field
              name="input-3"
              label="Label Text"
              value="Input text"
              disabled
              dark
              single-line
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
</v-card>
</template>
