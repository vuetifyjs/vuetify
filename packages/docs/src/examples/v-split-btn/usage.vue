<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-split-btn v-bind="props" @click="last = 'Saved'">
        <template v-slot:menu>
          <v-list :items="items" item-props></v-list>
        </template>
      </v-split-btn>

      <div class="text-body-small mt-2">{{ last }}</div>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="color"
        :items="['primary', 'secondary', 'success', 'error']"
        label="Color"
        clearable
      ></v-select>

      <v-select
        v-model="size"
        :items="['x-small', 'small', 'default', 'large', 'x-large']"
        label="Size"
      ></v-select>

      <v-checkbox v-model="prependIcon" label="Prepend icon"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-split-btn'
  const model = shallowRef('default')
  const options = ['tonal', 'outlined']
  const color = shallowRef('primary')
  const size = shallowRef('default')
  const prependIcon = shallowRef(false)
  const last = shallowRef('')

  const items = [
    { title: 'Save as…', onClick: () => last.value = 'Saved as…' },
    { title: 'Save a copy', onClick: () => last.value = 'Saved a copy' },
  ]

  const props = computed(() => {
    return {
      color: color.value || undefined,
      prependIcon: prependIcon.value ? 'mdi-content-save' : undefined,
      size: size.value !== 'default' ? size.value : undefined,
      text: 'Save',
      variant: model.value !== 'default' ? model.value : undefined,
    }
  })

  const slots = computed(() => {
    return `
  <template v-slot:menu>
    <v-list :items="items" item-props></v-list>
  </template>
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
