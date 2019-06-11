<template>
  <v-layout column>
    <v-layout row wrap justify-space-around>
      <v-flex xs12>
        <v-slider v-model="errorCount" label="Max error count" min="0" max="4"></v-slider>
      </v-flex>
      <v-switch v-model="success" class="ma-2" label="Success"></v-switch>
      <v-switch v-model="error" class="ma-2" label="Error"></v-switch>
      <v-switch v-model="hideDetails" class="ma-2" label="Hide details"></v-switch>
      <v-switch v-model="persistentHint" class="ma-2" label="Persistent hint"></v-switch>
      <v-flex xs12>
        <v-layout row wrap justify-space-around>
          <v-btn @click="success = true; error = false;" color="success">Success</v-btn>
          <v-btn @click="success = false; error = true;" color="error">Error</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-input
      :messages="['Messages']"
      :success="success"
      :success-messages="successMsg"
      :error="error"
      :error-messages="errorMsg"
      :hide-details="hideDetails"
      :error-count="errorCount"
      hint="I am hint"
      :persistent-hint="persistentHint"
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
        hideDetails: false,
        errorCount: 1,
        persistentHint: true,
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
    computed: {
      successMsg () {
        return this.success ? [ 'Done' ] : []
      },
      errorMsg () {
        return this.error ? [ 'Error', 'Another one' ] : []
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
