<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-virtual-scroll v-bind="props" :items="items">
        <template v-slot:default="{ item }">
          Item {{ item }}
        </template>
      </v-virtual-scroll>
    </div>

    <!-- <template v-slot:configuration>
    </template> -->
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-virtual-scroll'
  const model = ref('default')
  const items = Array.from({ length: 1000 }, (k, v) => v + 1)
  const options = []
  const props = computed(() => {
    return {
      height: 300,
      items: Array.from({ length: 1000 }, (k, v) => v + 1).slice(0, 30),
    }
  })

  const slots = computed(() => {
    return `
  <template v-slot:default="{ item }">
    Item {{ item }}
  </template>
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
