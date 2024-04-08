<template>
  <v-input
    :error-messages="['Fatal error', 'Another error']"
    max-errors="2"
    disabled
    error
  >
    Input
  </v-input>
</template>
