<template>
  <v-row
    align="center"
    justify="space-around"
    class="flex-column"
  >
    <v-icon
      v-bind="$attrs"
      v-on="$listeners"
    >
      {{ icon || 'mdi-plus' }}
    </v-icon>
    <v-select
      v-model="icon"
      :items="icons"
    ></v-select>
  </v-row>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      icon: 'mdi-access-point',
      icons: [
        'mdi-plus',
        'mdi-minus',
        'mdi-access-point',
        'mdi-antenna',
      ],
      defaults: {
        color: null,
        dense: false,
        disabled: false,
        large: false,
        small: false,
        'x-large': false,
        'x-small': false,
      },
      options: {
        booleans: [
          'disabled',
          'x-small',
          'small',
          'dense',
          'large',
          'x-large',
        ],
        selects: {
          color: [
            'red',
            'orange',
            'yellow',
            'green',
            'blue',
            'purple',
          ],
        },
      },
      tabs: [],
    }),
  }
</script>
