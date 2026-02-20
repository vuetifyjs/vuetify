<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <v-card :class="direction === 'vertical' ? 'd-flex' : ''" elevation="4">
      <v-tabs
        v-model="tab"
        v-bind="props"
      >
        <v-tab value="one">Item One</v-tab>
        <v-tab value="two">Item Two</v-tab>
        <v-tab value="three">Item Three</v-tab>
      </v-tabs>

      <v-divider v-if="!inset" :vertical="direction === 'vertical'"></v-divider>

      <v-tabs-window v-model="tab" :class="{ 'flex-fill': direction === 'vertical' }">
        <v-tabs-window-item value="one">
          <v-sheet class="pa-5" color="purple" min-height="200">One</v-sheet>
        </v-tabs-window-item>
        <v-tabs-window-item value="two">
          <v-sheet class="pa-5" color="orange" min-height="200">Two</v-sheet>
        </v-tabs-window-item>
        <v-tabs-window-item value="three">
          <v-sheet class="pa-5" color="cyan" min-height="200">Three</v-sheet>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>

    <template v-slot:configuration>
      <v-select
        v-model="direction"
        :items="['horizontal', 'vertical']"
        label="Direction"
        mandatory
      ></v-select>
      <v-select
        v-model="color"
        :items="['primary', 'cyan', 'red']"
        label="Color"
        clearable
      ></v-select>
      <v-select
        v-model="bgColor"
        :items="['blue-grey-darken-4', 'indigo-lighten-1']"
        label="Background"
        clearable
      ></v-select>
      <v-select
        v-model="sliderColor"
        :items="['teal-darken-2', 'indigo-lighten-4']"
        label="Slider color"
        clearable
      ></v-select>
      <v-checkbox v-model="grow" label="Grow" hide-details></v-checkbox>
      <v-checkbox v-if="model !== 'inset'" v-model="hideSlider" label="Hide slider" hide-details></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-tabs'
  const model = ref('default')
  const options = ['inset']
  const tab = shallowRef(0)

  const direction = shallowRef('horizontal')
  const color = shallowRef('primary')
  const bgColor = shallowRef(null)
  const sliderColor = shallowRef(null)
  const grow = shallowRef(false)
  const hideSlider = shallowRef(false)

  const props = computed(() => {
    return {
      color: color.value || undefined,
      'bg-color': bgColor.value || undefined,
      direction: direction.value === 'vertical' ? direction.value : undefined,
      'slider-color': sliderColor.value || undefined,
      grow: grow.value || undefined,
      'hide-slider': (model.value !== 'inset' && hideSlider.value) || undefined,
      inset: model.value === 'inset' || undefined,
      class: model.value === 'inset' ? 'mb-2' : undefined,
    }
  })

  const code = computed(() => {
    return `
<v-sheet${direction.value === 'vertical' ? ' class="d-flex"' : ''} elevation="4">
  <${name} v-model="tab"${propsToString(props.value, [], 2)}>
    <v-tab value="one">Item One</v-tab>
    <v-tab value="two">Item Two</v-tab>
    <v-tab value="three">Item Three</v-tab>
  </${name}>${model.value !== 'inset' ? `\n\n  <v-divider${direction.value === 'vertical' ? ' vertical' : ''}></v-divider>` : ''}

  <v-tabs-window v-model="tab"${direction.value === 'vertical' ? ' class="flex-fill"' : ''}>
    <v-tabs-window-item value="one">
      <v-sheet class="pa-5" color="purple">One</v-sheet>
    </v-tabs-window-item>
    <v-tabs-window-item value="two">
      <v-sheet class="pa-5" color="orange">Two</v-sheet>
    </v-tabs-window-item>
    <v-tabs-window-item value="three">
      <v-sheet class="pa-5" color="brown">Three</v-sheet>
    </v-tabs-window-item>
  </v-tabs-window>
</v-sheet>`
  })

  const script = computed(() => {
    return `<script setup>
  import { ref } from 'vue'

  const tab = ref('one')
<` + '/script>'
  })
</script>
