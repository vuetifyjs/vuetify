<template>
  <usage-example
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-layout class="overflow-visible">
      <v-app-bar v-bind="props">
        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Application Bar</v-app-bar-title>

        <template v-if="actions" v-slot:append>
          <v-btn icon="mdi-heart"></v-btn>

          <v-btn icon="mdi-magnify"></v-btn>

          <v-btn icon="mdi-dots-vertical"></v-btn>
        </template>
      </v-app-bar>

      <v-main style="height: 250px;"></v-main>
    </v-layout>

    <template v-slot:configuration>
      <v-checkbox v-model="actions" label="Actions"></v-checkbox>

      <v-slider v-model="elevation" label="Elevation" step="1" min="0" max="24"></v-slider>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-app-bar'
  const model = ref('default')
  const actions = ref(false)
  const elevation = ref(2)
  const options = ['collapse', 'rounded']

  const props = computed(() => {
    return {
      collapse: model.value === 'collapse' ? true : undefined,
      elevation: elevation.value === 4 ? undefined : elevation.value,
      rounded: model.value === 'rounded' ? true : undefined,
    }
  })

  const slots = computed(() => {
    let str = ''

    if (actions.value) {
      str += `
  <template v-slot:append>
    <v-btn icon="mdi-heart"></v-btn>

    <v-btn icon="mdi-magnify"></v-btn>

    <v-btn icon="mdi-dots-vertical"></v-btn>
  </template>
`
    }

    return str
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
