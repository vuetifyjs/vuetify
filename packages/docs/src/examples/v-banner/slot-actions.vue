<template>
  <v-banner
    color="warning"
    icon="mdi-wifi-strength-alert-outline"
    lines="one"
  >
    <template v-slot:text>
      No Internet connection
    </template>

    <template v-slot:actions>
      <v-btn>
        Dismiss
      </v-btn>

      <v-btn>
        Retry
      </v-btn>
    </template>
  </v-banner>
</template>
