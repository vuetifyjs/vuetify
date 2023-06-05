<template>
  <v-card>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-autocomplete
            v-model="values"
            :items="items"
            label="Default"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12">
          <v-autocomplete
            v-model="values"
            :items="items"
            density="comfortable"
            label="Comfortable"
          ></v-autocomplete>
        </v-col>

        <v-col cols="12">
          <v-autocomplete
            v-model="values"
            :items="items"
            density="compact"
            label="Compact"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const items = ref(['foo', 'bar', 'fizz', 'buzz'])
  const values = ref('foo')
  const value = ref(null)
</script>

<script>
  export default {
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      values: 'foo',
      value: null,
    }),
  }
</script>
