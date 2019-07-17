<template>
  <div>
    <v-select
      v-model="model"
      :items="filters"
      label="Filter"
      placeholder="Select a Filter..."
      filled
      rounded
    ></v-select>
    <v-autocomplete
      label="Test custom filters"
      :items="states"
      :filter="activeFilter"
      filled
      rounded
    ></v-autocomplete>

    {{ model }}
  </div>
</template>

<script>
  export default {
    data () {
      return {
        model: null,
        states: [
          'Alabama', 'Alaska', 'American Samoa', 'Arizona',
          'Arkansas', 'California', 'Colorado', 'Connecticut',
          'Delaware', 'District of Columbia', 'Federated States of Micronesia',
          'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
          'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
          'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
          'Missouri', 'Montana', 'Nebraska', 'Nevada',
          'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
          'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
          'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
          'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
          'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
        ],
        filters: [
          {
            value: 0,
            fn: (item, queryText, itemText) => item.indexOf(queryText) > -1,
            text: 'Exact Match',
          },
          {
            value: 1,
            fn: (item, queryText, itemText) => queryText.length > 2 && item.toLowerCase().indexOf(queryText) > -1,
            text: 'Search Length > 2 & Loose Match',
          },
        ],
      }
    },

    computed: {
      activeFilter () {
        if (this.model == null) return undefined
        return this.filters[this.model].fn
      },
    },
  }
</script>
