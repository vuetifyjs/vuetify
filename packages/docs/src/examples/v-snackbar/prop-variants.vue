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
      Lorem ipsum dolor sit amet consectetur.
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
      Lorem ipsum dolor sit amet consectetur.
    </v-snackbar>

    <v-snackbar
      :timeout="-1"
      :value="true"
      absolute
      centered
      color="deep-purple accent-4"
      elevation="24"
    >
      Lorem ipsum dolor sit amet consectetur.
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
      Lorem ipsum dolor sit amet consectetur.
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
      Lorem ipsum dolor sit amet consectetur.
    </v-snackbar>
  </v-card>
</template>
