<template>
  <usage-example
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-skeleton-loader
        v-bind="props"
        class="mx-auto"
        max-width="300"
      ></v-skeleton-loader>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="type"
        :items="items"
        clearable
        label="Type"
      ></v-select>

      <v-select
        v-model="color"
        :items="colors"
        clearable
        label="Color"
      ></v-select>

      <v-slider
        v-model="elevation"
        label="Elevation"
        min="0"
        max="24"
      ></v-slider>
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
      elevation: elevation.value || undefined,
      boilerplate: model.value === 'boilerplate' || undefined,
      color: color.value || undefined,
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
