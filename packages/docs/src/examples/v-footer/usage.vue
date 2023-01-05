<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div>
      <v-footer v-bind="props">
        {{ new Date().getFullYear() }} — <strong>Vuetify, LLC</strong>
      </v-footer>
    </div>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-footer'
  const model = ref('default')
  const options = ['bordered']
  const props = computed(() => {
    return {
      border: model.value === 'bordered' || undefined,
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
