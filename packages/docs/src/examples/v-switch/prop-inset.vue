<template>
  <v-sheet class="pa-5">
    <v-switch
      v-model="switch1"
      inset
      :label="`Switch 1: ${switch1.toString()}`"
    ></v-switch>
    <v-switch
      v-model="switch2"
      inset
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
