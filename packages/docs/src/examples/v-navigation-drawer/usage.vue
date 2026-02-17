<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <div>
      <v-navigation-drawer
        v-model="open"
        :temporary="!permanent"
        v-bind="props"
      >
        <v-list-item subtitle="Vuetify" title="My Application"></v-list-item>
        <v-divider></v-divider>
        <v-list-item title="List Item 1" link></v-list-item>
        <v-list-item title="List Item 2" link></v-list-item>
        <v-list-item title="List Item 3" link></v-list-item>
      </v-navigation-drawer>
      <v-container class="d-flex align-center justify-center">
        <v-switch v-if="!permanent" v-model="open" color="success"></v-switch>
      </v-container>
    </div>

    <template v-slot:configuration>
      <v-select v-model="color" :items="colors" label="Color" clearable></v-select>
      <v-slider v-model="width" label="Width" max="400" min="100" step="5"></v-slider>
      <v-checkbox v-model="permanent" label="Permanent"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-navigation-drawer'

  const colors = ['primary', 'purple-darken-2', 'surface-variant']

  const model = ref('default')
  const color = shallowRef()
  const width = shallowRef(256)
  const permanent = shallowRef(true)
  const open = shallowRef(true)
  const options = []

  const props = computed(() => {
    return {
      permanent: permanent.value || undefined,
      location: location.value || undefined,
      color: color.value || undefined,
      width: width.value === 256 ? undefined : width.value || undefined,
    }
  })

  const modelValueTemplateCode = computed(() => {
    return !permanent.value
      ? ` v-model="open"`
      : ''
  })

  const modelValueToggle = computed(() => {
    return !permanent.value
      ? `\n<v-main class="d-flex align-center justify-center">
  <v-switch v-model="open" color="success"></v-switch>
</v-main>`
      : ''
  })

  const script = toRef(() => {
    return !permanent.value
      ? `<script setup>
  import { shallowRef } from 'vue'

  const open = shallowRef(true)
<\\/script>`.replace('\\/', '/')
      : ''
  })

  const slots = computed(() => {
    return `
  <v-list-item title="My Application" subtitle="Vuetify"></v-list-item>
  <v-divider></v-divider>
  <v-list-item link title="List Item 1"></v-list-item>
  <v-list-item link title="List Item 2"></v-list-item>
  <v-list-item link title="List Item 3"></v-list-item>
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}${modelValueTemplateCode.value}>${slots.value}</${name}>
${modelValueToggle.value}`
  })
</script>
