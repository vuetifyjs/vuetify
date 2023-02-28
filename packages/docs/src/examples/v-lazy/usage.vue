<template>
  <usage-example
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
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
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-lazy'
  const model = ref('default')
  const isActive = ref(false)
  const responsive = ref()
  const options = []

  function reset () {
    responsive.value.$el.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

    setTimeout(() => {
      isActive.value = false
    }, 300)
  }

  const props = computed(() => {
    return {
      'min-height': 200,
      options: { threshold: 0.5 },
      transition: 'fade-transition',
    }
  })

  const slots = computed(() => {
    return `
  <div class="text-center text-body-2 mb-12">
    The card will appear below:
  </div>

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

  const code = computed(() => {
    return `<v-lazy${propsToString(props.value)}>${slots.value}</v-lazy>`
  })
</script>
