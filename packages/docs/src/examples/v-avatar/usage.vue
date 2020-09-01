<template>
  <div
    style="width: 100%"
    class="text-center"
  >
    <v-avatar
      v-bind="$attrs"
      v-on="$listeners"
    >
      <span class="white--text">VJ</span>
    </v-avatar>
  </div>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      defaults: {
        color: 'primary',
        rounded: false,
        size: 56,
        tile: false,
      },
      options: {
        selects: {
          color: ['primary', 'accent', 'warning lighten-2', 'teal', 'grey lighten-2'],
        },
        booleans: [],
        sliders: {
          size: [25, 128],
        },
      },
      tabs: ['rounded', 'tile'],
    }),
  }
</script>
