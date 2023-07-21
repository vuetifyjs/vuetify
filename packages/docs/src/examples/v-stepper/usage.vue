<template>
  <usage-example
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-stepper v-bind="props" v-model="step" :items="undefined">
      <v-stepper-header>
        <v-stepper-item title="Step 1"></v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item title="Step 2"></v-stepper-item>
      </v-stepper-header>

      <v-stepper-window v-model="step">
        <v-stepper-window-item class="pa-4 text-center">
          Step 1
        </v-stepper-window-item>

        <v-stepper-window-item class="pa-4 text-center">
          Step 2
        </v-stepper-window-item>
      </v-stepper-window>
    </v-stepper>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-stepper'
  const model = ref('default')
  const options = []
  const step = ref(1)

  const props = computed(() => {
    return {
      // editable: true,
      items: [
        'Ad unit details',
        'Ad sizes',
        'Ad templates',
      ],
      'show-actions': true,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<v-stepper${propsToString(props.value)}>${slots.value}</v-stepper>`
  })
</script>
