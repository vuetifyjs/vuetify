<template>
  <v-layout min-height="250">
    <v-snackbar
      color="success"
      location="bottom start"
      prepend-icon="$success"
      text="Your changes have been saved."
      timeout="-1"
      title="Success"
      contained
      model-value
    >
      <template v-slot:actions>
        <v-btn
          class="px-3"
          density="comfortable"
          rounded="lg"
          text="Got it!"
          variant="tonal"
          @click.stop
        ></v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      color="warning"
      location="top end"
      prepend-icon="mdi-wifi-strength-alert-outline"
      text="Connection has been lost."
      timeout="-1"
      title="Network issue"
      variant="elevated"
      contained
      model-value
    ></v-snackbar>

    <v-snackbar
      color="error"
      location="center"
      prepend-icon="mdi-cancel"
      rounded="pill"
      text="Operation is not allowed"
      timeout="-1"
      variant="tonal"
      contained
      model-value
    ></v-snackbar>
  </v-layout>
</template>
