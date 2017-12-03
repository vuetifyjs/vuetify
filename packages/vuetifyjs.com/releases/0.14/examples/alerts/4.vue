<template>
  <div>
    <div class="text-xs-center">
      <v-btn primary @click.native="alert = !alert">Toggle</v-btn>
    </div>
    <v-alert
      success
      :value="alert"
      transition="scale-transition"
    >
      This is a success alert.
    </v-alert>
  </div>
</template>

<script>
  export default {
    data: () => ({
      alert: true
    })
  }
</script>
