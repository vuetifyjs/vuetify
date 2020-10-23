<template>
  <v-divider
    v-bind="$attrs"
    v-on="$listeners"
  ></v-divider>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      defaults: {
        inset: false,
        vertical: false,
      },
      options: {
        booleans: ['inset', 'vertical'],
      },
      tabs: [],
    }),
  }
</script>
