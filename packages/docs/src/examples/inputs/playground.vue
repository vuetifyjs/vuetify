<template>
  <v-layout column>
    <v-layout row wrap justify-space-around>
      <v-switch v-model="success" label="Success"></v-switch>
      <v-switch v-model="error" label="Error"></v-switch>
    </v-layout>
    <v-input
      :messages="['Messages']"
      :success="success"
      :error="error"
      append-icon="close"
      prepend-icon="phone"
      @click:append="appendIconCallback"
      @click:prepend="prependIconCallback"
    >
      Default Slot
    </v-input>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        text: '',
        success: false,
        error: false,
      }
    },
    methods: {
      appendIconCallback () {
        alert('click:append')
      },
      prependIconCallback () {
        alert('click:prepend')
      },
    },
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
