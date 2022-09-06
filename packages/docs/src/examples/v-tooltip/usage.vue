<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div class="text-center">
      <v-tooltip v-bind="props">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps">Hover Over Me</v-btn>
        </template>

        {{ text }}
      </v-tooltip>
    </div>

    <template v-slot:configuration>
      <v-text-field v-model="text" label="Text"></v-text-field>

      <v-checkbox v-model="active" label="Always show"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-tooltip'
  const model = ref('default')
  const text = ref('Tooltip')
  const active = ref()
  const options = []
  const props = computed(() => {
    const props = {
      text: text.value || undefined,
    }

    if (active.value) {
      props['model-value'] = true
    }

    return props
  })

  const slots = computed(() => {
    return `
  <template v-slot:activator="{ props }">
    <v-btn v-bind="props">Tooltip</v-btn>
  </template>
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
