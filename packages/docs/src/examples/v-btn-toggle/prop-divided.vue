<template>
  <div class="d-flex align-center flex-column bg-grey-lighten-4 pa-6">
    <v-btn-toggle
      v-model="toggle"
      divided
    >
      <v-btn icon="mdi-format-align-left"></v-btn>
      <v-btn icon="mdi-format-align-center"></v-btn>
      <v-btn icon="mdi-format-align-right"></v-btn>
      <v-btn icon="mdi-format-align-justify"></v-btn>
    </v-btn-toggle>
  </div>
</template>

<script>
  export default {
    data: () => ({
      toggle: null,
    }),
  }
</script>
