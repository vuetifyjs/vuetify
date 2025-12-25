<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <v-sheet
      ref="sheetRef"
      :max-height="300"
      class="overflow-y-auto ma-4"
      elevation="5"
    >
      <div class="pa-6 text-center position-sticky">
        Scroll down
      </div>

      <v-responsive min-height="50vh"></v-responsive>

      <div class="text-center text-body-medium mb-12">
        The card will appear below:
      </div>

      <v-lazy
        v-model="isActive"
        :options="{ threshold: .5 }"
        min-height="200"
        transition="fade-transition"
      >
        <v-card
          class="mx-auto"
          color="primary"
          max-width="336"
          text="This card was rendered later"
          title="Lazy card"
        >
          <v-card-actions class="justify-center">
            <v-btn @click="reset">Reset Demo</v-btn>
          </v-card-actions>
        </v-card>
      </v-lazy>
    </v-sheet>
  </ExamplesUsageExample>
</template>

<script setup>
  const goTo = useGoTo()

  const name = 'v-lazy'
  const model = shallowRef('default')
  const isActive = shallowRef(false)
  const sheetRef = ref()
  const options = []

  async function reset () {
    await goTo(0, { container: sheetRef.value.$el })

    isActive.value = false
  }

  const props = computed(() => {
    return {
      'v-model': 'isActive',
      'min-height': 200,
      options: { threshold: 0.5 },
      transition: 'fade-transition',
    }
  })

  const slots = computed(() => {
    return `
  <v-card
    class="mx-auto"
    color="primary"
    max-width="336"
    text="This card was rendered later"
    title="Lazy card"
  >
    <v-card-actions class="justify-center">
      <v-btn @click="reset">Reset Demo</v-btn>
    </v-card-actions>
  </v-card>
`
  })

  const script = computed(() => {
    return `<script setup>
  import { ref, shallowRef } from 'vue'
  import { useGoTo } from 'vuetify'

  const goTo = useGoTo()

  const isActive = shallowRef(false)
  const sheetRef = ref()

  async function reset () {
    await goTo(0, { container: sheetRef.value.$el })

    isActive.value = false
  }
<` + '/script>'
  })

  const code = computed(() => {
    return `<v-sheet
  ref="sheetRef"
  class="overflow-y-auto ma-4"
  :max-height="300"
  elevation="5"
>
  <div class="pa-6 text-center position-sticky">Scroll down</div>
  <v-responsive min-height="100vh"></v-responsive>

  <div class="text-center text-body-medium mb-12">
    The card will appear below:
  </div>

  <${name}${propsToString(props.value)}>${slots.value}</${name}>
</v-sheet>`
  })
</script>
