<template>
  <div>
    <v-alert
      rounded="lg"
      color="info"
      class="ma-2"
    >
      I'm an alert with large rounded borders
    </v-alert>
    <v-alert
      rounded="pill"
      variant="outlined"
      type="success"
      class="ma-2"
    >
      I'm an alert with pill shaped borders
    </v-alert>
    <v-alert
      rounded="0"
      type="warning"
      class="ma-2"
    >
      I'm an alert with no rounded borders
    </v-alert>
    <v-alert
      prominent
      type="error"
      class="ma-2"
    >
      I'm an alert with default borders
    </v-alert>
  </div>
</template>
