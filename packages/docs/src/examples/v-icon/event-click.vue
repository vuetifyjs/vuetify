<template>
  <v-card>
    <v-toolbar
      color="pink"
      dark
      dense
      flat
    >
      <v-toolbar-title class="body-2">
        Upcoming Changes
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-icon
        large
        @click="next"
      >
        mdi-chevron-right
      </v-icon>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    methods: {
      next () {
        alert('You clicked next!')
      },
    },
  }
</script>
