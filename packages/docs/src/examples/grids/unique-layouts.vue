<template>
  <v-container fluid>
    <v-row>
      <v-col
        class="d-flex"
        cols="12"
        order="5"
      >
        <v-row class="ma-n3">
          <v-col
            class="d-flex child-flex"
            cols="12"
          >
            <v-card
              color="blue-grey"
              dark
              tile
              flat
            >
              <v-card-text>{{ lorem }}</v-card-text>
            </v-card>
          </v-col>
          <v-col
            class="d-flex child-flex"
            cols="12"
          >
            <v-card
              color="brown"
              dark
              tile
              flat
            >
              <v-card-text>{{ lorem }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        class="d-flex"
        cols="12"
        sm="7"
      >
        <v-row class="ma-n3">
          <v-col
            class="d-flex child-flex"
            cols="12"
          >
            <v-card
              color="indigo lighten-2"
              dark
              tile
              flat
            >
              <v-card-text>{{ lorem.slice(0, 70) }}</v-card-text>
            </v-card>
          </v-col>
          <v-col class="d-flex">
            <v-row class="ma-n3">
              <v-col
                v-for="n in 2"
                :key="n"
                class="d-flex child-flex"
              >
                <v-card
                  color="amber lighten-2"
                  tile
                  flat
                >
                  <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        class="d-flex child-flex"
        cols="12"
        sm="2"
      >
        <v-card
          color="orange lighten-2"
          flat
          tile
        >
          <v-card-text>{{ lorem.slice(0, 90) }}</v-card-text>
        </v-card>
      </v-col>
      <v-col
        class="d-flex child-flex"
        cols="12"
        sm="3"
      >
        <v-card
          color="red lighten-2"
          dark
          flat
          tile
        >
          <v-card-text>{{ lorem.slice(0, 100) }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
    }),
  }
</script>
