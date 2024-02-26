<template>
  <v-empty-state
    title="Welcome,"
    subtitle="What would you like to do today?"
    icon="$vuetify"
  >
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-card
            prepend-icon="$vuetify"
            title="Learn Vuetify"
            text="Start with our dedicated feature guides"
            target="_blank"
            href="https://vuetifyjs.com/introduction/why-vuetify/#feature-guides"
          ></v-card>
        </v-col>

        <v-col cols="6">
          <v-card
            prepend-icon="$vuetify-play"
            title="Create a Playground"
            text="Test Vuetify out in our playground"
            target="_blank"
            href="https://play.vuetifyjs.com"
          ></v-card>
        </v-col>

        <v-col cols="6">
          <v-card
            prepend-icon="mdi-delete"
            title="Create a Bin"
            text="Create a new bin to store your code"
            target="_blank"
            href="https://bin.vuetifyjs.com"
          ></v-card>
        </v-col>

        <v-col cols="6">
          <v-card
            prepend-icon="$warning"
            title="Report a Bug"
            text="File a bug report for Vuetify"
            target="_blank"
            href="https://issues.vuetifyjs.com"
          ></v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-empty-state>
</template>
