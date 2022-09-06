<template>
  <usage-example
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-alert
        v-if="alert"
        v-model="alert"
        v-bind="props"
      >
        <template v-slot:text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
        </template>
      </v-alert>

      <div class="text-center">
        <v-btn v-if="!alert" @click="alert = true">
          Show Alert
        </v-btn>
      </div>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="type"
        :items="[
          'success',
          'info',
          'warning',
          'error',
        ]"
        label="Type"
        clearable
      ></v-select>

      <v-checkbox v-model="title" label="Show title"></v-checkbox>

      <v-checkbox v-model="closable" label="Closable"></v-checkbox>

      <v-checkbox v-model="icon" label="Custom icon"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-alert'
  const model = ref('default')
  const alert = ref(true)
  const closable = ref(false)
  const icon = ref(false)
  const title = ref(false)
  const type = ref(undefined)
  const options = ['outlined', 'tonal']
  const props = computed(() => {
    return {
      closable: closable.value || undefined,
      icon: icon.value ? 'mdi-vuetify' : undefined,
      title: title.value ? 'Alert title' : undefined,
      text: '...',
      type: type.value,
      variant: ['outlined', 'tonal'].includes(model.value) ? model.value : undefined,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
