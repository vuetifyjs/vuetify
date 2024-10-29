<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
    :script="script"
  >
    <v-responsive
      ref="responsive"
      class="overflow-y-auto"
      max-height="300"
    >
      <div class="pa-6 text-center position-sticky">
        Scroll down
      </div>

      <v-responsive min-height="50vh"></v-responsive>

      <div class="text-center text-body-2 mb-12">
        The card will appear below:
      </div>

      <v-lazy
        v-model="isActive"
        :options="{
          threshold: .5
        }"
        min-height="200"
        transition="fade-transition"
      >
        <v-card
          class="mx-auto"
          max-width="336"
        >
          <v-card-title>Card title</v-card-title>

          <v-card-text>
            Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Aliquam lobortis. Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna.

            In turpis. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. In turpis. Pellentesque dapibus hendrerit tortor. Ut varius tincidunt libero.
          </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn @click="reset">Reset Demo</v-btn>
          </v-card-actions>
        </v-card>
      </v-lazy>
      <br>
    </v-responsive>
  </ExamplesUsageExample>
</template>

<script setup>
  const goTo = useGoTo()

  const name = 'v-lazy'
  const model = shallowRef('default')
  const isActive = shallowRef(false)
  const responsive = ref()
  const options = []

  async function reset () {
    await goTo(0, { container: responsive.value.$el })

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

  const responsiveProps = computed(() => {
    return {
      ref: 'responsive',
      class: 'overflow-y-auto',
      'max-height': 300,
    }
  })

  const slots = computed(() => {
    return `
  <v-card
    class="mx-auto"
    max-width="336"
    text="Phasellus magna. Quisque rutrum. Nunc egestas, augue at pellentesque laoreet."
    title="Card title"
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
  const responsive = ref()

  async function reset () {
    await goTo(0, { container: responsive.value.$el })

    isActive.value = false
  }
<` + '/script>'
  })

  const code = computed(() => {
    return `<v-responsive${propsToString(responsiveProps.value)}>
  <div class="pa-6 text-center position-sticky">Scroll down</div>

  <v-responsive min-height="100vh"></v-responsive>
  
  <div class="text-center text-body-2 mb-12">
    The card will appear below:
  </div>

  <${name}${propsToString(props.value)}>${slots.value}</${name}>
</v-responsive>`
  })
</script>
