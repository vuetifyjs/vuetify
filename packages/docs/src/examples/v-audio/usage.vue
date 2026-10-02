<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="layouts"
  >
    <div>
      <v-audio class="mx-auto" max-width="480" v-bind="props"></v-audio>
    </div>

    <template v-slot:configuration>
      <v-select v-model="theme" :items="['light', 'dark']" label="Theme" clearable></v-select>
      <v-select v-model="color" :items="colorOptions" label="Color" clearable></v-select>
      <v-select v-model="timeDisplay" :items="timeDisplays" label="Time display" clearable></v-select>
      <v-checkbox v-model="volume" label="Volume"></v-checkbox>
      <v-checkbox v-model="readonly" label="Readonly"></v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-audio'
  const layouts = ['inline']
  const timeDisplays = ['elapsed-duration', 'elapsed', 'remaining', 'duration']

  const model = shallowRef('default')
  const volume = shallowRef(false)
  const readonly = shallowRef(false)
  const theme = shallowRef(null)
  const color = shallowRef(null)
  const timeDisplay = shallowRef(null)

  const colorOptions = [
    'primary',
    'green',
    'cyan',
    'lime-accent-4',
  ]

  const track = {
    artist: 'Bransboynd',
    src: 'https://cdn.pixabay.com/audio/2025/09/29/audio_8bde82c5c0.mp3',
    title: 'Mysterious Future Trap',
  }

  const props = computed(() => {
    const inline = model.value !== 'default'
    const actions = [inline ? 'play progress time' : 'play', volume.value && '- volume']
      .filter(Boolean)
      .join(' ')

    return {
      theme: theme.value || undefined,
      color: color.value || undefined,
      'time-display': timeDisplay.value || undefined,
      actions: actions === 'play' ? undefined : actions,
      readonly: readonly.value || undefined,
      src: track.src,
    }
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)} />`
  })
</script>
