<template>
  <div class="pa-4 bg-grey-lighten-4">
    <v-banner
      lines="one"
      icon="mdi-wifi-strength-alert-outline"
      color="warning"
    >
      No Internet connection

      <template v-slot:actions>
        <v-btn
          variant="text"
          color="primary"
          @click="dismiss"
        >
          Dismiss
        </v-btn>

        <v-btn
          variant="text"
          color="primary"
        >
          Retry
        </v-btn>
      </template>
    </v-banner>
  </div>
</template>
