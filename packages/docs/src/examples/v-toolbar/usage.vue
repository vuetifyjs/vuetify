<template>
  <v-toolbar
    v-bind="$attrs"
    v-on="$listeners"
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      defaults: {
        color: null,
        elevation: 4,
        dense: false,
        flat: false,
        outlined: false,
        prominent: false,
        rounded: false,
        shaped: false,
      },
      options: {
        sliders: {
          elevation: [0, 24],
        },
        selects: {
          color: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
        },
      },
      tabs: ['dense', 'flat', 'outlined', 'prominent', 'rounded', 'shaped'],
    }),
  }
</script>
