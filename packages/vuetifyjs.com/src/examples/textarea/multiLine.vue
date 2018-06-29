<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Textarea with hint text</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-textarea
          name="input-7-1"
          label="Label Text"
          hint="Hint text"
        ></v-textarea>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Textarea with multi-line input text</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-textarea
          name="input-7-4"
          label="Label Text"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        ></v-textarea>
      </v-flex>
    </v-layout>
  </v-container>
</template>
