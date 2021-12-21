<template>
  <component :is="Component" v-bind="$attrs" />
</template>

<script lang="ts">
  import { defineComponent, markRaw, onBeforeMount, ref } from 'vue'

  const getComponent = (folder: string, component: string) => {
    return import(`../../src/components/${folder}/${component}.vue`)
  }

  export default defineComponent({
    inheritAttrs: false,

    props: {
      path: {
        type: String,
        required: true,
      },
    },

    setup (props) {
      const Component = ref()

      onBeforeMount(async () => {
        const [folder, component] = props.path.split('/')
        const template = await getComponent(folder, component)
        Component.value = markRaw(template.default)
      })

      return { Component }
    },
  })
</script>
