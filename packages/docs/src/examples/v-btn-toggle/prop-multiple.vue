<template>
  <div class="d-flex flex-column align-center bg-grey-lighten-4 pa-6">
    <v-btn-toggle
      v-model="toggle"
      multiple
    >
      <v-btn icon="mdi-format-align-left" value="left"></v-btn>
      <v-btn icon="mdi-format-align-center" value="center"></v-btn>
      <v-btn icon="mdi-format-align-right" value="right"></v-btn>
      <v-btn icon="mdi-format-align-justify" value="justify"></v-btn>
    </v-btn-toggle>

    <pre class="pt-2">{{ toggle }}</pre>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        toggle: [],
      }
    },
  }
</script>
