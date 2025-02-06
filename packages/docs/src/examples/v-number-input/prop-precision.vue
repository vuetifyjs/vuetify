<template>
  <v-container>
    <v-row>
      <v-col>
        <h5>(precision unrestricted)</h5>
        <v-number-input v-model="example1" hide-details="auto"></v-number-input>
        <code class="d-block pt-3">value: {{ example1 }}</code>
      </v-col>
      <v-col>
        <h5>(precision="0")</h5>
        <v-number-input v-model="example2" :precision="0" hide-details="auto"></v-number-input>
        <code class="d-block pt-3">value: {{ example2 }}</code>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h5>(precision="2")</h5>
        <v-number-input v-model="example3" :precision="2" hide-details="auto"></v-number-input>
        <code class="d-block pt-3">value: {{ example3 }}</code>
      </v-col>
      <v-col>
        <h5>(precision="5")</h5>
        <v-number-input v-model="example4" :precision="5" hide-details="auto"></v-number-input>
        <code class="d-block pt-3">value: {{ example4 }}</code>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const example1 = ref(4.052)
  const example2 = ref(123)
  const example3 = ref(25.5)
  const example4 = ref(0.052)
</script>

<script>
  export default {
    data: () => ({
      example1: 4.052,
      example2: 123,
      example3: 25.5,
      example4: 0.052,
    }),
  }
</script>
