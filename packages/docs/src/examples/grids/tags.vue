<template>
  <v-container
    id="grid"
    fluid
    tag="section"
  >
    <v-row>
      <v-col tag="h1" class="headline">Lorem Ipsum</v-col>
      <v-col class="d-flex" cols="12" order="5">
        <v-row>
          <v-col>
            <v-card flat>
              <v-card-text>{{ lorem }}</v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card flat>
              <v-card-text>{{ lorem }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
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
