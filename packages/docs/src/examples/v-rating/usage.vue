<template>
  <div class="text-center">
    <v-rating
      v-bind="$attrs"
      v-on="$listeners"
    ></v-rating>
  </div>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      show: true,
      defaults: {
        'background-color': null,
        dense: false,
        color: null,
        'empty-icon': '$mdiStarOutline',
        'full-icon': '$mdiStar',
        'half-icon': '$mdiStarHalfFull',
        'half-increments': false,
        length: 5,
        hover: true,
        readonly: false,
        value: 3,
        size: 64,
      },
      options: {
        booleans: [
          'half-increments',
          'hover',
          'readonly',
        ],
        selects: {
          color: [
            'primary',
            'warning',
            'green',
            'red',
            'blue',
            'error',
            'teal',
            'red lighten-3',
          ],
          'background-color': [
            'grey lighten-2',
            'warning lighten-1',
            'green lighten-2',
            'red lighten-2',
            'grey',
            '#eee',
            'cyan lighten-2',
            'grey lighten-1',
          ],
          'empty-icon': [
            '$mdiHeartOutline',
            '$mdiStarOutline',
          ],
          'full-icon': [
            '$mdiHeart',
            '$mdiStar',
          ],
          'half-icon': [
            '$mdiHeartHalfFull',
            '$mdiStarHalfFull',
          ],
        },
        sliders: {
          length: [1, 15],
          size: [0, 100],
          value: [0, 15, 0.5],
        },
      },
      tabs: ['dense'],
    }),
  }
</script>
