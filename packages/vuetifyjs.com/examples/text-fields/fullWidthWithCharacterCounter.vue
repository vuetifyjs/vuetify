<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2>
        <v-card>
          <v-toolbar color="pink" dark>
            <v-icon color="white">arrow_back</v-icon>
            <v-toolbar-title>Compose</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-icon color="white">send</v-icon>
          </v-toolbar>
          <v-container fluid class="pa-0">
            <v-layout wrap align-center>
              <v-flex xs12>
                <v-autocomplete
                  :items="['Trevor Handsen', 'Alex Nelson']"
                  chips
                  label="To"
                  full-width
                  hide-selected
                  multiple
                  single-line
                >
                </v-autocomplete>
              </v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
                <v-text-field
                  label="Subject"
                  value="Plans for the weekend"
                  single-line
                  full-width
                  hide-details
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
                <v-textarea
                  v-model="title"
                  label="Message"
                  counter
                  max="120"
                  full-width
                  single-line
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Hi,\nI just wanted to check in and see if you had any plans the upcoming weekend. We are thinking of heading up to Napa'
      }
    }
  }
</script>
