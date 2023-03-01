<template>
  <usage-example
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-img
        v-bind="props"
        :aspect-ratio="aspectRatio.value"
        class="mx-auto"
      ></v-img>
    </div>

    <template v-slot:configuration>

      <v-select
        v-model="aspectRatio"
        :items="aspectRatios"
        label="Aspect ratio"
        return-object
      ></v-select>

      <v-slider
        v-model="width"
        label="Width"
        min="200"
        max="500"
      ></v-slider>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-img'
  const model = ref('default')
  const width = ref(300)
  const aspectRatio = ref({ title: '16/9', value: 16 / 9 })
  const aspectRatios = [
    { title: '16/9', value: 16 / 9 },
    { title: '4/3', value: 4 / 3 },
    { title: '1/1', value: 1 },
  ]
  const options = []

  const props = computed(() => {
    return {
      width: width.value,
      'aspect-ratio': aspectRatio.value.title,
      cover: true,
      src: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<v-img${propsToString(props.value)}>${slots.value}</v-img>`
  })
</script>
