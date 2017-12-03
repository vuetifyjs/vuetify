<template>
  <v-card class="elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm4 md4>
            <v-checkbox label="red" 
                        v-model="ex4" 
                        color="red" 
                        value="red" 
                        hide-details></v-checkbox>
            <v-checkbox label="red darken-3" 
                        v-model="ex4" 
                        color="red darken-3" 
                        value="red darken-3" 
                        hide-details></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-checkbox label="indigo"
                        v-model="ex4"
                        color="indigo"
                        value="indigo"
                        hide-details></v-checkbox>
            <v-checkbox label="indigo darken-3"
                        v-model="ex4"
                        color="indigo darken-3"
                        value="indigo darken-3"
                        hide-details></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-checkbox label="orange"
                        v-model="ex4"
                        color="orange"
                        value="orange"
                        hide-details></v-checkbox>
            <v-checkbox label="orange darken-3" 
                        v-model="ex4"
                        color="orange darken-3"
                        value="orange darken-3"
                        hide-details></v-checkbox>
          </v-flex>
        </v-layout>

        <v-layout row wrap class="mt-5">
          <v-flex xs12 sm4 md4>
            <v-checkbox label="primary" 
                        v-model="ex4"
                        color="primary"
                        value="primary"
                        hide-details></v-checkbox>
            <v-checkbox label="secondary" 
                        v-model="ex4"
                        color="secondary"
                        value="secondary"
                        hide-details></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-checkbox label="success" 
                        v-model="ex4"
                        color="success"
                        value="success"
                        hide-details></v-checkbox>
            <v-checkbox label="info"
                        v-model="ex4"
                        color="info"
                        value="info"
                        hide-details></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-checkbox label="warning"
                        v-model="ex4"
                        color="warning"
                        value="warning"
                        hide-details></v-checkbox>
            <v-checkbox label="error"
                        v-model="ex4"
                        color="error"
                        value="error"
                        hide-details></v-checkbox>
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
        ex4: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error',
              'red darken-3', 'indigo darken-3', 'orange darken-3'],
      }
    }
  }
</script>
