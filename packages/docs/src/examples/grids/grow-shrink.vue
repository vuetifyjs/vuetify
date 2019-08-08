<template>
  <v-container fluid>
    <v-row>
      <v-col class="pa-1">
        <v-card
          dark
          color="green darken-3"
        >
          <v-card-text>I'm a Flex that will grow and shrink (default behavior)</v-card-text>
        </v-card>
      </v-col>
      <v-col class="pa-1">
        <v-card
          dark
          color="green darken-1"
        >
          <v-card-text>I'm a Flex that will grow and shrink (default behavior)</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-1">
        <v-card
          dark
          color="green darken-1"
        >
          <v-card-text>I'm a Flex that will grow and shrink (default behavior)</v-card-text>
        </v-card>
      </v-col>
      <v-col class="flex-shrink-0 pa-1">
        <v-card
          dark
          color="green lighten-1"
        >
          <v-card-text>I'm a Flex with a lot of content that will NOT shrink when the content is wider than the available width in the row. Try resizing the window</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="pa-1">
        <v-card
          dark
          color="green darken-4"
        >
          <v-card-text>I'm a Flex that will grow and shrink (default behavior)</v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="auto"
        class="pa-1"
      >
        <v-card
          dark
          color="green darken-3"
        >
          <v-card-text>I'm a Flex that will NOT grow</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="auto"
        class="pa-1"
      >
        <v-card
          dark
          color="green"
        >
          <v-card-text>I'm a Flex that will NOT grow OR shrink</v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="auto"
        class="pa-1"
      >
        <v-card
          dark
          color="green lighten-1"
        >
          <v-card-text>I'm a Flex that will NOT grow OR shrink</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
