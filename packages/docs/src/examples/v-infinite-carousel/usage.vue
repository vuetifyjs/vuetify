<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <v-infinite-carousel v-bind="props">
      <v-chip v-for="item in items" :key="item" color="primary">
        {{ item }}
      </v-chip>
    </v-infinite-carousel>

    <template v-slot:configuration>
      <v-checkbox v-model="draggable" label="Draggable" hide-details></v-checkbox>
      <v-checkbox v-model="reverse" label="Reverse" hide-details></v-checkbox>
      <v-checkbox v-model="hold" label="Hold (no auto-play)" hide-details></v-checkbox>
      <v-checkbox v-model="arrows" label="Show arrows" hide-details></v-checkbox>

      <v-slider
        v-model="maskSize"
        label="Mask"
        max="120"
        min="0"
      ></v-slider>

      <v-slider
        v-model="gap"
        label="Gap"
        max="64"
        min="0"
      ></v-slider>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-infinite-carousel'
  const model = ref('default')
  const options = []

  const items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`)

  const draggable = ref(false)
  const reverse = ref(false)
  const hold = ref(false)
  const arrows = ref(false)
  const maskSize = ref(60)
  const gap = ref(32)

  const props = computed(() => {
    return {
      draggable: draggable.value || undefined,
      'auto-play': hold.value ? undefined : { reverse: reverse.value },
      'show-arrows': arrows.value || undefined,
      mask: maskSize.value ? { size: maskSize.value } : undefined,
      gap: gap.value !== 32 ? gap.value : undefined,
    }
  })

  const script = computed(() => {
    return `<${''}script setup>
  const items = Array.from({ length: 12 }, (_, i) => \`Item \${i + 1}\`)
<` + '/script>'
  })

  const code = computed(() => {
    return `<${name} ${propsToString(props.value)}>
  <v-chip v-for="item in items" :key="item" color="primary">
    {{ item }}
  </v-chip>
</${name}>`
  })
</script>
