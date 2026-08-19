<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="d-flex ga-12 justify-center">
      <v-badge v-bind="props" color="warning" dot>
        <v-icon icon="mdi-bell"></v-icon>
      </v-badge>

      <v-badge v-bind="props" color="error" content="1">
        <v-icon icon="mdi-cog"></v-icon>
      </v-badge>

      <v-badge v-bind="props" color="success" content="25">
        <v-icon icon="mdi-calendar"></v-icon>
      </v-badge>

      <v-badge v-bind="props" color="primary" content="99+">
        <v-icon icon="mdi-cart"></v-icon>
      </v-badge>
    </div>

    <template v-slot:configuration>
      <v-checkbox
        v-model="bordered"
        label="Bordered"
        hide-details
      ></v-checkbox>

      <div v-if="model !== 'inline'">
        <h5 class="pl-2 my-0">Location</h5>
        <v-radio-group
          v-model="location"
          class="pa-1 mb-2"
          density="compact"
          hide-details
        >
          <div class="d-flex">
            <v-radio value="top left"></v-radio>
            <v-radio value="top center"></v-radio>
            <v-radio value="top right"></v-radio>
          </div>
          <div class="d-flex">
            <v-radio value="left center"></v-radio>
            <v-radio class="opacity-0" disabled></v-radio>
            <v-radio value="right center"></v-radio>
          </div>
          <div class="d-flex">
            <v-radio value="bottom left"></v-radio>
            <v-radio value="bottom center"></v-radio>
            <v-radio value="bottom right"></v-radio>
          </div>
        </v-radio-group>
        <v-slider
          v-if="location !== 'top center' && location !== 'bottom center'"
          v-model="offsetX"
          label="Offset (x)"
          max="20"
          min="-20"
          step="5"
          hide-details
        ></v-slider>
        <v-slider
          v-if="location !== 'right center' && location !== 'left center'"
          v-model="offsetY"
          label="Offset (y)"
          max="20"
          min="-20"
          step="5"
          hide-details
        ></v-slider>
      </div>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-badge'
  const model = ref('default')
  const content = ref(0)
  const dot = ref(false)
  const bordered = ref(false)
  const options = ['floating', 'inline']
  const location = ref('top right')
  const offsetX = ref(0)
  const offsetY = ref(0)
  const props = computed(() => {
    return {
      content: content.value || undefined,
      dot: dot.value || undefined,
      bordered: bordered.value || undefined,
      floating: model.value === 'floating' || undefined,
      inline: model.value === 'inline' || undefined,
      location: location.value,
      'offset-x': offsetX.value || undefined,
      'offset-y': offsetY.value || undefined,
    }
  })

  const code = computed(() => {
    return `<div class="d-flex ga-12 justify-center">
  <v-badge${propsToString(props.value)} color="warning" dot>
    <v-icon icon="mdi-bell"></v-icon>
  </v-badge>

  <v-badge${propsToString(props.value)} color="error" content="1">
    <v-icon icon="mdi-cog"></v-icon>
  </v-badge>

  <v-badge${propsToString(props.value)} color="success" content="25">
    <v-icon icon="mdi-calendar"></v-icon>
  </v-badge>

  <v-badge${propsToString(props.value)} color="primary" content="99+">
    <v-icon icon="mdi-cart"></v-icon>
  </v-badge>
</div>`
  })
</script>

<style scoped>
  ::v-deep(.v-radio) {
    flex-grow: 0 !important;
  }
</style>
