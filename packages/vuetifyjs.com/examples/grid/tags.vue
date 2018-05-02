<template>
  <v-container
    id="grid"
    fluid
    grid-list-sm
    tag="section"
  >
    <v-layout row wrap>
      <v-flex tag="h1" class="headline">Lorem Ipsum</v-flex>
      <v-flex d-flex xs12 order-xs5>
        <v-layout column>
          <v-flex>
            <v-card flat>
              <v-card-text>{{ lorem }}</v-card-text>
            </v-card>
          </v-flex>
          <v-flex>
            <v-card flat>
              <v-card-text>{{ lorem }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
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
