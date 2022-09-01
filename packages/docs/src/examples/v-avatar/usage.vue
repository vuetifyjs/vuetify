<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    name="v-avatar"
  >
    <div class="text-center">
      <v-avatar
        v-bind="props"
        :image="image ? 'https://cdn.vuetifyjs.com/images/john-smirk.png' : undefined"
      ></v-avatar>
    </div>

    <template v-slot:configuration>
      <v-checkbox v-model="icon" label="Icon"></v-checkbox>

      <v-checkbox v-model="image" label="Image"></v-checkbox>

      <v-slider
        v-model="size"
        min="40"
        max="80"
        step="1"
        label="Size"
      ></v-slider>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const model = ref('default')
  const icon = ref(false)
  const image = ref(false)
  const size = ref()
  const options = ['tile']
  const props = computed(() => {
    return {
      rounded: model.value === 'tile' ? 0 : undefined,
      color: 'surface-variant',
      icon: icon.value ? 'mdi-vuetify' : undefined,
      image: image.value ? 'smirk.png' : undefined,
      size: size.value === 40 ? undefined : size.value,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<v-avatar${propsToString(props.value)}>${slots.value}</v-avatar>`
  })
</script>
