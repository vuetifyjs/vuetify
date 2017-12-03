<template>
  <v-card class="elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm4 md4>
            <v-switch label="red" 
                        v-model="ex11" 
                        color="red" 
                        value="red" 
                        hide-details></v-switch>
            <v-switch label="red darken-3" 
                        v-model="ex11" 
                        color="red darken-3" 
                        value="red darken-3" 
                        hide-details></v-switch>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-switch label="indigo"
                        v-model="ex11"
                        color="indigo"
                        value="indigo"
                        hide-details></v-switch>
            <v-switch label="indigo darken-3"
                        v-model="ex11"
                        color="indigo darken-3"
                        value="indigo darken-3"
                        hide-details></v-switch>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-switch label="orange"
                        v-model="ex11"
                        color="orange"
                        value="orange"
                        hide-details></v-switch>
            <v-switch label="orange darken-3" 
                        v-model="ex11"
                        color="orange darken-3"
                        value="orange darken-3"
                        hide-details></v-switch>
          </v-flex>
        </v-layout>

        <v-layout row wrap class="mt-5">
          <v-flex xs12 sm4 md4>
            <v-switch label="primary" 
                        v-model="ex11"
                        color="primary"
                        value="primary"
                        hide-details></v-switch>
            <v-switch label="secondary" 
                        v-model="ex11"
                        color="secondary"
                        value="secondary"
                        hide-details></v-switch>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-switch label="success" 
                        v-model="ex11"
                        color="success"
                        value="success"
                        hide-details></v-switch>
            <v-switch label="info"
                        v-model="ex11"
                        color="info"
                        value="info"
                        hide-details></v-switch>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-switch label="warning"
                        v-model="ex11"
                        color="warning"
                        value="warning"
                        hide-details></v-switch>
            <v-switch label="error"
                        v-model="ex11"
                        color="error"
                        value="error"
                        hide-details></v-switch>
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
        ex11: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error',
              'red darken-3', 'indigo darken-3', 'orange darken-3']
      }
    }
  }
</script>
