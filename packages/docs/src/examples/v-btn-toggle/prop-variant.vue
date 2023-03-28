<template>
  <div class="d-flex align-center flex-column bg-grey-lighten-4 pa-6">
    <div class="text-subtitle-2">Default</div>
    <v-btn-toggle
      v-model="toggle"
      color="primary"
    >
      <v-btn icon="mdi-format-align-left"></v-btn>
      <v-btn icon="mdi-format-align-center"></v-btn>
      <v-btn icon="mdi-format-align-right"></v-btn>
      <v-btn icon="mdi-format-align-justify"></v-btn>
    </v-btn-toggle>

    <div class="mt-6 text-subtitle-2">Text</div>
    <v-btn-toggle
      v-model="toggle"
      color="primary"
      variant="text"
    >
      <v-btn icon="mdi-format-align-left"></v-btn>
      <v-btn icon="mdi-format-align-center"></v-btn>
      <v-btn icon="mdi-format-align-right"></v-btn>
      <v-btn icon="mdi-format-align-justify"></v-btn>
    </v-btn-toggle>

    <div class="mt-6 text-subtitle-2">Plain</div>
    <v-btn-toggle
      v-model="toggle"
      color="primary"
      variant="plain"
    >
      <v-btn icon="mdi-format-align-left"></v-btn>
      <v-btn icon="mdi-format-align-center"></v-btn>
      <v-btn icon="mdi-format-align-right"></v-btn>
      <v-btn icon="mdi-format-align-justify"></v-btn>
    </v-btn-toggle>

    <div class="mt-6 text-subtitle-2">Outlined</div>
    <v-btn-toggle
      v-model="toggle"
      color="primary"
      variant="outlined"
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
