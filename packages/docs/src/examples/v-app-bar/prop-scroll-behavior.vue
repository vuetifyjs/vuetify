<template>
  <AppSheet class="mb-6">
    <ExamplesUsageExample
      v-model="model"
      :code="code"
      :name="name"
      :options="options"
    >
      <v-layout class="overflow-visible" style="height: 300px">
        <v-main id="scroll-behavior-layout" class="pt-0" scrollable>
          <v-app-bar
            v-bind="props"
            color="secondary"
            scroll-target="#scroll-behavior-layout > .v-main__scroller"
            style="position: sticky"
          >
            <template v-slot:prepend>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </template>

            <v-app-bar-title>Application Bar</v-app-bar-title>

            <template v-if="actions" v-slot:append>
              <v-btn icon="mdi-heart"></v-btn>

              <v-btn icon="mdi-magnify"></v-btn>

              <v-btn icon="mdi-dots-vertical"></v-btn>
            </template>
          </v-app-bar>

          <div style="height: 1000px"></div>
        </v-main>
      </v-layout>

      <template v-slot:configuration>
        <v-checkbox v-for="option in behaviors" :key="option.value" v-model="selectedBehaviors" :label="option.title" :value="option.value"></v-checkbox>
        <v-divider></v-divider>
        <v-checkbox v-model="selectedBehaviors" label="Inverted" value="inverted"></v-checkbox>
        <v-slider v-model="scrollThreshold" label="Threshold" max="1000" min="0" step="1"></v-slider>
      </template>
    </ExamplesUsageExample>
  </AppSheet>
</template>

<script setup>
  const name = 'v-app-bar'
  const model = ref('default')
  const options = []

  const actions = ref(false)
  const scrollThreshold = ref(300)
  const selectedBehaviors = ref([])
  const behaviors = [
    { value: 'hide', title: 'Hide' },
    { value: 'collapse', title: 'Collapse' },
    { value: 'elevate', title: 'Elevate' },
    { value: 'fade-image', title: 'Fade image' },
  ]

  const props = computed(() => {
    return {
      'scroll-behavior': selectedBehaviors.value.join(' ') || undefined,
      'scroll-threshold': scrollThreshold.value === 300 ? undefined : String(scrollThreshold.value),
      image: selectedBehaviors.value.includes('fade-image') ? 'https://picsum.photos/1920/1080?random' : undefined,
    }
  })

  const slots = computed(() => {
    let str = ''

    if (actions.value) {
      str += `
  <template v-slot:append>
    <v-btn icon="mdi-heart"></v-btn>

    <v-btn icon="mdi-magnify"></v-btn>

    <v-btn icon="mdi-dots-vertical"></v-btn>
  </template>
`
    }

    return str
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
