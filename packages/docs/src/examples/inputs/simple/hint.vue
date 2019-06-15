<template>
  <v-layout column>
    <v-switch v-model="showMessages" label="Show messages"></v-switch>
    <v-input hint="I am hint" persistent-hint :messages="messages">Input</v-input>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      showMessages: false,
    }),

    computed: {
      messages () {
        return this.showMessages ? ['Message'] : undefined
      },
    },
  }
</script>
