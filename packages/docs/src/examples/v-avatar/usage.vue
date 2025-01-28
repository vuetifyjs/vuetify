<template>
  <ExamplesUsageExample
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
        label="Size"
        max="80"
        min="40"
        step="1"
      ></v-slider>
    </template>
  </ExamplesUsageExample>
</template>

<script setup>
  const model = ref('default')
  const icon = ref(false)
  const image = ref(false)
  const size = ref(40)
  const options = ['tile']
  const props = computed(() => {
    return {
      color: !image.value && !icon.value ? 'surface-variant' : undefined,
      icon: icon.value ? '$vuetify' : undefined,
      image: image.value ? 'smirk.png' : undefined,
      rounded: model.value === 'tile' ? '0' : undefined,
      size: size.value === 40 ? undefined : `${size.value}`,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<v-avatar${propsToString(props.value)}>${slots.value}</v-avatar>`
  })
</script>
