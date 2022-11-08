<template>
  <component :is="Component" />
</template>

<script setup>
  // Utilities
  import { markRaw, onBeforeMount, ref } from 'vue'

  const getComponent = (folder, component) => {
    return import(`../../src/components/${folder}/${component}.vue`)
  }

  const props = defineProps({
    path: {
      type: String,
      required: true,
    },
  })

  const Component = ref()

  onBeforeMount(async () => {
    const [folder, component] = props.path.split('/')
    const template = await getComponent(folder, component)
    Component.value = markRaw(template.default)
  })
</script>
