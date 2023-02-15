<template>
  <usage-example
    v-model="model"
    :name="name"
    :options="options"
    :code="code"
  >
    <v-layout
      class="elevation-2 rounded mx-auto bg-white"
      style="max-width: 448px; height: 150px"
    >
      <v-system-bar v-bind="props">
        <v-icon icon="mdi-wifi-strength-4"></v-icon>
        <v-icon icon="mdi-signal" class="ms-2"></v-icon>
        <v-icon icon="mdi-battery" class="ms-2"></v-icon>

        <span class="ms-2">3:13PM</span>
      </v-system-bar>

      <v-main></v-main>
    </v-layout>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-system-bar'
  const model = ref('default')
  const options = ['window']

  const props = computed(() => {
    return {
      window: model.value === 'window' || undefined,
    }
  })
  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>
  <v-icon icon="mdi-wifi-strength-4"></v-icon>
  <v-icon icon="mdi-signal" class="ms-2"></v-icon>
  <v-icon icon="mdi-battery" class="ms-2"></v-icon>

  <span class="ms-2">3:13PM</span>
</${name}>`
  })
</script>
