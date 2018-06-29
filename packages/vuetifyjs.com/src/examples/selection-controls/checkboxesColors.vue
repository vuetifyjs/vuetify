<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm4 md4>
            <v-checkbox
              v-model="ex4"
              label="red"
              color="red"
              value="red"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="ex4"
              label="red darken-3"
              color="red darken-3"
              value="red darken-3"
              hide-details
            ></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-checkbox
              v-model="ex4"
              label="indigo"
              color="indigo"
              value="indigo"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="ex4"
              label="indigo darken-3"
              color="indigo darken-3"
              value="indigo darken-3"
              hide-details
            ></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-checkbox
              v-model="ex4"
              label="orange"
              color="orange"
              value="orange"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="ex4"
              label="orange darken-3"
              color="orange darken-3"
              value="orange darken-3"
              hide-details
            ></v-checkbox>
          </v-flex>
        </v-layout>

        <v-layout row wrap class="mt-5">
          <v-flex xs12 sm4 md4>
            <v-checkbox
              v-model="ex4"
              label="primary"
              color="primary"
              value="primary"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="ex4"
              label="secondary"
              color="secondary"
              value="secondary"
              hide-details
            ></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-checkbox
              v-model="ex4"
              label="success"
              color="success"
              value="success"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="ex4"
              label="info"
              color="info"
              value="info"
              hide-details
            ></v-checkbox>
          </v-flex>
          <v-flex xs12 sm4 md4>
            <v-checkbox
              v-model="ex4"
              label="warning"
              color="warning"
              value="warning"
              hide-details
            ></v-checkbox>
            <v-checkbox
              v-model="ex4"
              label="error"
              color="error"
              value="error"
              hide-details
            ></v-checkbox>
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
        ex4: ['red', 'indigo', 'orange', 'primary', 'secondary', 'success', 'info', 'warning', 'error', 'red darken-3', 'indigo darken-3', 'orange darken-3']
      }
    }
  }
</script>
