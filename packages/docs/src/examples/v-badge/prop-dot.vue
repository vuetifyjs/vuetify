<template>
  <v-toolbar title="Application" color="grey-lighten-3">
    <v-btn stacked>
      <v-badge
        color="error"
        dot
      >
        <v-icon icon="mdi-newspaper-variant-outline"></v-icon>
      </v-badge>

      News
    </v-btn>

    <v-btn stacked>
      <v-badge
        dot
        color="error"
      >
        <v-icon icon="mdi-post"></v-icon>
      </v-badge>

      Blog
    </v-btn>

    <v-btn
      stacked
      variant="tonal"
    >
      <v-icon icon="mdi-login"></v-icon>

      Login
    </v-btn>
  </v-toolbar>
</template>
