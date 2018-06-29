<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6 md6>
            <v-radio-group v-model="ex7" column>
              <v-radio
                label="red"
                color="red"
                value="red"
              ></v-radio>
              <v-radio
                label="red darken-3"
                color="red darken-3"
                value="red darken-3"
              ></v-radio>
              <v-radio
                label="indigo"
                color="indigo"
                value="indigo"
              ></v-radio>
              <v-radio
                label="indigo darken-3"
                color="indigo darken-3"
                value="indigo darken-3"
              ></v-radio>
              <v-radio
                label="orange"
                color="orange"
                value="orange"
              ></v-radio>
              <v-radio
                label="orange darken-3"
                color="orange darken-3"
                value="orange darken-3"
              ></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <v-radio-group v-model="ex8" column>
              <v-radio
                label="primary"
                color="primary"
                value="primary"
              ></v-radio>
              <v-radio
                label="secondary"
                color="secondary"
                value="secondary"
              ></v-radio>
              <v-radio
                label="success"
                color="success"
                value="success"
              ></v-radio>
              <v-radio
                label="info"
                color="info"
                value="info"
              ></v-radio>
              <v-radio
                label="warning"
                color="warning"
                value="warning"
              ></v-radio>
              <v-radio
                label="error"
                color="error"
                value="error"
              ></v-radio>
            </v-radio-group>
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
        ex7: 'red',
        ex8: 'primary'
      }
    }
  }
</script>
