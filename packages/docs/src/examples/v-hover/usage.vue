<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div>
      <v-hover v-bind="props">
        <template v-slot:default="{ isHovering, props: hoverProps }">
          <v-card
            v-bind="hoverProps"
            :color="isHovering ? 'primary' : undefined"
            title="Hover over me"
            text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
          ></v-card>
        </template>
      </v-hover>
    </div>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-hover'
  const model = ref('default')
  const options = []
  const props = computed(() => {
    return {}
  })

  const slots = computed(() => {
    return `
  <template v-slot:default="{ isHovering, props }">
    <v-card
      v-bind="props"
      :color="isHovering ? 'primary' : undefined"
      title="Hover over me"
      text="..."
    ></v-card>
  </template>
`
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
