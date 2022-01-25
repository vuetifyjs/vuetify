<template>
  <v-card
    height="300"
    flat
  >
    <v-snackbar
      :timeout="-1"
      :value="true"
      absolute
      left
      shaped
      top
    >
      snackbar with <strong>Shaped</strong> property.
    </v-snackbar>

    <v-snackbar
      :timeout="-1"
      :value="true"
      color="blue-grey"
      absolute
      right
      rounded="pill"
      top
    >
      rounded="pill"
    </v-snackbar>

    <v-snackbar
      :timeout="-1"
      :value="true"
      absolute
      centered
      left
      color="deep-purple accent-4"
      elevation="24"
    >
      snackbar with <strong>elevation: 24</strong> property.
    </v-snackbar>

    <v-snackbar
      :timeout="-1"
      :value="true"
      absolute
      centered
      right
      tile
      color="red accent-2"
    >
      snackbar with <strong>tile</strong> property.
    </v-snackbar>

    <v-snackbar
      :timeout="-1"
      :value="true"
      absolute
      bottom
      color="primary"
      left
      text
    >
      snackbar with <strong>text</strong> property.
    </v-snackbar>

    <v-snackbar
      :timeout="-1"
      :value="true"
      absolute
      bottom
      color="success"
      outlined
      right
    >
      snackbar with <strong>outlined</strong> property.
    </v-snackbar>
  </v-card>
</template>
