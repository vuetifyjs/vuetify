<template>
  <v-container
    class="px-0"
    fluid
  >
    <v-radio-group v-model="radioGroup">
      <v-radio
        v-for="n in 3"
        :key="n"
        :label="`Radio ${n}`"
        :value="n"
      ></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        radioGroup: 1,
      }
    },
  }
</script>
