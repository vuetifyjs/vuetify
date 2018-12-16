<template>
  <div>
    <div class="text-xs-center">
      <v-btn
        color="primary"
        @click="alert = !alert"
      >
        Toggle
      </v-btn>
    </div>
    <v-alert
      :value="alert"
      color="purple"
      transition="scale-transition"
      type="success"
    >
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </v-alert>
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
