<template>
  <v-banner single-line @click:icon="alert">
    <v-icon slot="icon" color="warning" size="40">mdi-wifi-strength-alert-outline</v-icon>
    No Internet connection
  </v-banner>
</template>
<script>
  export default {
    methods: {
      alert () {
        alert('Hello, World!')
      }
    }
  }
</script>
