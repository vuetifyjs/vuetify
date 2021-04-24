<template>
  <div style="width: 100%;">
    <v-banner
      v-bind="$attrs"
      v-on="$listeners"
    >
      A banner for use on desktop / mobile
    </v-banner>
  </div>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      defaults: {
        elevation: null,
        icon: null,
        'single-line': null,
        sticky: null,
      },
      options: {
        selects: {
          icon: ['$mdiAccount', '$mdiVuetify'],
        },
        sliders: {
          elevation: [0, 24],
        },
      },
      tabs: ['single-line', 'sticky'],
    }),
  }
</script>
