<template>
  <div class="text-center ma-2">
    <v-btn dark @click="snackbar = true">Open Snackbar</v-btn>
    <v-snackbar
      v-model="snackbar"
    >
      {{ text }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    data: () => ({
      snackbar: false,
      text: 'Hello, I\'m a snackbar',
    }),
  }
</script>
