<template>
  <div style="width: 100%">
    <v-app-bar
      v-bind="$attrs"
      v-on="$listeners"
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </v-app-bar>
  </div>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      show: true,
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
