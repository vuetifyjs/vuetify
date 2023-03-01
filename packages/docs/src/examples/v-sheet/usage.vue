<template>
  <usage-example
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div
      class="py-8"
      :class="[
        !border && (isDark ? 'bg-grey-darken-3' : 'bg-grey-lighten-3')
      ]"
    >
      <v-sheet
        v-if="sheet"
        v-model="sheet"
        v-bind="props"
        class="mx-auto"
      >
        <template v-slot:text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!
        </template>
      </v-sheet>

      <div class="text-center">
        <v-btn v-if="!sheet" @click="sheet = true">
          Show sheet
        </v-btn>
      </div>
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

      <v-checkbox v-model="border" label="Border"></v-checkbox>

      <v-checkbox v-model="rounded" label="Rounded"></v-checkbox>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'
  import { useUserStore } from '../../store/user'

  const name = 'v-sheet'
  const model = ref('default')
  const sheet = ref(true)
  const border = ref(false)
  const elevation = ref(0)
  const rounded = ref(false)
  const color = ref(undefined)
  const user = useUserStore()
  const options = []
  const props = computed(() => {
    return {
      elevation: elevation.value || undefined,
      border: border.value || undefined,
      rounded: rounded.value || undefined,
      height: 250,
      width: 250,
      color: color.value || undefined,
    }
  })

  const isDark = computed(() => {
    console.log(user.theme === 'dark')
    return user.theme === 'dark'
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
