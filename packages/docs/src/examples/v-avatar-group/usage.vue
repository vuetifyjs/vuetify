<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="[]"
    :script="script"
  >
    <div class="d-flex justify-center">
      <v-avatar-group v-bind="props" :items="items"></v-avatar-group>
    </div>

    <template v-slot:configuration>
      <v-slider
        v-model="limit"
        label="Limit"
        max="5"
        min="1"
        step="1"
        thumb-label
      ></v-slider>
      <v-slider
        v-model="gap"
        label="Gap"
        max="8"
        min="-24"
        step="4"
        thumb-label
      ></v-slider>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const name = 'v-avatar-group'
  const model = ref('default')
  const limit = ref(3)
  const gap = ref(-12)

  const items = [
    { image: 'https://vuetifyjs.b-cdn.net/docs/images/one/snips/avatars/3.jpg' },
    { image: 'https://vuetifyjs.b-cdn.net/docs/images/one/snips/avatars/4.jpg' },
    { icon: 'mdi-account', color: 'info' },
    { text: 'JD', color: 'primary' },
    { icon: 'mdi-account', color: 'success' },
  ]

  const props = computed(() => {
    return {
      border: 'md surface opacity-100',
      items: 'items',
      limit: limit.value === 5 ? undefined : limit.value,
      gap: gap.value === -12 ? undefined : gap.value,
    }
  })

  // eslint doesn't like the script tag inside the template
  const script = computed(() => {
    return `<script setup>
  const items = [
    { image: 'https://vuetifyjs.b-cdn.net/docs/images/one/snips/avatars/3.jpg' },
    { image: 'https://vuetifyjs.b-cdn.net/docs/images/one/snips/avatars/4.jpg' },
    { icon: 'mdi-account', color: 'info' },
    { text: 'JD', color: 'primary' },
    { icon: 'mdi-account', color: 'success' },
  ]
<` + '/script>'
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value, ['items'])}></${name}>`
  })
</script>
