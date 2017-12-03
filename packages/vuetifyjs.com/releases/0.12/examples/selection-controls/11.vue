<template>
  <v-card class="elevation-0">
    <v-card-text>
      <v-container fluid>

        <v-layout row wrap>
          <v-flex xs12 sm4 md2>
            <v-switch label="Primary" v-model="ex17" value="primary" primary dark hide-details></v-switch>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <v-switch label="Secondary" v-model="ex17" value="secondary" secondary dark hide-details></v-switch>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <v-switch label="Success" v-model="ex17" value="success" success dark hide-details></v-switch>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <v-switch label="Info" v-model="ex17" value="info" info dark hide-details></v-switch>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <v-switch label="Warning" v-model="ex17" value="warning" warning dark hide-details></v-switch>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <v-switch label="Error" v-model="ex17" value="error" error dark hide-details></v-switch>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        ex17: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      }
    }
  }
</script>
