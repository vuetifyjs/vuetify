<template>
  <usage-example
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
      <v-slider v-model="elevation" label="Elevation" step="1" min="0" max="24"></v-slider>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

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

    Recent
  </v-btn>

  <v-btn value="favorites">
    <v-icon>mdi-heart</v-icon>

    Favorites
  </v-btn>

  <v-btn value="nearby">
    <v-icon>mdi-map-marker</v-icon>

    Nearby
  </v-btn>
`

    return str
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
