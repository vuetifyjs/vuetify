<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div>
      <v-banner
        v-bind="props"
        :avatar="avatar ? 'https://cdn.vuetifyjs.com/images/john-smirk.png' : undefined"
      >
        <template v-slot:text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam earum, est illo quae fugit voluptatum fuga magni hic maiores ipsa, illum, tenetur accusamus cupiditate? Dolorem ad nisi eveniet officia voluptatibus.
        </template>

        <template v-if="actions" v-slot:actions>
          <v-btn>Click me</v-btn>
        </template>
      </v-banner>
    </div>

    <template v-slot:configuration>
      <v-select
        v-model="color"
        :items="[
          'success',
          'info',
          'warning',
          'error',
        ]"
        label="Color"
        clearable
      ></v-select>

      <v-checkbox v-model="avatar" label="Avatar"></v-checkbox>

      <v-checkbox v-model="icon" label="Icon"></v-checkbox>

      <v-checkbox v-model="actions" label="Actions"></v-checkbox>

      <v-checkbox v-if="actions" v-model="stacked" label="Stacked"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-banner'
  const model = ref('default')
  const options = ['One line', 'Two lines', 'Three lines']
  const icon = ref(false)
  const avatar = ref(false)
  const actions = ref(false)
  const stacked = ref(false)
  const color = ref()

  const props = computed(() => {
    return {
      avatar: avatar.value ? 'smirk.png' : undefined,
      color: color.value ? color.value : undefined,
      icon: icon.value ? '$vuetify' : undefined,
      lines: model.value !== 'default' ? model.value.toLocaleLowerCase().split(' ')[0] : undefined,
      text: '...',
      stacked: stacked.value,
    }
  })

  const slots = computed(() => {
    return `
  <template v-slot:actions>
    <v-btn>Click me</v-btn>
  </template>
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
