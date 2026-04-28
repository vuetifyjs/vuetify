<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <div class="d-flex flex-column justify-center align-center ga-3">
      <v-btn :color="color" size="x-large" icon @click="next">
        <v-morphing-icon :icon="icon" v-bind="props"></v-morphing-icon>
      </v-btn>
      <span>☝️</span>
      <span class="text-body-medium">Click to change icon</span>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="color"
        :items="colors"
        item-title="title"
        item-value="hex"
        label="Color"
        clearable
      ></v-select>
      <v-checkbox v-model="dark" label="on dark background"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-morphing-icon'
  const model = shallowRef('default')
  const options = []
  const colors = [
    { title: 'Red', hex: '#f44336', isDark: true },
    { title: 'Purple', hex: '#9c27b0', isDark: true },
    { title: 'Blue', hex: '#2196f3', isDark: true },
    { title: 'Lime', hex: '#cddc39', isDark: false },
    { title: 'Orange', hex: '#ff9800', isDark: false },
  ]
  const color = shallowRef()
  const dark = shallowRef(false)

  watch(color, val => {
    if (!val) {
      dark.value = false
      return
    }
    dark.value = colors.find(c => c.hex === val)?.isDark ?? false
  })

  const icons = [
    'mdi-heart',
    'mdi-star',
    'mdi-account',
    'mdi-home',
    'mdi-bell',
    'mdi-cog',
  ]

  const props = computed(() => {
    return {
      dark: dark.value || (color.value ? false : undefined),
    }
  })

  const index = shallowRef(0)
  const clicked = shallowRef(false)
  const icon = computed(() => icons[index.value % icons.length])

  function next () {
    index.value++
    clicked.value = true
  }

  const script = computed(() => {
    return `<` + `script setup>
  import { shallowRef } from 'vue'

  const icons = [${icons.map(i => `'${i}'`).join(', ')}]
  const index = shallowRef(0)
  const icon = computed(() => icons[index.value % icons.length])

  function next () {
    index.value++
  }
<` + '/script>'
  })

  const code = computed(() => {
    const btnProps = color.value ? ` color="${color.value}"` : ''
    return `<v-btn${btnProps} size="x-large" icon @click="next">
  <${name} :icon="icon"${propsToString(props.value)}></${name}>
</v-btn>`
  })
</script>
