<template>
  <v-card class="grey lighten-4 elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-subheader v-text="'Multiple with persistent hint'"></v-subheader>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              label="Select"
              v-bind:items="states"
              v-model="e6"
              multiple
              max-height="400"
              hint="Pick your favorite states"
              persistent-hint
            ></v-select>
          </v-flex>
          <v-flex xs12 sm6>
            <v-subheader v-text="'Multiple (Chips) with persistent hint'"></v-subheader>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select
              label="Select"
              v-bind:items="states"
              v-model="e7"
              multiple
              chips
              hint="What are the target regions"
              persistent-hint
            ></v-select>
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
        e6: [],
        e7: [],
        states: [
          'Alabama','Alaska','American Samoa','Arizona',
          'Arkansas','California','Colorado','Connecticut',
          'Delaware','District of Columbia','Federated States of Micronesia',
          'Florida','Georgia','Guam','Hawaii','Idaho',
          'Illinois','Indiana','Iowa','Kansas','Kentucky',
          'Louisiana','Maine','Marshall Islands','Maryland',
          'Massachusetts','Michigan','Minnesota','Mississippi',
          'Missouri','Montana','Nebraska','Nevada',
          'New Hampshire','New Jersey','New Mexico','New York',
          'North Carolina','North Dakota','Northern Mariana Islands','Ohio',
          'Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico',
          'Rhode Island','South Carolina','South Dakota','Tennessee',
          'Texas','Utah','Vermont','Virgin Island','Virginia',
          'Washington','West Virginia','Wisconsin','Wyoming'
        ]
      }
    }
  }
</script>
