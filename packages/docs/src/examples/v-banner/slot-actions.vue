<template>
  <v-banner
    lines="one"
    icon="mdi-wifi-strength-alert-outline"
    color="warning"
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
