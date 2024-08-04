<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-icon v-bind="props"></v-icon>
    </div>

    <template v-slot:configuration>
      <v-select v-model="size" :items="sizes" label="Size"></v-select>

      <v-select v-model="color" :items="colors" label="Color"></v-select>

      <v-select v-model="icon" :items="icons" label="Icon" clearable></v-select>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-icon'
  const model = ref('default')
  const icon = ref()
  const size = ref()
  const color = ref()
  const options = []
  const props = computed(() => {
    return {
      color: color.value || undefined,
      icon: icon.value || '$vuetify',
      size: ['', 'medium'].includes(size.value) ? undefined : size.value,
    }
  })
  const colors = [
    'success',
    'info',
    'warning',
    'error',
  ]
  const icons = [
    'i-mdi:plus',
    'i-mdi:check-circle',
    'i-mdi:information',
    'i-mdi:alert',
    'i-mdi:alert-circle',
    'i-mdi:wifi',
    'i-mdi:access-point',
    'i-mdi:antenna',
  ]
  const sizes = [
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
  ]

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
