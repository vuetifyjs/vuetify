<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-responsive
        v-bind="props"
        :aspect-ratio="model.split(' / ')[0] / model.split(' / ')[1]"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
      </v-responsive>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="contentClass" label="Content class"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-responsive'
  const model = ref('default')
  const options = ['16 / 9', '4 / 3']
  const contentClass = ref(false)
  const props = computed(() => {
    return {
      'aspect-ratio': model.value !== 'default' ? model.value : undefined,
      class: 'border pa-4',
      'content-class': contentClass.value ? 'bg-primary' : undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value, ['aspect-ratio'])}>${slots.value}</${name}>`
  })
</script>
