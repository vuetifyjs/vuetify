<template>
  <v-card class="elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm4 md4>
            <v-radio label="red" 
                        v-model="ex7" 
                        color="red" 
                        value="red" 
                        hide-details></v-radio>
            <v-radio label="red darken-3" 
                        v-model="ex7" 
                        color="red darken-3" 
                        value="red darken-3" 
                        hide-details></v-radio>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-radio label="indigo"
                        v-model="ex7"
                        color="indigo"
                        value="indigo"
                        hide-details></v-radio>
            <v-radio label="indigo darken-3"
                        v-model="ex7"
                        color="indigo darken-3"
                        value="indigo darken-3"
                        hide-details></v-radio>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-radio label="orange"
                        v-model="ex7"
                        color="orange"
                        value="orange"
                        hide-details></v-radio>
            <v-radio label="orange darken-3" 
                        v-model="ex7"
                        color="orange darken-3"
                        value="orange darken-3"
                        hide-details></v-radio>
          </v-flex>
        </v-layout>

        <v-layout row wrap class="mt-5">
          <v-flex xs12 sm4 md4>
            <v-radio label="primary" 
                        v-model="ex7"
                        color="primary"
                        value="primary"
                        hide-details></v-radio>
            <v-radio label="secondary" 
                        v-model="ex7"
                        color="secondary"
                        value="secondary"
                        hide-details></v-radio>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-radio label="success" 
                        v-model="ex7"
                        color="success"
                        value="success"
                        hide-details></v-radio>
            <v-radio label="info"
                        v-model="ex7"
                        color="info"
                        value="info"
                        hide-details></v-radio>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-radio label="warning"
                        v-model="ex7"
                        color="warning"
                        value="warning"
                        hide-details></v-radio>
            <v-radio label="error"
                        v-model="ex7"
                        color="error"
                        value="error"
                        hide-details></v-radio>
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
        ex7: 'red'
      }
    }
  }
</script>
