<template>
  <v-container fluid px-0>
    <v-checkbox
      :label="`Checkbox 1: ${checkbox.toString()}`"
      v-model="checkbox"
    ></v-checkbox>
    <v-radio-group v-model="radioGroup">
      <v-radio
        v-for="n in 3"
        :key="n"
        :label="`Radio ${n}`"
        :value="n"
      ></v-radio>
    </v-radio-group>
    <v-switch
      :label="`Switch 1: ${switch1.toString()}`"
      v-model="switch1"
    ></v-switch>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        checkbox: true,
        radioGroup: 1,
        switch1: true
      }
    }
  }
</script>
