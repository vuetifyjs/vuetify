<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 class="my-3">
        <v-card>
          <v-toolbar color="primary">
            <v-btn icon>
              <v-icon color="white">arrow_back</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon color="white">more_vert</v-icon>
            </v-btn>
          </v-toolbar>
          <v-container fluid class="px-3">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  :rules="[(v) => v.length <= 25 || 'Max 25 characters']"
                  :counter="25"
                  v-model="title"
                  label="Title"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :rules="[(v) => v.length <= 50 || 'Max 50 characters']"
                  :counter="50"
                  v-model="description"
                  label="Description"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Preliminary report',
        description: 'Report describing the state of California'
      }
    }
  }
</script>
