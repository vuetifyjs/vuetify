<template>
  <v-card
    height="300"
    flat
    class="d-flex flex-column"
  >
    <v-snackbar
      :timeout="-1"
      :model-value="true"
      absolute
      left
      top
    >
      Lorem ipsum dolor sit amet consectetur.
    </v-snackbar>

    <v-snackbar
      :timeout="-1"
      :model-value="true"
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
      :model-value="true"
      absolute
      centered
      color="deep-purple-accent-4"
      elevation="24"
    >
      Lorem ipsum dolor sit amet consectetur.
    </v-snackbar>

    <v-snackbar
      :timeout="-1"
      :model-value="true"
      absolute
      bottom
      color="primary"
      left
      variant="tonal"
    >
      Lorem ipsum dolor sit amet consectetur.
    </v-snackbar>

    <v-snackbar
      :timeout="-1"
      :model-value="true"
      absolute
      bottom
      color="success"
      variant="outlined"
      right
    >
      Lorem ipsum dolor sit amet consectetur.
    </v-snackbar>
  </v-card>
</template>
