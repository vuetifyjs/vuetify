<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-navigation-drawer
        permanent
        v-bind="props"
      >
        <v-list-item subtitle="Vuetify" title="My Application"></v-list-item>
        <v-divider></v-divider>
        <v-list-item title="List Item 1" link></v-list-item>
        <v-list-item title="List Item 2" link></v-list-item>
        <v-list-item title="List Item 3" link></v-list-item>
      </v-navigation-drawer>
    </div>

    <template v-slot:configuration>
      <v-slider v-model="width" label="Width" max="400" min="100" step="1"></v-slider>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-navigation-drawer'
  const model = ref('default')
  const width = shallowRef(256)
  const options = []
  const props = computed(() => {
    return {
      width: width.value === 256 ? undefined : width.value || undefined,
    }
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
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
