<template>
  <v-container fluid>
    <v-textarea
      counter
      label="Text"
      :rules="rules"
      :value="value"
    ></v-textarea>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      rules: [v => v.length <= 25 || 'Max 25 characters'],
      value: 'Hello!',
    }),
  }
</script>
