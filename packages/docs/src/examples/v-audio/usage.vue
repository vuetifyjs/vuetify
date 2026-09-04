<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="controlsVariants"
  >
    <div>
      <v-audio class="mx-auto" v-bind="props"></v-audio>
    </div>

    <template v-slot:configuration>
      <v-select v-model="theme" :items="['light', 'dark']" label="Theme" clearable></v-select>
      <v-select v-model="color" :items="colorOptions" label="Color" clearable></v-select>
      <v-select v-model="timeDisplay" :items="timeDisplays" label="Time display" clearable></v-select>
      <v-checkbox v-if="!isHidden" v-model="hideStop" label="Hide stop"></v-checkbox>
      <v-checkbox v-if="!isHidden" v-model="hideVolume" label="Hide volume"></v-checkbox>
      <v-checkbox v-if="!isHidden" v-model="mirror" label="Mirror waveform"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-audio'
  const controlsVariants = ['mini', 'hidden']
  const timeDisplays = ['elapsed-duration', 'elapsed', 'remaining', 'duration']

  const model = shallowRef('default')
  const hideStop = shallowRef(false)
  const hideVolume = shallowRef(false)
  const mirror = shallowRef(false)
  const theme = shallowRef(null)
  const color = shallowRef(null)
  const timeDisplay = shallowRef(null)

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
      'time-display': timeDisplay.value || undefined,
      'hide-stop': (!isHidden.value && hideStop.value) || undefined,
      'hide-volume': (!isHidden.value && hideVolume.value) || undefined,
      mirror: (!isHidden.value && mirror.value) || undefined,
      variant: controlsVariants.includes(model.value) ? model.value : undefined,
      src: 'https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3',
    }
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)} />`
  })
</script>
