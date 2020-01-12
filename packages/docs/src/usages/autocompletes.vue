<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-autocomplete
        label="Test custom filters"
        :items="states"
        :filter="activeFilter"
        filled
        rounded
      />
    </v-row>
  </v-container>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    data: () => ({
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
    }),

    computed: {
      activeFilter () {
        if (this.attrs.filter === 'Exact Match') return (item, queryText, itemText) => item.indexOf(queryText) > -1
        if (this.attrs.filter === 'Search Length > 2 & Loose Match') return (item, queryText, itemText) => queryText.length > 2 && item.toLowerCase().indexOf(queryText) > -1
        return undefined
      },
    },
  }
</script>
