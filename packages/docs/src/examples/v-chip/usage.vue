<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div class="text-center">
      <v-chip v-bind="props">
        Chip
      </v-chip>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="prepend" label="Prepend icon"></v-checkbox>
      <v-checkbox v-model="append" label="Append icon"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref, watch } from 'vue'
  import { propsToString } from '@/util/helpers'

  const variants = ['outlined', 'elevated', 'text', 'plain']
  const name = 'v-chip'
  const model = ref('default')
  const options = [...variants]
  const block = ref(false)
  const stacked = ref(false)
  const prepend = ref(false)
  const append = ref(false)
  const closable = ref(false)
  const props = computed(() => {
    return {
      block: block.value || undefined,
      stacked: stacked.value || undefined,
      'prepend-icon': prepend.value ? 'mdi-vuetify' : undefined,
      'append-icon': append.value ? 'mdi-vuetify' : undefined,
      variant: variants.includes(model.value) ? model.value : undefined,
    }
  })

  watch(stacked, val => val && (prepend.value = true))

  const slots = computed(() => {
    return `
  Chip
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
