<template>
  <div class="text-center">
    <v-btn
      prepend-icon="mdi-check-circle"
      append-icon="mdi-account-circle"
    >
      <template v-slot:prepend>
        <v-icon color="success"></v-icon>
      </template>

      Button

      <template v-slot:append>
        <v-icon color="warning"></v-icon>
      </template>
    </v-btn>
  </div>
</template>
