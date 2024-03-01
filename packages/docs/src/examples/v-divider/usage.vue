<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="d-flex align-center justify-center" style="height: 200px;">
      <v-divider v-bind="props"></v-divider>
    </div>

    <template v-slot:configuration>
      <v-slider v-model="thickness" label="Thickness" max="20" min="1"></v-slider>

      <v-select v-model="opacity" :items="opacities" label="Opacity"></v-select>

      <v-select v-model="color" :items="colors" label="Color"></v-select>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
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
