<template>
  <div>
    <v-select
      v-model="filter"
      label="Filter"
      item-text="name"
      item-value="fn"
      :items="filters"
    ></v-select>
    <v-autocomplete
      v-model="model"
      :items="states"
      :filter="filter"
    ></v-autocomplete>
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
            fn: (item, queryText, itemText) => ~item.indexOf(queryText),
            name: '~item.indexOf(queryText)',
          },
          {
            fn: (item, queryText, itemText) => ~item.toLowerCase().indexOf(queryText),
            name: '~item.toLowerCase().indexOf(queryText)',
          },
          {
            fn: (item, queryText, itemText) => queryText.length > 2 && ~item.indexOf(queryText),
            name: 'queryText.length > 2 && ~item.indexOf(queryText)',
          },
        ],
        filter: (item, queryText, itemText) => ~item.indexOf(queryText),
      }
    },
  }
</script>

<codepen-resources lang="json">
  {
    "css": ["https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"]
  }
</codepen-resources>
