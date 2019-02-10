<template>
  <v-container fluid>
    <v-switch v-model="switch1" :label="`Switch 1: ${switch1.toString()}`"></v-switch>
    <v-switch v-model="switch2" :label="`Switch 2: ${switch2.toString()}`"></v-switch>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        switch1: true,
        switch2: false
      }
    }
  }
</script>
