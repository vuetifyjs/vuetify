<template>
  <div class="d-flex justify-center">
    <v-btn>
      Reposition

      <v-overlay
        activator="parent"
        location-strategy="connected"
        scroll-strategy="reposition"
      >
        <v-card class="pa-2">
          Hello!
        </v-card>
      </v-overlay>
    </v-btn>
  </div>
</template>
