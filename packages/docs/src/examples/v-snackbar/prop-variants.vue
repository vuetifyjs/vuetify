<template>
  <v-sheet
    class="d-flex flex-column"
  >
    <v-snackbar
      :timeout="2000"
    >
      <template v-slot:activator="{ props }">
        <v-btn class="ma-2" v-bind="props">open</v-btn>
      </template>

      Lorem ipsum dolor sit amet consectetur.
    </v-snackbar>

    <v-snackbar
      :timeout="2000"
      color="blue-grey"
      rounded="pill"
    >
      <template v-slot:activator="{ props }">
        <v-btn class="ma-2" color="blue-grey" rounded="pill" v-bind="props">open</v-btn>
      </template>

      Snackbar with <strong>rounded="pill"</strong>.
    </v-snackbar>

    <v-snackbar
      :timeout="2000"
      color="deep-purple-accent-4"
      elevation="24"
    >
      <template v-slot:activator="{ props }">
        <v-btn class="ma-2" color="deep-purple-accent-4" v-bind="props">open</v-btn>
      </template>

      Snackbar with <strong>elevation="24"</strong>.
    </v-snackbar>

    <v-snackbar
      :timeout="2000"
      color="primary"
      variant="tonal"
    >
      <template v-slot:activator="{ props }">
        <v-btn class="ma-2" color="primary" variant="tonal" v-bind="props">open</v-btn>
      </template>

      Snackbar with <strong>tonal</strong> variant.
    </v-snackbar>

    <v-snackbar
      :timeout="2000"
      color="success"
      variant="outlined"
    >
      <template v-slot:activator="{ props }">
        <v-btn class="ma-2" color="success" variant="outlined" v-bind="props">open</v-btn>
      </template>

      Snackbar with <strong>outlined</strong> variant.
    </v-snackbar>
  </v-sheet>
</template>
