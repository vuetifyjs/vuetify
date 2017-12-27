<template>
  <v-card>
    <v-card-text>
      <v-container fluid grid-list-md>
        <v-layout align-center>
          <v-flex class="shrink">
            <v-checkbox
              v-model="ex5"
              hide-details
            ></v-checkbox>
          </v-flex>
          <v-flex>
            <v-text-field label="Include files"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout align-center>
          <v-flex class="shrink">
            <v-checkbox
              v-model="ex6"
              hide-details
            ></v-checkbox>
          </v-flex>
          <v-flex>
            <v-text-field
              label="I only work if you check the box"
              :disabled="!ex6"
            ></v-text-field>
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
        ex5: true,
        ex6: false
      }
    }
  }
</script>
