<template>
  <div>
    <v-alert
      v-model="alert"
      dismissible
      close-text="Close Alert"
      type="info"
    >
      I'm a dismissable alert
    </v-alert>
    <div class="text-xs-center">
      <v-btn
        v-if="!alert"
        color="primary"
        @click="alert = true"
      >
        Reset
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        alert: true,
      }
    },
  }
</script>
