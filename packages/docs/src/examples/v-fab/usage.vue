<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-fab v-bind="props"></v-fab>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="color"
        :items="items"
        label="Color"
        clearable
      ></v-select>
      <v-checkbox v-model="extended" label="Extended"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const variants = ['outlined', 'tonal', 'flat', 'text', 'plain']
  const name = 'v-fab'
  const model = shallowRef('default')
  const options = [...variants]
  const extended = shallowRef(false)
  const color = shallowRef()
  const items = ['primary', 'success', 'surface-variant']

  const props = computed(() => {
    return {
      color: color.value || undefined,
      extended: extended.value || undefined,
      icon: !extended.value ? '$vuetify' : undefined,
      'prepend-icon': extended.value ? '$vuetify' : undefined,
      text: extended.value ? 'Extended' : undefined,
      variant: variants.includes(model.value) ? model.value : undefined,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
