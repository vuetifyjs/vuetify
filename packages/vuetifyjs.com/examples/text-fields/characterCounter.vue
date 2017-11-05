<template>
  <v-container fluid grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 class="my-3">
        <v-card>
          <v-app top-toolbar id="example-9-1" style="min-height: 0;" standalone>
            <v-toolbar color="primary">
              <v-btn icon>
                <v-icon color="white">arrow_back</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon color="white">more_vert</v-icon>
              </v-btn>
            </v-toolbar>
            <main>
              <v-container fluid class="px-3">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      label="Title"
                      :rules="[(v) => v.length <= 25 || 'Max 25 characters']"
                      :counter="25"
                      v-model="title"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Description"
                      :rules="[(v) => v.length <= 50 || 'Max 50 characters']"
                      :counter="50"
                      v-model="description"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </main>
          </v-app>
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
