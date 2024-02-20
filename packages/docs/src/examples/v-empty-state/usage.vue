<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-empty-state
      v-bind="props"
    ></v-empty-state>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-empty-state'
  const model = ref('default')
  const options = []

  const props = computed(() => {
    return {
      title: 'Whoops, 404',
      subtitle: 'Page not found',
      text: 'The page you were looking for does not exist',
      avatar: 'https://vuetifyjs.b-cdn.net/docs/images/logos/v.png'
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
