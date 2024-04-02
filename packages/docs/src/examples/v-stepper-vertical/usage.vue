<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-container>
      <v-stepper-vertical :items="items">
        <template v-slot:item.1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
        </template>

        <template v-slot:item.2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
        </template>

        <template v-slot:item.3>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
        </template>
      </v-stepper-vertical>
    </v-container>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-stepper-vertical'
  const model = ref('default')
  const options = []

  const items = [
    'Step 1',
    'Step 2',
    'Step 3',
  ]
  const props = computed(() => {
    return {
      items: [
        'Step 1',
        'Step 2',
        'Step 3',
      ],
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<v-stepper-vertical${propsToString(props.value)}>${slots.value}</v-stepper-vertical>`
  })
</script>
