<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-card>
          <v-toolbar class="teal">
            <v-icon class="white--text">arrow_back</v-icon>
            <v-spacer></v-spacer>
            <v-icon class="white--text">more_vert</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Title"
                    value="Preliminary report"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Title"
                    v-model="title"
                    counter
                    multi-line
                    max="120"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card>
          <v-toolbar class="teal">
            <v-icon class="white--text">arrow_back</v-icon>
            <v-spacer></v-spacer>
            <v-icon class="white--text">more_vert</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-container fluid>

              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Title"
                    value="Preliminary report"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Title"
                    v-model="title2"
                    counter
                    multi-line
                    max="120"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Let me only say that it fared with him as with the storm-tossed ship, that miserably drives along the leeward land.',
        title2: 'Let me only say that it fared with him as with the storm-tossed ship, that miserably drives along the leeward land. The port'
      }
    }
  }
</script>
