<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div>
      <v-radio-group v-bind="props">
        <v-radio label="Radio 1" value="1"></v-radio>
        <v-radio label="Radio 2" value="2"></v-radio>
        <v-radio label="Radio 3" value="3"></v-radio>
      </v-radio-group>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="label" label="Radio group label"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-radio-group'
  const model = ref('default')
  const options = ['inline']
  const label = ref(false)
  const props = computed(() => {
    return {
      inline: model.value === 'inline' || undefined,
      label: label.value ? 'Radio group label' : undefined,
    }
  })

  const slots = computed(() => {
    return `
  <v-radio label="Radio 1" value="1"></v-radio>
  <v-radio label="Radio 2" value="2"></v-radio>
  <v-radio label="Radio 3" value="3"></v-radio>
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
