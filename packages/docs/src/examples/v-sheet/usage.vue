<template>
  <v-container>
    <v-row justify="space-around">
      <v-sheet v-bind="$attrs"></v-sheet>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      defaults: {
        color: 'white',
        elevation: 1,
        height: 100,
        outlined: false,
        rounded: false,
        shaped: false,
        width: 100,
      },
      options: {
        selects: {
          color: [
            'white',
            'gray darken-2',
            'warning',
            'error',
            'success',
            'teal',
          ],
        },
        sliders: {
          elevation: [0, 24],
          height: [50, 250],
          width: [50, 250],
        },
      },
      tabs: [
        'outlined',
        'rounded',
        'shaped',
      ],
    }),
  }
</script>
