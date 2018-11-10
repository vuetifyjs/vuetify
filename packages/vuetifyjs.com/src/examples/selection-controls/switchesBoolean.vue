<template>
  <v-container fluid>
    <v-switch :label="`Switch 1: ${switch1.toString()}`" v-model="switch1"></v-switch>
    <v-switch :label="`Switch 2: ${switch2.toString()}`" v-model="switch2"></v-switch>
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
