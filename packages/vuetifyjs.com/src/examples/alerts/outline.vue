<template>
  <div>
    <v-alert
      show
      type="success"
      outlined
      dense
    >
      This is a success alert.
    </v-alert>

    <v-alert
      show
      type="info"
      outlined
    >
      This is an info alert.
    </v-alert>

    <v-alert
      show
      type="warning"
      outlined
      prominent
    >
      This is a warning alert.
    </v-alert>

    <v-alert
      show
      type="error"
      outlined
      dismissible
    >
      This is a error alert.
    </v-alert>
  </div>
</template>
