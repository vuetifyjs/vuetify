<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-chip
      v-bind="$attrs"
      v-on="$listeners"
    >
      Chip Component
    </v-chip>
  </v-row>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      defaults: {
        close: false,
        'close-icon': null,
        color: null,
        filter: false,
        label: false,
        link: false,
        outlined: false,
        pill: false,
      },
      options: {
        selects: {
          'close-icon': ['mdi-close-outline', 'mdi-delete'],
          color: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
        },
        booleans: [
          'close',
        ],
      },
      tabs: ['filter', 'label', 'link', 'outlined', 'pill'],
    }),
  }
</script>
