<template>
  <v-card class="grey lighten-4" flat>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs6>
            <v-subheader>Custom items</v-subheader>
          </v-flex>
          <v-flex xs6>
            <v-select
              v-bind:items="items"
              v-model="select"
              label="Select"
              single-line
              item-text="state"
              item-value="abbr"
              return-object
              :hint="`${select.state}, ${select.abbr}`"
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
        select: { state: 'Florida', abbr: 'FL' },
        items: [
          { state: 'Florida', abbr: 'FL' },
          { state: 'Georgia', abbr: 'GA' },
          { state: 'Nebraska', abbr: 'NE' },
          { state: 'California', abbr: 'CA' },
          { state: 'New York', abbr: 'NY' }
        ]
      }
    }
  }
</script>
