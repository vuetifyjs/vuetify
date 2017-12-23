<template>
  <v-container fluid px-0>
    <v-checkbox
      v-bind:label="`Checkbox 1: ${ex1.toString()}`"
      v-model="ex1"
    ></v-checkbox>
    <v-radio-group v-model="ex2">
      <v-radio
        v-for="n in 3"
        :key="n"
        v-bind:label="`Radio ${n}`"
        :value="n"
      ></v-radio>
    </v-radio-group>
    <v-switch
      v-bind:label="`Switch 1: ${ex1.toString()}`"
      v-model="ex3"
    ></v-switch>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        ex1: true,
        ex2: 1,
        ex3: true,
        ex4: false,
      }
    }
  }
</script>
