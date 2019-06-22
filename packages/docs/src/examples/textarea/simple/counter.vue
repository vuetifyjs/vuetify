<template>
  <v-container fluid grid-list-md>
    <v-textarea
      counter
      label="Text"
      :rules="rules"
      placeholder="Type something..."
    ></v-textarea>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      rules: [v => v.length <= 25 || 'Max 25 characters'],
    }),
  }
</script>
