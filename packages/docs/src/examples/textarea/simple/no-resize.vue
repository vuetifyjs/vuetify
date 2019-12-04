<template>
  <v-container fluid>
    <v-textarea
      label="Text"
      no-resize
      rows="1"
      :value="value"
    ></v-textarea>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
  }
</script>
