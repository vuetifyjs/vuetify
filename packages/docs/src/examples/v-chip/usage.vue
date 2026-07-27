<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-chip v-bind="props" v-model="chipModel">
        Chip
      </v-chip>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="prepend" label="Prepend icon"></v-checkbox>
      <v-checkbox v-model="append" label="Append icon"></v-checkbox>
      <v-checkbox v-model="closable" label="Closable">
        <template v-slot:append>
          <v-fade-transition>
            <v-btn v-if="!chipModel" variant="plain" @click="chipModel = true">Reset</v-btn>
          </v-fade-transition>
        </template>
      </v-checkbox>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
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
      closable: closable.value || undefined,
      stacked: stacked.value || undefined,
      'prepend-icon': prepend.value ? '$vuetify' : undefined,
      'append-icon': append.value ? '$vuetify' : undefined,
      variant: variants.includes(model.value) ? model.value : undefined,
    }
  })

  const chipModel = ref(true)

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
