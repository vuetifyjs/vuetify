<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="d-flex justify-center" style="min-height: 230px">
      <v-fade-transition>
        <v-chip
          v-if="model === 'pill'"
          class="position-absolute top-0 mt-6"
          color="warning"
          prepend-icon="mdi-information-outline"
          text="Requires Vuetify v4.3.0+"
          variant="tonal"
        ></v-chip>
      </v-fade-transition>

      <v-slider
        v-bind="props"
        :model-value="30"
        :value-format="money ? formatMoney : undefined"
      ></v-slider>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="color"
        :items="colors"
        class="mb-2"
        label="Color"
        clearable
        hide-details
      ></v-select>

      <v-checkbox v-model="centered" label="Centered" hide-details></v-checkbox>

      <v-checkbox v-model="vertical" label="Vertical" hide-details></v-checkbox>

      <v-checkbox v-model="icons" label="With icons" hide-details></v-checkbox>

      <v-checkbox v-model="money" label="Value format" hide-details></v-checkbox>

      <v-slider
        v-if="model === 'pill'"
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
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-slider'
  const model = ref('default')
  const options = ['pill']
  const centered = ref(false)
  const vertical = ref(false)
  const icons = ref(false)
  const money = ref(false)
  const colors = ['primary', '#ac46ff', 'orange-darken-2']
  const color = ref()

  const sizes = ['x-small', 'small', 'medium', 'large', 'x-large']
  const sizeIndex = ref(0)
  const sizeTicks = { 0: 'xs', 1: 'sm', 2: 'md', 3: 'lg', 4: 'xl' }

  watch(icons, val => {
    if (val) sizeIndex.value = 2
  })

  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
  const formatMoney = ({ value }) => currency.format(value)

  const props = computed(() => {
    const isPill = model.value === 'pill'
    const [low, high] = money.value
      ? ['mdi-minus', 'mdi-plus']
      : ['mdi-volume-low', 'mdi-volume-high']
    return {
      variant: model.value === 'default' ? undefined : model.value,
      size: isPill && sizeIndex.value ? sizes[sizeIndex.value] : undefined,
      centered: centered.value || undefined,
      min: centered.value ? -50 : undefined,
      max: centered.value ? 50 : undefined,
      direction: vertical.value ? 'vertical' : undefined,
      color: color.value || undefined,
      'prepend-icon': icons.value && !isPill ? low : undefined,
      'append-icon': icons.value && !isPill ? high : undefined,
      'prepend-inner-icon': icons.value && isPill ? low : undefined,
      'append-inner-icon': icons.value && isPill ? high : undefined,
      step: money.value ? 0.01 : undefined,
      'thumb-label': money.value ? 'always' : undefined,
      'value-format': money.value ? `({ value }) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)` : undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value, ['value-format'])}>${slots.value}</${name}>`
  })
</script>
