<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-loading-indicator v-bind="props" aria-label="Loading"></v-loading-indicator>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="color"
        :items="['primary', 'secondary', 'success', 'error']"
        label="Color"
        clearable
      ></v-select>

      <v-select
        v-model="size"
        :items="['x-small', 'small', 'default', 'large', 'x-large']"
        label="Size"
      ></v-select>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-loading-indicator'
  const model = shallowRef('default')
  const options = ['contained']
  const color = shallowRef('primary')
  const size = shallowRef('default')

  const props = computed(() => {
    return {
      color: color.value || undefined,
      contained: model.value === 'contained' || undefined,
      size: size.value !== 'default' ? size.value : undefined,
    }
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}></${name}>`
  })
</script>
