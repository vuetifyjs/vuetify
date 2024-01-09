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
        <v-btn rounded="pill" color="blue-grey" class="ma-2" v-bind="props">open</v-btn>
      </template>

      Snackbar with <strong>rounded="pill"</strong>.
    </v-snackbar>

    <v-snackbar
      :timeout="2000"
      color="deep-purple-accent-4"
      elevation="24"
    >
      <template v-slot:activator="{ props }">
        <v-btn color="deep-purple-accent-4" class="ma-2" v-bind="props">open</v-btn>
      </template>

      Snackbar with <strong>elevation="24"</strong>.
    </v-snackbar>

    <v-snackbar
      :timeout="2000"
      color="primary"
      variant="tonal"
    >
      <template v-slot:activator="{ props }">
        <v-btn color="primary" variant="tonal" class="ma-2" v-bind="props">open</v-btn>
      </template>

      Snackbar with <strong>tonal</strong> variant.
    </v-snackbar>

    <v-snackbar
      :timeout="2000"
      color="success"
      variant="outlined"
    >
      <template v-slot:activator="{ props }">
        <v-btn color="success" variant="outlined" class="ma-2" v-bind="props">open</v-btn>
      </template>

      Snackbar with <strong>outlined</strong> variant.
    </v-snackbar>
  </v-sheet>
</template>
