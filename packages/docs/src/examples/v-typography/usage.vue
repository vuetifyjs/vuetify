<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
  >
    <div class="text-center">
      <v-typography v-bind="props">
        {{ text }}
      </v-typography>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="model"
        :items="options"
        label="Variant"
        hide-details
      ></v-select>

      <v-select
        v-model="color"
        :items="colors"
        label="Color"
        clearable
        hide-details
      ></v-select>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-typography'
  const model = ref('body-large')
  const text = 'The quick brown fox jumps over the lazy dog'
  const color = ref()

  const options = [
    'display-large',
    'display-medium',
    'display-small',
    'headline-large',
    'headline-medium',
    'headline-small',
    'title-large',
    'title-medium',
    'title-small',
    'body-large',
    'body-medium',
    'body-small',
    'label-large',
    'label-medium',
    'label-small',
  ]

  const colors = [
    'primary',
    'secondary',
    'success',
    'info',
    'warning',
    'error',
  ]

  const props = computed(() => {
    return {
      variant: model.value,
      color: color.value || undefined,
    }
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${text}</${name}>`
  })
</script>
