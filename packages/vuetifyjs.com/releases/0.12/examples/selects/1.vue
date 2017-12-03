<template>
  <v-card class="grey lighten-4 elevation-0">
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs6>
            <v-subheader>Standard</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              v-bind:items="states"
              v-model="e1"
              label="Select"
              dark
              single-line
              auto
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader>Standard with focus</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              v-bind:items="items"
              v-model="e2"
              label="Select"
              class="input-group--focused"
              dark
              item-value="text"
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader>Error</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              label="Select"
              v-bind:items="items"
              v-model="e3"
              v-bind:rules="[() => e3 && e3.text && e3.text.length > 0 || 'Please select an option']"
              dark
              item-value="text"
            ></v-select>
          </v-flex>
          <v-flex xs6>
            <v-subheader>Disabled</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              label="Select"
              v-bind:items="items"
              v-model="e4"
              disabled
              dark
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
        e1: null,
        e2: null,
        e3: null,
        e4: null,
        items: [
          { text: 'State 1' },
          { text: 'State 2' },
          { text: 'State 3' },
          { text: 'State 4' },
          { text: 'State 5' },
          { text: 'State 6' },
          { text: 'State 7' }
        ],
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
