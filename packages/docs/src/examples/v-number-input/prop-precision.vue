<template>
  <v-container>
    <v-row>
      <v-col>
        <h5>(default precision="0")</h5>
        <v-number-input v-model="example1" hide-details="auto"></v-number-input>
        <code class="d-block pt-3">value: {{ example1 }}</code>
      </v-col>
      <v-col>
        <h5>(precision="2")</h5>
        <v-number-input v-model="example2" :precision="2" hide-details="auto"></v-number-input>
        <code class="d-block pt-3">value: {{ example2 }}</code>
      </v-col>
      <v-col>
        <h5>(precision="5")</h5>
        <v-number-input v-model="example3" :precision="5" hide-details="auto"></v-number-input>
        <code class="d-block pt-3">value: {{ example3 }}</code>
      </v-col>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const example1 = ref(123)
  const example2 = ref(25.5)
  const example3 = ref(0.052)
</script>

<script>
  export default {
    data: () => ({
      example1: 123,
      example2: 25.5,
      example3: 0.052,
    }),
  }
</script>
