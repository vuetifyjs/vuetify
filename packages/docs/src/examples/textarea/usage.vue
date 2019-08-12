<template>
  <v-container fluid grid-list-md>
    <v-layout wrap>
      <v-flex xs12 md6>
        <v-textarea
          name="input-7-1"
          label="Default style"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          hint="Hint text"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 md6>
        <v-textarea
          solo
          name="input-7-4"
          label="Solo textarea"
        ></v-textarea>
      </v-flex>
      <v-flex xs12 md6>
        <v-textarea
          filled
          name="input-7-4"
          label="Filled textarea"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        ></v-textarea>
      </v-flex>
      <v-flex xs12 md6>
        <v-textarea
          outlined
          name="input-7-4"
          label="Outlined textarea"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
        ></v-textarea>
      </v-flex>
    </v-layout>
  </v-container>
</template>
