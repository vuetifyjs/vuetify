<template>
  <usage-example
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-skeleton-loader v-bind="props"></v-skeleton-loader>
    </div>

    <template v-slot:configuration>
      <v-select v-model="type" label="Type" :items="items" clearable></v-select>

      <v-select v-model="color" label="Color" :items="colors" clearable></v-select>

      <v-slider v-model="elevation" label="Elevation" min="0" max="24"></v-slider>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-skeleton-loader'
  const model = ref('default')
  const options = ['boilerplate']
  const elevation = ref()
  const color = ref()
  const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
  const items = ['card', 'paragraph', 'list-item-avatar', 'article', 'card-avatar']
  const type = ref(undefined)

  const props = computed(() => {
    return {
      boilerplate: model.value === 'boilerplate' || undefined,
      color: color.value || undefined,
      elevation: elevation.value || undefined,
      type: type.value || undefined,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<v-skeleton-loader${propsToString(props.value)}>${slots.value}</v-skeleton-loader>`
  })
</script>
