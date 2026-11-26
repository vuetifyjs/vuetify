<template>
  <div class="d-flex justify-center ga-8 py-4">
    <v-badge
      color="success"
      height="auto"
      icon="mdi-check"
      icon-size="large"
    >
      <v-avatar
        color="grey-lighten-3"
        icon="mdi-account"
        size="64"
      ></v-avatar>
    </v-badge>

    <v-badge
      :icon-size="24"
      color="info"
      height="auto"
    >
      <template v-slot:badge>
        <v-icon icon="mdi-shield-check"></v-icon>
      </template>

      <v-avatar
        color="grey-lighten-3"
        icon="mdi-account"
        size="64"
      ></v-avatar>
    </v-badge>
  </div>
</template>
