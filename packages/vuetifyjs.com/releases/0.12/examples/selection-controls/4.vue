<template>
  <v-card class="elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm4 md2>
            <v-checkbox label="Primary" v-model="ex7" value="primary" primary dark hide-details></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <v-checkbox label="Secondary" v-model="ex7" value="secondary" secondary dark hide-details></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <v-checkbox label="Success" v-model="ex7" value="success" success dark hide-details></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <v-checkbox label="Info" v-model="ex7" value="info" info dark hide-details></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <v-checkbox label="Warning" v-model="ex7" value="warning" warning dark hide-details></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <v-checkbox label="Error" v-model="ex7" value="error" error dark hide-details></v-checkbox>
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
        ex7: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      }
    }
  }
</script>
