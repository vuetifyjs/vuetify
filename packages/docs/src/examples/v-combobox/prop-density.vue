<template>
  <v-card>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-combobox
            v-model="value"
            :items="items"
            label="Default"
          ></v-combobox>
        </v-col>
        <v-col cols="12">
          <v-combobox
            v-model="value"
            :items="items"
            density="comfortable"
            label="Comfortable"
          ></v-combobox>
        </v-col>
        <v-col cols="12">
          <v-combobox
            v-model="value"
            :items="items"
            density="compact"
            label="Compact"
          ></v-combobox>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const items = ['foo', 'bar', 'fizz', 'buzz']

  const value = ref('foo')
</script>

<script>
  export default {
    data: () => ({
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: 'foo',
    }),
  }
</script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=2047-82842"
}
</example-meta>
