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
        dense: false,
        flat: false,
        prominent: false,
      },
      options: {
        selects: {
          color: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
        },
      },
      tabs: ['dense', 'flat', 'prominent'],
    }),
  }
</script>
