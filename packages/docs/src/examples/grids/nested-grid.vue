<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card
          color="purple"
          dark
          width="100%"
        >
          <v-card-title
            primary
            class="title"
          >
            Lorem
          </v-card-title>
          <v-card-text>{{ lorem }}</v-card-text>
        </v-card>
      </v-col>
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
        md="3"
      >
        <v-row
          class="ma-n1"
          dense
        >
          <v-col class="d-flex">
            <v-card
              color="indigo"
              dark
              width="100%"
            >
              <v-card-text>{{ lorem.slice(0, 70) }}</v-card-text>
            </v-card>
          </v-col>
          <v-col
            class="d-flex"
            cols="auto"
          >
            <v-row
              class="ma-n1"
              dense
            >
              <v-col
                v-for="n in 2"
                :key="n"
                class="d-flex"
                cols="12"
              >
                <v-card
                  color="red lighten-2"
                  dark
                  width="100%"
                >
                  <v-card-text>{{ lorem.slice(0, 40) }}</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
        md="2"
      >
        <v-card
          color="green lighten-2"
          dark
        >
          <v-card-text>{{ lorem.slice(0, 90) }}</v-card-text>
        </v-card>
      </v-col>
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
        md="3"
      >
        <v-card
          color="blue lighten-2"
          dark
          width="100%"
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
