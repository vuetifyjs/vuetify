<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div>
      <v-toolbar v-bind="props">
        <v-spacer></v-spacer>
        <v-btn icon="mdi-menu"></v-btn>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </v-toolbar>
    </div>

    <template v-slot:configuration>
      <v-select v-model="density" label="Density" :items="['default', 'comfortable', 'compact']"></v-select>

      <v-text-field v-model="title" label="Title" clearable></v-text-field>

      <v-checkbox v-model="collapse" label="Collapsed"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-toolbar'
  const model = ref('default')
  const collapse = ref()
  const density = ref('default')
  const title = ref('Application')
  const options = ['elevated', 'bordered']
  const props = computed(() => {
    return {
      border: model.value === 'bordered' ? true : undefined,
      collapse: collapse.value || undefined,
      density: density.value === 'default' ? undefined : density.value,
      elevation: model.value === 'elevated' ? 8 : undefined,
      title: title.value || undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
