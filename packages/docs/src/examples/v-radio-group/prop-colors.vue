<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            md="6"
            sm="6"
          >
            <v-radio-group
              v-model="ex7"
              column
            >
              <v-radio
                color="red"
                label="red"
                value="red"
              ></v-radio>
              <v-radio
                color="red-darken-3"
                label="red-darken-3"
                value="red-darken-3"
              ></v-radio>
              <v-radio
                color="indigo"
                label="indigo"
                value="indigo"
              ></v-radio>
              <v-radio
                color="indigo-darken-3"
                label="indigo-darken-3"
                value="indigo-darken-3"
              ></v-radio>
              <v-radio
                color="orange"
                label="orange"
                value="orange"
              ></v-radio>
              <v-radio
                color="orange-darken-3"
                label="orange-darken-3"
                value="orange-darken-3"
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col
            cols="12"
            md="6"
            sm="6"
          >
            <v-radio-group
              v-model="ex8"
              column
            >
              <v-radio
                color="primary"
                label="primary"
                value="primary"
              ></v-radio>
              <v-radio
                color="secondary"
                label="secondary"
                value="secondary"
              ></v-radio>
              <v-radio
                color="success"
                label="success"
                value="success"
              ></v-radio>
              <v-radio
                color="info"
                label="info"
                value="info"
              ></v-radio>
              <v-radio
                color="warning"
                label="warning"
                value="warning"
              ></v-radio>
              <v-radio
                color="error"
                label="error"
                value="error"
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const ex7 = ref('red')
  const ex8 = ref('primary')
</script>

<script>
  export default {
    data () {
      return {
        ex7: 'red',
        ex8: 'primary',
      }
    },
  }
</script>
