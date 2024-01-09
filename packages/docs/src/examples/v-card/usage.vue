<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div>

      <v-card v-bind="props">
        <template v-slot:text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
        </template>

        <v-card-actions v-if="actions">
          <v-btn>Click me</v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="title" label="Show title"></v-checkbox>

      <v-checkbox v-model="subtitle" label="Show subtitle"></v-checkbox>

      <v-checkbox v-model="actions" label="Show actions"></v-checkbox>

      <v-checkbox v-model="loading" label="Loading"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-card'
  const model = ref('default')
  const actions = ref(false)
  const loading = ref(false)
  const subtitle = ref(false)
  const title = ref(false)
  const options = ['outlined', 'tonal']
  const props = computed(() => {
    return {
      loading: loading.value || undefined,
      title: title.value ? 'Card title' : undefined,
      subtitle: subtitle.value ? 'Subtitle' : undefined,
      text: '...',
      variant: ['outlined', 'tonal'].includes(model.value) ? model.value : undefined,
    }
  })

  const slots = computed(() => {
    let str = ''

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
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
