<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div style="height: 200px;" class="d-flex align-center justify-center">
      <v-divider v-bind="props"></v-divider>
    </div>

    <template v-slot:configuration>
      <v-slider v-model="thickness" min="1" max="20" label="Thickness"></v-slider>

      <v-select v-model="opacity" label="Opacity" :items="opacities"></v-select>

      <v-select v-model="color" label="Color" :items="colors"></v-select>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-divider'
  const model = ref('default')
  const color = ref()
  const opacity = ref('default')
  const thickness = ref(1)
  const colors = [
    'success',
    'info',
    'warning',
    'error',
  ]
  const opacities = [100, 75, 50, 25, 'default', 0]
  const options = ['inset', 'vertical']
  const props = computed(() => {
    let classes

    if (opacity.value != null && opacity.value !== 'default') {
      classes = `border-opacity-${opacity.value}`
    }
    return {
      thickness: thickness.value !== 1 ? thickness.value : undefined,
      class: classes || undefined,
      color: color.value || undefined,
      inset: model.value === 'inset' || undefined,
      vertical: model.value === 'vertical' || undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
