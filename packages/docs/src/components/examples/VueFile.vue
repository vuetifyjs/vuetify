<template>
  <component
    :is="component"
    v-if="component"
  />
</template>

<script setup>
  // Utilities
  import { getExample } from 'virtual:examples'
  import { onBeforeMount, shallowRef } from 'vue'

  const props = defineProps({
    file: {
      type: String,
      required: true,
    },
  })

  const component = shallowRef()

  onBeforeMount(load)

  async function load () {
    try {
      const { component: example } = await getExample(props.file)
      component.value = example
    } catch (e) {
      console.error(e)
    }
  }
</script>
