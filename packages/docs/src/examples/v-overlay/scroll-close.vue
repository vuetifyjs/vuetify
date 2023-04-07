<template>
  <div class="d-flex justify-center">
    <v-btn>
      Close

      <v-overlay
        activator="parent"
        location-strategy="connected"
        scroll-strategy="close"
      >
        <v-card class="pa-2">
          Hello!
        </v-card>
      </v-overlay>
    </v-btn>
  </div>
</template>
