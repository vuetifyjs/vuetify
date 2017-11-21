<template>
  <div>
    <div class="text-xs-center">
      <v-btn color="primary" @click="alert = !alert">Toggle</v-btn>
    </div>
    <v-alert
      type="success"
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
