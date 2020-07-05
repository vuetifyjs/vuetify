<template>
  <div class="text-center">
    <v-btn
      dark
      color="indigo"
      @click="snackbar = true"
    >
      Open Snackbar
    </v-btn>

    <v-snackbar
      v-model="snackbar"
      :vertical="vertical"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="indigo"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    data: () => ({
      snackbar: false,
      text: 'Lorem ipsum dolor sit amet',
      vertical: true,
    }),
  }
</script>
