<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-subheader v-text="'Autocomplete'"></v-subheader>
      </v-flex>
      <v-flex xs12 sm6>
        <v-select
          :items="states"
          :filter="customFilter"
          v-model="a1"
          item-text="name"
          label="Select"
          autocomplete
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        a1: null,
        states: [
          { name: 'Florida', abbr: 'FL', id: 1 },
          { name: 'Georgia', abbr: 'GA', id: 2 },
          { name: 'Nebraska', abbr: 'NE', id: 3 },
          { name: 'California', abbr: 'CA', id: 4 },
          { name: 'New York', abbr: 'NY', id: 5 }
        ],
        customFilter (item, queryText, itemText) {
            const hasValue = val => val != null ? val : ''
            const text = hasValue(item.name)
            const query = hasValue(queryText)
            return text.toString()
              .toLowerCase()
              .indexOf(query.toString().toLowerCase()) > -1
        }
      }
    }
  }
</script>
