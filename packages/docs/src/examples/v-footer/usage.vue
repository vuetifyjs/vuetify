<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-footer v-bind="props">
        {{ new Date().getFullYear() }} — <strong>Vuetify, LLC</strong>
      </v-footer>
    </div>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-footer'
  const model = ref('default')
  const options = ['bordered']
  const props = computed(() => {
    return {
      border: model.value === 'bordered' || undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
