<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="layouts"
  >
    <div>
      <v-audio ref="audio" v-model:playing="playing" class="mx-auto" max-width="480" v-bind="props"></v-audio>

      <div class="position-absolute bottom-0 left-0 pa-2" style="min-height: 24px">
        <v-slide-y-reverse-transition>
          <v-chip
            v-show="credits"
            :href="track.origin"
            append-icon="mdi-chevron-right"
            size="x-small"
            target="_blank"
            text="Track source: Pixabay"
            variant="tonal"
          ></v-chip>
        </v-slide-y-reverse-transition>
      </div>
    </div>

    <template v-slot:configuration>
      <v-select v-model="progressVariant" :items="progressVariantOptions" label="Progress variant"></v-select>
      <v-select v-model="color" :items="colorOptions" label="Color" clearable></v-select>
      <v-checkbox v-model="volume" label="Volume"></v-checkbox>
      <v-checkbox v-model="hideThumb" label="Hide thumb"></v-checkbox>
      <v-slider
        v-model="progressHeight"
        label="Track height"
        max="12"
        min="2"
        show-ticks="always"
        step="2"
        hide-details
      ></v-slider>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-audio'
  const layouts = ['inline']

  const model = shallowRef('default')
  const volume = shallowRef(false)
  const hideThumb = shallowRef(false)
  const color = shallowRef(null)
  const progressVariant = shallowRef('default')
  const audio = useTemplateRef('audio')
  const playing = shallowRef(false)
  const credits = shallowRef(false)

  watch(playing, () => credits.value = true, { once: true })

  watch(progressVariant, value => {
    if (value !== 'wavy' || playing.value || audio.value?.audio.currentTime >= 10) return

    audio.value?.seek({ to: 60 })
  })

  const progressHeight = shallowRef(4)
  const defaultHeight = toRef(() => model.value === 'inline' ? 6 : 4)

  watch(defaultHeight, value => progressHeight.value = value)

  const progressVariantOptions = ['default', 'pill', 'wavy']

  const colorOptions = [
    'primary',
    'green',
    'cyan',
    'lime-accent-4',
  ]

  const track = {
    artist: 'Bransboynd',
    origin: 'https://pixabay.com/music/ambient-cinematic-documentary-background-599280/',
    src: 'https://cdn.vuetifyjs.com/docs/images/components/v-audio/06.mp3',
    title: 'Cinematic Documentary Background',
  }

  const props = computed(() => {
    const actions = [
      model.value === 'inline' ? 'play progress time' : 'play',
      volume.value ? model.value === 'inline' ? 'volume' : '- volume' : '',
    ]
      .join(' ')
      .trim()

    return {
      color: color.value || undefined,
      'progress-variant': progressVariant.value === 'default' ? undefined : progressVariant.value,
      'progress-props': progressHeight.value === defaultHeight.value ? undefined : { height: progressHeight.value },
      actions: actions === 'play' ? undefined : actions,
      'hide-thumb': hideThumb.value || undefined,
      src: track.src,
    }
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)} />`
  })
</script>
