<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="variants"
  >
    <div>
      <v-video class="mx-auto" v-bind="props"></v-video>
    </div>

    <template v-slot:configuration>
      <v-select v-model="theme" :items="['light', 'dark']" label="Theme" clearable></v-select>
      <v-select v-model="color" :items="colorOptions" label="Color" clearable></v-select>
      <v-select v-model="elevation" :items="[1, 3, 5]" label="Elevation" clearable></v-select>
      <v-select v-model="aspectRatio" :items="['16/9', '3/2', '1']" label="Aspect ratio" clearable></v-select>
      <v-checkbox v-model="thumb" label="Thumb"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-video'
  const variants = ['pill', 'wavy']

  const model = shallowRef('default')
  const thumb = shallowRef(true)
  const theme = shallowRef(null)
  const color = shallowRef(null)
  const elevation = shallowRef(null)
  const aspectRatio = shallowRef('16/9')

  const colorOptions = [
    'primary',
    'green',
    'cyan',
    'lime-accent-4',
  ]

  const props = computed(() => {
    return {
      theme: theme.value || undefined,
      color: color.value || undefined,
      elevation: elevation.value || undefined,
      'aspect-ratio': aspectRatio.value || undefined,
      'hide-thumb': !thumb.value || undefined,
      'progress-variant': model.value === 'default' ? undefined : model.value,
      image: 'https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-sunflowers.jpg',
      src: 'https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-sunflowers.mp4',
    }
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)} />`
  })
</script>
