<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm6 md4>
        <v-card class="purple" dark>
          <v-card-title primary class="title">Lorem</v-card-title>
          <v-card-text
            v-text="lorem">
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card class="indigo" dark>
              <v-card-text
                v-text="lorem.slice(0, 70)">
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex d-flex 
                v-for="n in 2"
                :key="n"
                xs12
              >
                <v-card
                  class="red lighten-2"
                  dark
                >
                  <v-card-text
                    v-text="lorem.slice(0, 40)">
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm6 md2 child-flex>
        <v-card class="green lighten-2" dark>
          <v-card-text
            v-text="lorem.slice(0, 90)">
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm6 md3>
        <v-card class="blue lighten-2 lighten-2" dark>
          <v-card-text
            v-text="lorem.slice(0, 100)">
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`
    })
  }
</script>