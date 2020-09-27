<template>
  <v-alert
    v-if="show"
    v-model="show"
    v-bind="$attrs"
    v-on="$listeners"
  >
    Im an Alert Usage Example
  </v-alert>

  <v-btn
    v-else
    class="mx-auto"
    color="primary"
    @click="show = !show"
  >
    Reset
  </v-btn>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      show: true,
      defaults: {
        border: null,
        dense: false,
        dismissible: false,
        icon: null,
        outlined: false,
        prominent: false,
        text: false,
        type: 'success',
      },
      options: {
        booleans: ['dismissible'],
        selects: {
          border: ['left', 'right', 'top', 'bottom'],
          color: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
          icon: ['$mdiAccount', '$mdiVuetify'],
          type: ['success', 'info', 'warning', 'error'],
        },
        sliders: { elevation: [0, 24] },
      },
      tabs: ['dense', 'prominent', 'outlined', 'text'],
    }),
  }
</script>
