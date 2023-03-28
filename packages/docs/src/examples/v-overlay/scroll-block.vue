<template>
  <div class="d-flex justify-center">
    <v-btn>
      block

      <v-overlay
        activator="parent"
        location-strategy="connected"
        scroll-strategy="block"
      >
        <v-card class="pa-2">
          Hello!
        </v-card>
      </v-overlay>
    </v-btn>
  </div>
</template>
