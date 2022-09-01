<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    name="v-card"
  >
    <v-card
      v-bind="props"
      :text="lorem"
      class="mx-auto"
      max-width="448"
    >
      <template
        v-if="actions"
        v-slot:actions
      >
        <v-btn>Click me</v-btn>
      </template>
    </v-card>

    <template v-slot:configuration>
      <v-text-field
        v-model="title"
        label="Title"
        clearable
      ></v-text-field>

      <v-checkbox
        v-model="subtitle"
        label="Subtitle"
      ></v-checkbox>

      <v-checkbox
        v-model="disabled"
        label="Disabled"
      ></v-checkbox>

      <v-checkbox
        v-model="loading"
        label="Loading"
      ></v-checkbox>

      <v-checkbox
        v-model="actions"
        label="Actions"
      ></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const model = ref('default')
  const actions = ref(false)
  const disabled = ref(false)
  const loading = ref(false)
  const subtitle = ref(false)
  const title = ref('Label')

  const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!'
  const options = ['outlined', 'flat', 'tonal', 'plain']

  const props = computed(() => {
    const props = {}

    if (disabled.value) props.disabled = true
    if (loading.value) props.loading = true
    if (title.value) props.title = title.value
    if (subtitle.value) props.subtitle = 'Subtitle'

    props.text = '...'

    if (options.includes(model.value)) props.variant = model.value

    return props
  })

  const slots = computed(() => {
    let str = ``

    if (actions.value) {
      str += `
  <v-card-actions>
    <v-btn>Click me</v-btn>
  </v-card-actions>
`
    }

    return str
  })

  const code = computed(() => {
    return `<v-card${propsToString(props.value)}>${slots.value}</v-card>`
  })
</script>
