<template>
  <div>
    <v-alert
      v-model="alert"
      border="start"
      close-label="Close Alert"
      color="deep-purple accent-4"
      theme="dark"
      closable
    >
      Aenean imperdiet. Quisque id odio. Cras dapibus. Pellentesque ut neque. Cras dapibus.

      Vivamus consectetuer hendrerit lacus. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur blandit mollis lacus. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo.
    </v-alert>
    <div class="text-center">
      <v-btn
        v-if="!alert"
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
