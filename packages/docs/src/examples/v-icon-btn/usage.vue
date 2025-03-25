<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-icon-btn v-bind="props"></v-icon-btn>
    </div>
  </ExamplesUsageExample>
</template>

<script setup>
  const variants = ['outlined', 'tonal', 'flat', 'text', 'plain']
  const name = 'v-icon-btn'
  const model = shallowRef('default')
  const options = [...variants]
  const props = computed(() => {
    return {
      icon: '$vuetify',
      variant: model.value !== 'default' ? model.value : undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
