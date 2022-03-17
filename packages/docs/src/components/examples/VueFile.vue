<template>
  <component
    :is="component"
    v-if="component"
  />
</template>

<script>
  // Utilities
  import { getExample } from 'virtual:examples'
  import { shallowRef } from 'vue'

  export default {
    name: 'VueFile',

    props: {
      file: {
        type: String,
        required: true,
      },
    },

    data: () => ({ component: shallowRef() }),

    created () {
      this.load()
    },

    methods: {
      async load () {
        try {
          const { component } = await getExample(this.file)
          this.component = component
        } catch (e) {
          console.error(e)
        }
      },
    },
  }
</script>
