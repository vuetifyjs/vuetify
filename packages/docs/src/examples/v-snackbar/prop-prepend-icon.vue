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

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14461-112438"
}
</example-meta>
