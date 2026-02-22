<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <div class="d-flex flex-column justify-center align-center ga-3">
      <v-btn :color="color" icon @click="next">
        <v-morphing-icon :icon="icon" v-bind="props"></v-morphing-icon>
      </v-btn>
      <span class="text-caption">Click to change icon</span>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="color"
        :items="colors"
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
  import { getForeground, parseColor } from 'vuetify/lib/util/colorUtils'
  import { useTheme } from 'vuetify'

  const theme = useTheme()
  const colors = ['primary', 'secondary', 'success', 'error', 'warning', 'info', 'surface-variant']
  const color = shallowRef()
  const dark = shallowRef(false)

  watch(color, val => {
    if (!val) return
    const hex = theme.current.value.colors[color.value]
    if (!hex) return
    dark.value = getForeground(parseColor(hex)) === '#fff'
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
      dark: dark.value || undefined,
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
    return `<v-btn${btnProps} icon @click="next">
  <${name} :icon="icon"${propsToString(props.value)}></${name}>
</v-btn>`
  })
</script>
