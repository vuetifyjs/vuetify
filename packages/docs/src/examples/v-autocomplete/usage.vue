<template>
  <v-autocomplete
    :items="items"
    v-bind="$attrs"
    v-on="$listeners"
  >
  </v-autocomplete>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      items: [
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
      defaults: {
        'auto-select-first': false,
        chips: false,
        clearable: false,
        dense: false,
        'deletable-chips': false,
        filled: false,
        multiple: false,
        rounded: false,
        'small-chips': false,
        solo: false,
        'solo-inverted': false,
      },
      options: {
        booleans: [
          'auto-select-first',
          'clearable',
          'chips',
          'deletable-chips',
          'multiple',
          'small-chips',
        ],
      },
      tabs: ['dense', 'filled', 'rounded', 'solo', 'solo-inverted'],
    }),
  }
</script>
