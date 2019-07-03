<template>
  <v-container fluid>
    <v-layout row>
      <v-flex
        pa-1
      >
        <v-card
          dark
          color="green darken-3"
        >
          <v-card-text>I'm a Flex that will grow and shrink (default behavior)</v-card-text>
        </v-card>
      </v-flex>
      <v-flex
        pa-1
      >
        <v-card
          dark
          color="green darken-1"
        >
          <v-card-text>I'm a Flex that will grow and shrink (default behavior)</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex
        pa-1
      >
        <v-card
          dark
          color="green darken-1"
        >
          <v-card-text>I'm a Flex that will grow and shrink (default behavior)</v-card-text>
        </v-card>
      </v-flex>
      <v-flex
        grow
        pa-1
      >
        <v-card
          dark
          color="green lighten-1"
        >
          <v-card-text>I'm a Flex with a lot of content that will NOT shrink when the content is wider than the available width in the row. Try resizing the window</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex
        pa-1
      >
        <v-card
          dark
          color="green darken-4"
        >
          <v-card-text>I'm a Flex that will grow and shrink (default behavior)</v-card-text>
        </v-card>
      </v-flex>
      <v-flex
        shrink
        pa-1
      >
        <v-card
          dark
          color="green darken-3"
        >
          <v-card-text>I'm a Flex that will NOT grow</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex
        grow-shrink-0
        pa-1
      >
        <v-card
          dark
          color="green"
        >
          <v-card-text>I'm a Flex that will NOT grow OR shrink</v-card-text>
        </v-card>
      </v-flex>
      <v-flex
        grow-shrink-0
        pa-1
      >
        <v-card
          dark
          color="green lighten-1"
        >
          <v-card-text>I'm a Flex that will NOT grow OR shrink</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
