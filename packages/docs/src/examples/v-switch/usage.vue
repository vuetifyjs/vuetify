<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="d-flex flex-column align-center ga-3">
      <v-fade-transition>
        <v-chip
          v-if="requiresLatest"
          class="position-absolute top-0 mt-6"
          color="warning"
          prepend-icon="mdi-information-outline"
          text="Requires Vuetify v4.1.0+"
          variant="tonal"
        ></v-chip>
      </v-fade-transition>

      <v-switch v-bind="props"></v-switch>
    </div>

    <template v-slot:configuration>
      <v-checkbox
        v-model="indeterminate"
        label="Indeterminate"
        hide-details
      ></v-checkbox>

      <v-checkbox
        v-model="icons"
        label="Icons"
        hide-details
      ></v-checkbox>

      <v-checkbox
        v-model="loading"
        label="Loading"
        hide-details
      ></v-checkbox>

      <v-slider
        v-model="sizeIndex"
        :ticks="sizeTicks"
        class="mt-2 mb-6 px-2"
        max="4"
        min="0"
        show-ticks="always"
        step="1"
        tick-size="4"
        hide-details
      ></v-slider>

      <v-select
        v-model="color"
        :items="colors"
        class="mt-4"
        label="Color"
        clearable
        hide-details
      ></v-select>

      <v-select
        v-model="baseColor"
        :items="colors"
        class="mt-4"
        label="Base color"
        clearable
        hide-details
      ></v-select>

      <v-select
        v-model="thumbColor"
        :items="colors"
        class="mt-4"
        label="Thumb color"
        clearable
        hide-details
      ></v-select>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-switch'
  const model = ref('default')
  const indeterminate = ref(false)
  const icons = ref(true)
  const loading = ref(false)
  const options = ['inset', 'material', 'square']

  const colors = ['primary', '#ac46ff', 'orange-darken-2']
  const color = ref()
  const baseColor = ref()
  const thumbColor = ref()

  const sizes = ['x-small', 'small', 'default', 'large', 'x-large']
  const sizeIndex = ref(2)
  const sizeTicks = { 0: 'xs', 1: 'sm', 2: 'md', 3: 'lg', 4: 'xl' }
  const size = computed(() => sizes[sizeIndex.value])

  const requiresLatest = computed(() => {
    return size.value !== 'default' ||
      ['material', 'square'].includes(model.value) ||
      !!thumbColor.value
  })

  const props = computed(() => {
    return {
      label: 'Switch',
      inset: model.value === 'default' ? undefined
        : model.value === 'inset' ? true
          : model.value,
      size: size.value === 'default' ? undefined : size.value,
      'true-icon': icons.value ? 'mdi-check' : undefined,
      'false-icon': icons.value ? 'mdi-close' : undefined,
      color: color.value || undefined,
      'base-color': baseColor.value || undefined,
      'thumb-color': thumbColor.value || undefined,
      indeterminate: indeterminate.value || undefined,
      loading: loading.value || undefined,
    }
  })

  watch(model, () => indeterminate.value = false)

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
