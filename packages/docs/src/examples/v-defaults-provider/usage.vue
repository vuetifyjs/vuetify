<template>
  <usage-example
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div class="text-center">
      <v-defaults-provider
        :defaults="{
          VBtn: !button ? {} : {
            color: 'primary',
            size: 'large',
            variant: 'tonal',
          },
        }"
      >
        <v-btn>Button</v-btn>
      </v-defaults-provider>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="button" label="Use v-btn defaults"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-defaults-provider'
  const model = ref('default')
  const button = ref(false)
  const options = []
  const props = computed(() => {
    return {
      defaults: button.value ? {
        VBtn: {
          color: 'primary',
          size: 'large',
          variant: 'tonal',
        },
      } : undefined,
    }
  })

  const slots = computed(() => {
    return `
  <v-btn>Button</v-btn>
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
