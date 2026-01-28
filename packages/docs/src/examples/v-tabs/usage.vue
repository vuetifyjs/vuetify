<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-card :class="direction === 'vertical' ? 'd-flex' : ''" elevation="2">
      <v-tabs
        v-model="tab"
        v-bind="props"
      >
        <v-tab value="one">Item One</v-tab>
        <v-tab value="two">Item Two</v-tab>
        <v-tab value="three">Item Three</v-tab>
      </v-tabs>

      <v-divider :vertical="direction === 'vertical'"></v-divider>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="one">
          <v-sheet class="pa-5" color="purple">One</v-sheet>
        </v-tabs-window-item>
        <v-tabs-window-item value="two">
          <v-sheet class="pa-5" color="orange">Two</v-sheet>
        </v-tabs-window-item>
        <v-tabs-window-item value="three">
          <v-sheet class="pa-5" color="cyan">Three</v-sheet>
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
        :items="['primary', 'cyan']"
        label="Color"
        clearable
      ></v-select>
      <v-select
        v-model="bgColor"
        :items="['orange', 'lime-lighten-2']"
        label="Background"
        clearable
      ></v-select>
      <v-checkbox
        v-model="hideSlider"
        color="secondary"
        label="Hide slider"
        hide-details
      ></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-tabs'
  const tab = shallowRef(0)

  const direction = shallowRef('horizontal')
  const color = shallowRef('primary')
  const bgColor = shallowRef(null)
  const hideSlider = shallowRef(false)

  const props = computed(() => {
    return {
      color: color.value || undefined,
      'bg-color': bgColor.value || undefined,
      direction: direction.value === 'vertical' ? direction.value : undefined,
      'hide-slider': hideSlider.value || undefined,
    }
  })

  const code = computed(() => {
    return `
<v-sheet${direction.value === 'vertical' ? 'class="d-flex"' : ''} elevation="2">
  <${name}${propsToString(props.value, [], 2)}>
    <v-tab value="one">Item One</v-tab>
    <v-tab value="two">Item Two</v-tab>
    <v-tab value="three">Item Three</v-tab>
  </${name}>

  <v-divider${direction.value === 'vertical' ? 'vertical' : ''}></v-divider>

  <v-tabs-window v-model="tab">
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
</script>
