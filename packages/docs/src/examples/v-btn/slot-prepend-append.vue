<template>
  <div class="text-center">
    <v-btn
      append-icon="i-mdi:account-circle"
      prepend-icon="i-mdi:check-circle"
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
