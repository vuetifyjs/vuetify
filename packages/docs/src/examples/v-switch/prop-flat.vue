<template>
  <v-sheet
    width="100%"
    height="100%"
    class="pa-12"
  >
    <v-switch
      v-model="switch1"
      flat
      :label="`Switch 1: ${switch1.toString()}`"
    ></v-switch>
    <v-switch
      v-model="switch2"
      flat
      :label="`Switch 2: ${switch2.toString()}`"
    ></v-switch>
  </v-sheet>
</template>

<script>
  export default {
    data () {
      return {
        switch1: true,
        switch2: false,
      }
    },
  }
</script>
