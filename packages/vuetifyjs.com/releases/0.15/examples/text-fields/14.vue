<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-toolbar class="indigo" dark>
            <v-btn icon>
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title>Application</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <h1 class="title">Search for new keywords using a phrase, website or category</h1>
            <h2 class="subheading mb-5">Enter one or more of the following</h2>
            <v-text-field
              label="Your product or service"
              value="Grocery delivery"
              hint="For example, flowers or used cars"
              persistent-hint
            ></v-text-field>
            <v-text-field
              label="Your landing page"
              hint="www.example.com/page"
              persistent-hint
            ></v-text-field>
            <v-select
              label="Your product category"
              hint="Enter or select a product category"
              persistent-hint
              :items="options"
              v-model="select"
            ></v-select>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        select: [],
        options: [
          {
            value: 1,
            text: 'Option 1'
          },
          {
            value: 2,
            text: 'Option 2'
          },
          {
            value: 3,
            text: 'Option 3'
          }
        ]
      }
    }
  }
</script>
