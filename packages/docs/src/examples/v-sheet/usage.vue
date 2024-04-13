<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="py-8 bg-surface-bright">
      <v-sheet
        v-if="sheet"
        v-model="sheet"
        v-bind="props"
        class="mx-auto"
      >
        <template v-slot:text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
        </template>
      </v-sheet>

      <div class="text-center">
        <v-btn v-if="!sheet" @click="sheet = true">
          Show sheet
        </v-btn>
      </div>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="color"
        :items="[
          'success',
          'info',
          'warning',
          'error',
        ]"
        label="Color"
        clearable
      ></v-select>

      <v-checkbox v-model="border" label="Border"></v-checkbox>

      <v-checkbox v-model="rounded" label="Rounded"></v-checkbox>

      <v-slider
        v-model="elevation"
        label="Elevation"
        max="24"
        min="0"
      ></v-slider>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-sheet'
  const model = ref('default')
  const sheet = ref(true)
  const border = ref(false)
  const elevation = ref(0)
  const rounded = ref(false)
  const color = ref()
  const options = []
  const props = computed(() => {
    return {
      elevation: elevation.value || undefined,
      height: 200,
      width: 200,
      border: border.value || undefined,
      color: color.value || undefined,
      rounded: rounded.value || undefined,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
