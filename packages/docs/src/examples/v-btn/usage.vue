<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div class="text-center">
      <v-btn v-bind="props">
        <template v-if="!icon" v-slot:default>Button</template>
      </v-btn>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="icon" label="Icon"></v-checkbox>
      <v-checkbox v-model="prepend" label="Prepend icon"></v-checkbox>
      <v-checkbox v-model="append" label="Append icon"></v-checkbox>
      <v-checkbox v-model="stacked" label="Stacked"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref, watch } from 'vue'
  import { propsToString } from '@/util/helpers'

  const variants = ['outlined', 'tonal', 'text', 'plain']
  const name = 'v-btn'
  const model = ref('default')
  const icon = ref(false)
  const options = [...variants]
  const block = ref(false)
  const stacked = ref(false)
  const prepend = ref(false)
  const append = ref(false)
  const props = computed(() => {
    return {
      block: block.value || undefined,
      'prepend-icon': prepend.value ? '$vuetify' : undefined,
      'append-icon': append.value ? '$vuetify' : undefined,
      icon: icon.value ? '$vuetify' : undefined,
      stacked: stacked.value || undefined,
      variant: variants.includes(model.value) ? model.value : undefined,
    }
  })

  watch(stacked, val => {
    if (val) {
      prepend.value = true
      append.value = false
      icon.value = false
    }
  })

  watch(prepend, val => {
    if (val) {
      icon.value = false

      if (stacked.value) (append.value = false)
    }
  })

  watch(append, val => {
    if (val) {
      icon.value = false

      if (stacked.value) (prepend.value = false)
    }
  })
  watch(icon, val => val && (prepend.value = false, append.value = false, stacked.value = false))

  const slots = computed(() => {
    return `
  Button
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
