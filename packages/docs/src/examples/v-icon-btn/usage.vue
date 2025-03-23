<template>
  <ExamplesUsageExample
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-icon-btn v-bind="props"></v-icon-btn>
    </div>

    <template v-slot:configuration>
      <!--  -->
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const variants = ['outlined', 'tonal', 'text', 'plain']
  const name = 'v-icon-btn'
  const model = ref('default')
  const icon = ref(false)
  const options = [...variants]
  const block = ref(false)
  const stacked = ref(false)
  const prepend = ref(false)
  const append = ref(false)
  const props = computed(() => {
    return {
      icon: '$vuetify',
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
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
