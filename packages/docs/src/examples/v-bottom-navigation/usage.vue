<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-layout class="overflow-visible">
      <v-bottom-navigation v-bind="props">
        <v-btn value="history">
          <v-icon>mdi-history</v-icon>

          <span>Recent</span>
        </v-btn>

        <v-btn value="favorites">
          <v-icon>mdi-heart</v-icon>

          <span>Favorites</span>
        </v-btn>

        <v-btn value="nearby">
          <v-icon>mdi-map-marker</v-icon>

          <span>Nearby</span>
        </v-btn>
      </v-bottom-navigation>
    </v-layout>

    <template v-slot:configuration>
      <v-slider v-model="elevation" label="Elevation" max="24" min="0" step="1"></v-slider>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-bottom-navigation'
  const model = ref('default')
  const options = ['grow', 'shift']
  const elevation = ref(4)

  const props = computed(() => {
    return {
      elevation: elevation.value === 4 ? undefined : elevation.value,
      grow: model.value === 'grow' || undefined,
      mode: model.value === 'shift' ? 'shift' : undefined,
    }
  })

  const slots = computed(() => {
    let str = ''

    str += `
  <v-btn value="recent">
    <v-icon>mdi-history</v-icon>

    <span>Recent</span>
  </v-btn>

  <v-btn value="favorites">
    <v-icon>mdi-heart</v-icon>

    <span>Favorites</span>
  </v-btn>

  <v-btn value="nearby">
    <v-icon>mdi-map-marker</v-icon>

    <span>Nearby</span>
  </v-btn>
`

    return str
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
