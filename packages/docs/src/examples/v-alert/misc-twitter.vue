<template>
  <div>
    <v-alert
      v-model="alert"
      border="start"
      border-color="cyan"
      color="white"
      closable
      variant="contained"
      icon="mdi-twitter"
    >
      You've got <strong>5</strong> new updates on your timeline!.
    </v-alert>

    <div v-if="!alert" class="text-center">
      <v-btn @click="alert = true">
        Reset Alert
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      alert: true,
    }),
  }
</script>
