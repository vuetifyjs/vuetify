<template>
  <div class="d-flex justify-center">
    <v-btn>
      None

      <v-overlay
        activator="parent"
        location-strategy="connected"
        scroll-strategy="none"
      >
        <v-card class="pa-2">
          Hello!
        </v-card>
      </v-overlay>
    </v-btn>
  </div>
</template>
