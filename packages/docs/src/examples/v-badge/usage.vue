<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div class="text-center">
      <v-badge v-bind="props">
        <v-icon
          icon="mdi-vuetify"
          size="x-large"
        ></v-icon>
      </v-badge>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="dot" label="Dot"></v-checkbox>

      <v-slider
        v-model="content"
        label="Value"
        min="0"
        max="100"
        step="1"
      ></v-slider>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-badge'
  const model = ref('default')
  const content = ref(false)
  const dot = ref(false)
  const options = ['floating', 'inline']
  const props = computed(() => {
    return {
      content: content.value || undefined,
      dot: dot.value || undefined,
      floating: model.value === 'floating' || undefined,
      inline: model.value === 'inline' || undefined,
    }
  })

  const slots = computed(() => {
    return `
  <v-icon icon="mdi-vuetify" size="x-large"></v-icon>
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
