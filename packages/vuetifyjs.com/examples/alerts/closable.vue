<template>
  <div>
    <v-alert v-model="alert" type="success" dismissible>
      This is a success alert that is closable.
    </v-alert>

    <div class="text-xs-center">
      <v-btn v-if="!alert" color="primary" dark @click="alert = true">Reset</v-btn>
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
