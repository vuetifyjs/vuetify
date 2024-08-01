<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-layout
      class="elevation-2 rounded mx-auto bg-white"
      style="max-width: 448px; height: 150px"
    >
      <v-system-bar v-bind="props">
        <v-icon icon="i-mdi:wifi-strength-4"></v-icon>
        <v-icon class="ms-2" icon="i-mdi:signal"></v-icon>
        <v-icon class="ms-2" icon="i-mdi:battery"></v-icon>

        <span class="ms-2">3:13PM</span>
      </v-system-bar>

      <v-main></v-main>
    </v-layout>
  </ExamplesUsageExample>
</template>

<script setup>
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
  <v-icon icon="i-mdi:wifi-strength-4"></v-icon>
  <v-icon icon="i-mdi:signal" class="ms-2"></v-icon>
  <v-icon icon="i-mdi:battery" class="ms-2"></v-icon>

  <span class="ms-2">3:13PM</span>
</${name}>`
  })
</script>
