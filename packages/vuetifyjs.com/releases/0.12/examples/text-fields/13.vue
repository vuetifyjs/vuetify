<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-toolbar class="indigo" light>
            <v-toolbar-title>DMV Application</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <span class="title">Personal Info</span>
            <v-text-field
              label="Legal first name"
              class="mt-5"
              v-model="first"
              required
            ></v-text-field>
            <v-text-field
              label="Legal middle name"
              hint="example of helper text only on focus"
              v-model="middle"
            ></v-text-field>
            <v-text-field
              label="Legal last name"
              hint="example of persistent helper text"
              persistent-hint
              v-model="last"
              required
            ></v-text-field>
            <small>*indicates required field</small>
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
        first: '',
        middle: '',
        last: ''
      }
    }
  }
</script>
