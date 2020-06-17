<template>
  <v-snackbar
    v-model="snackbar.show"
    app
    top
    :color="snackbar.type"
    :timeout="snackbar.timeout"
  >
    {{ snackbar.message }}
    <template
      v-if="snackbar.action"
      #action
    >
      <v-btn
        dark
        text
        @click="snackbar.show = false"
      >
        Dismiss
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  import {
    sync,
  } from 'vuex-pathify'

  export default {
    name: 'AppSnackbar',

    data: () => ({

    }),

    computed: {
      ...sync('app', ['snackbar']),
    },
  }
</script>
