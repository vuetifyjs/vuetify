<template>
  <v-container fluid grid-list-sm secondary>
    <v-layout row wrap>
      <v-flex d-flex xs12 order-xs5>
        <v-layout column>
          <v-flex d-flex>
            <v-card class="blue-grey" dark tile flat>
              <v-card-text
                v-text="lorem">
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-card class="brown" dark tile flat>
              <v-card-text
                v-text="lorem">
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex d-flex xs12 sm7>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-card class="indigo lighten-2" dark tile flat>
              <v-card-text
                v-text="lorem.slice(0, 70)">
              </v-card-text>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <v-layout row>
              <v-flex d-flex 
                v-for="n in 2"
                :key="n"
              >
                <v-card
                  class="amber lighten-2"
                  tile
                  flat
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
      <v-flex d-flex xs12 sm2 child-flex>
        <v-card class="orange lighten-2" tile flat>
          <v-card-text
            v-text="lorem.slice(0, 90)">
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex d-flex xs12 sm3>
        <v-card class="red lighten-2" dark tile flat>
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