<template>
  <v-banner
    single-line
    @click:icon="alert"
  >
    <template v-slot:icon>
      <v-icon color="warning" size="36">
        mdi-wifi-strength-alert-outline
      </v-icon>
    </template>

    Unable to verify your Internet connection

    <template v-slot:actions>
      <v-btn
        color="primary"
        text
      >
        Connection Settings
      </v-btn>
    </template>
  </v-banner>
</template>

<script>
  export default {
    methods: {
      alert () {
        alert('Hello, World!')
      },
    },
  }
</script>
