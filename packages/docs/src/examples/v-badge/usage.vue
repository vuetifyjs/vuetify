<template>
  <div
    style="width: 100%"
    class="text-center"
  >
    <v-badge
      v-bind="$attrs"
      v-on="$listeners"
    >
      <v-icon large>
        $mdiVuetify
      </v-icon>
    </v-badge>
  </div>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      defaults: {
        bordered: false,
        bottom: false,
        dot: false,
        inline: false,
        left: false,
        overlap: false,
        tile: false,
      },
      options: {
        booleans: ['bottom', 'dot', 'left', 'overlap'],
      },
      tabs: ['bordered', 'inline', 'tile'],
    }),
  }
</script>
