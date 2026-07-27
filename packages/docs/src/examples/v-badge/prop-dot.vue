<template>
  <v-toolbar color="grey-lighten-3" title="Application">
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
        color="error"
        dot
      >
        <v-icon icon="mdi-post"></v-icon>
      </v-badge>

      Blog
    </v-btn>

    <v-btn
      variant="tonal"
      stacked
    >
      <v-icon icon="mdi-login"></v-icon>

      Login
    </v-btn>
  </v-toolbar>
</template>
