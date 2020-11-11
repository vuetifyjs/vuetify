<template>
  <v-container
    class="px-0"
    fluid
  >
    <v-switch
      v-model="switch1"
      :label="`Switch 1: ${switch1.toString()}`"
    ></v-switch>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        switch1: true,
      }
    },
  }
</script>
