<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="controlsVariants"
  >
    <div>
      <v-video class="mx-auto" v-bind="props"></v-video>
    </div>

    <template v-slot:configuration>
      <v-select v-model="theme" :items="['light', 'dark']" label="Theme" clearable></v-select>
      <v-select v-model="color" :items="colorOptions" label="Color" clearable></v-select>
      <v-select v-model="elevation" :items="[1, 3, 5]" label="Elevation" clearable></v-select>
      <v-select v-model="aspectRatio" :items="['16/9', '3/2', '1']" label="Aspect ratio" clearable></v-select>
      <v-checkbox v-if="!isHidden" v-model="hidePlay" label="Hide play"></v-checkbox>
      <v-checkbox v-if="!isHidden" v-model="hideVolume" label="Hide volume"></v-checkbox>
      <v-checkbox v-if="!isHidden" v-model="noFullscreen" label="No fullscreen"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-video'
  const controlsVariants = ['tube', 'mini', 'hidden']

  const model = shallowRef('default')
  const hidePlay = shallowRef(false)
  const hideVolume = shallowRef(false)
  const noFullscreen = shallowRef(false)
  const theme = shallowRef(null)
  const color = shallowRef(null)
  const elevation = shallowRef(null)
  const aspectRatio = shallowRef('16/9')

  const isHidden = toRef(() => model.value === 'hidden')

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
      'hide-play': (!isHidden.value && hidePlay.value) || undefined,
      'hide-volume': (!isHidden.value && hideVolume.value) || undefined,
      noFullscreen: (!isHidden.value && noFullscreen.value) || undefined,
      'controls-variant': controlsVariants.includes(model.value) ? model.value : undefined,
      image: 'https://cdn.jsek.work/cdn/vt-sunflowers.jpg',
      src: 'https://cdn.jsek.work/cdn/vt-sunflowers.mp4',
    }
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)} />`
  })
</script>
