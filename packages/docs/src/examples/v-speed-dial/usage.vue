<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-sheet class="text-center" height="420">
      <v-fab icon="$vuetify" size="large">
        <v-icon></v-icon>

        <v-speed-dial
          v-bind="props"
        >
          <v-btn key="1" icon="$success"></v-btn>
          <v-btn key="2" icon="$info"></v-btn>
          <v-btn key="3" icon="$warning"></v-btn>
          <v-btn key="4" icon="$error"></v-btn>
        </v-speed-dial>
      </v-fab>
    </v-sheet>

    <template v-slot:configuration>
      <v-select v-model="location1" :items="locations1" label="Location 1"></v-select>
      <v-select v-model="location2" :items="locations2" label="Location 2"></v-select>
      <v-select v-model="transition" :items="transitions" label="Transition"></v-select>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-speed-dial'
  const model = shallowRef('default')
  const options = []
  const location1 = shallowRef('Bottom')
  const locations1 = ['Top', 'Bottom', 'Left', 'Right']
  const location2 = shallowRef('Center')
  const locations2 = ['Top', 'Bottom', 'Center', 'Left', 'Right']
  const location = computed(() => `${location1.value.toLowerCase()} ${location2.value.toLowerCase()}`)
  const transition = shallowRef('fade-transition')
  const transitions = ['scale-transition', 'slide-x-transition', 'slide-y-transition', 'slide-x-reverse-transition', 'slide-y-reverse-transition']
  const props = computed(() => {
    return {
      activator: 'parent',
      location: location.value,
      transition: transition.value,
    }
  })

  const slots = computed(() => {
    return `
  <template v-slot:activator="{ props: activatorProps }">
    <v-fab
      v-bind="activatorProps"
      size="large"
      icon="$vuetify"
    ></v-fab>
  </template>

  <v-btn key="1" icon="$success"></v-btn>
  <v-btn key="2" icon="$info"></v-btn>
  <v-btn key="3" icon="$warning"></v-btn>
  <v-btn key="4" icon="$error"></v-btn>
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
