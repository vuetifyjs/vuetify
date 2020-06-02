<template>
  <div style="width: 100%">
    <v-alert
      v-model="show"
      v-bind="$attrs"
      v-on="$listeners"
    >
      Im an Alert Usage Example
    </v-alert>
    <v-btn
      v-if="!show"
      color="primary"
      @click="show = !show"
    >
      reset
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      show: true,
      defaults: {
        border: null,
        color: null,
        dense: false,
        dismissible: false,
        icon: null,
        outlined: false,
        prominent: false,
        type: null,
        text: false,
        tile: false,
      },
      options: {
        booleans: ['dismissible'],
        selects: {
          border: ['left', 'right', 'top', 'bottom'],
          color: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
          icon: ['$mdiAccount', '$mdiVuetify'],
          type: ['success', 'info', 'warning', 'error'],
        },
        sliders: {
          elevation: [0, 24],
        },
      },
      tabs: ['dense', 'prominent', 'outlined', 'text', 'tile'],
    }),
  }
</script>
