<template>
  <div>
    <v-alert info dismissible v-model="alert">
      This is a success alert that is closable.
    </v-alert>

    <div class="text-xs-center">
      <v-btn primary dark v-if="!alert" v-on:click.native="alert = true">Reset</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        alert: true
      }
    }
  }
</script>