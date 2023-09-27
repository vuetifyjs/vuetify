<template>
  <v-container fluid>
    <v-radio-group v-model="radios">
      <template v-slot:label>
        <div>Your favourite <strong>search engine</strong></div>
      </template>
      <v-radio value="Google">
        <template v-slot:label>
          <div>Of course it's <strong class="text-success">Google</strong></div>
        </template>
      </v-radio>
      <v-radio value="Duckduckgo">
        <template v-slot:label>
          <div>Definitely <strong class="text-primary">Duckduckgo</strong></div>
        </template>
      </v-radio>
    </v-radio-group>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const radios = ref('Duckduckgo')
</script>

<script>
  export default {
    data () {
      return {
        radios: 'Duckduckgo',
      }
    },
  }
</script>
