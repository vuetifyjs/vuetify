<template>
  <v-toolbar color="grey-lighten-3" title="Application">
    <v-btn stacked>
      <v-badge
        color="error"
        dot
      >
        <v-icon icon="i-mdi:newspaper-variant-outline"></v-icon>
      </v-badge>

      News
    </v-btn>

    <v-btn stacked>
      <v-badge
        color="error"
        dot
      >
        <v-icon icon="i-mdi:post"></v-icon>
      </v-badge>

      Blog
    </v-btn>

    <v-btn
      variant="tonal"
      stacked
    >
      <v-icon icon="i-mdi:login"></v-icon>

      Login
    </v-btn>
  </v-toolbar>
</template>
