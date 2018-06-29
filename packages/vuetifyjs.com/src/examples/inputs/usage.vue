<template>
  <v-container
    id="input-usage"
    grid-list-xl
    fluid
  >
    <v-layout wrap>
      <v-flex xs12>
        <v-input
          :messages="['Messages']"
          append-icon="close"
          prepend-icon="phone"
        >
          Default Slot
        </v-input>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        text: ''
      }
    },
    methods: {
      appendIconCallback () {},
      prependIconCallback () {}
    }
  }
</script>

<style>
  #input-usage .v-input__prepend-outer,
  #input-usage .v-input__append-outer,
  #input-usage .v-input__slot,
  #input-usage .v-messages {
    border: 1px dashed rgba(0,0,0, .4);
  }
</style>
