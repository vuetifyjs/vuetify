<template>
  <v-empty-state
    headline="Welcome,"
    icon="$vuetify"
    title="What would you like to do today?"
  >
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card
            href="https://vuetifyjs.com/introduction/why-vuetify/#feature-guides"
            prepend-icon="$vuetify"
            target="_blank"
            text="Start with our dedicated feature guides"
            title="Learn Vuetify"
          ></v-card>
        </v-col>

        <v-col cols="6">
          <v-card
            href="https://play.vuetifyjs.com"
            prepend-icon="$vuetify-play"
            target="_blank"
            text="Test Vuetify out in our playground"
            title="Create a Playground"
          ></v-card>
        </v-col>

        <v-col cols="6">
          <v-card
            href="https://bin.vuetifyjs.com"
            prepend-icon="mdi-delete"
            target="_blank"
            text="Create a new bin to store your code"
            title="Create a Bin"
          ></v-card>
        </v-col>

        <v-col cols="6">
          <v-card
            href="https://issues.vuetifyjs.com"
            prepend-icon="$warning"
            target="_blank"
            text="File a bug report for Vuetify"
            title="Report a Bug"
          ></v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-empty-state>
</template>
