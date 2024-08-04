<template>
  <div class="d-flex flex-column align-center bg-grey-lighten-4 pa-6">
    <v-btn-toggle
      v-model="toggle"
      multiple
    >
      <v-btn icon="i-mdi:format-align-left" value="left"></v-btn>
      <v-btn icon="i-mdi:format-align-center" value="center"></v-btn>
      <v-btn icon="i-mdi:format-align-right" value="right"></v-btn>
      <v-btn icon="i-mdi:format-align-justify" value="justify"></v-btn>
    </v-btn-toggle>

    <pre class="pt-2">{{ toggle }}</pre>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const toggle = ref([])
</script>

<script>
  export default {
    data () {
      return {
        toggle: [],
      }
    },
  }
</script>
