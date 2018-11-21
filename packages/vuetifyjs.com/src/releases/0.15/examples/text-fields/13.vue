<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6 offset-md3>
        <v-card>
          <v-toolbar class="indigo" dark>
            <v-toolbar-title>DMV Application</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <span class="title">Personal Info</span>
            <v-text-field
              label="Legal first name"
              class="mt-5"
              v-model="first"
              :rules="[() => first.length > 0 || 'This field is required']"
              required
            ></v-text-field>
            <v-text-field
              label="Legal middle name"
              hint="This field is not required"
              v-model="middle"
            ></v-text-field>
            <v-text-field
              label="Legal last name"
              hint="example of persistent helper text"
              persistent-hint
              v-model="last"
              :rules="[() => last.length > 0 || 'This field is required']"
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
