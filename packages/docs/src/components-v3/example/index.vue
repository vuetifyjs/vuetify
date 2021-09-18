<template>
  <v-sheet elevation="1" rounded>
    <div class="d-flex justify-end pa-2">
      <v-btn icon="mdi-theme-light-dark" size="small" variant="text" />
      <v-btn icon="mdi-codepen" size="small" variant="text" />
      <v-btn icon="mdi-github" size="small" variant="text" />
      <v-btn icon="mdi-code-tags" size="small" variant="text" />
    </div>
    <v-lazy @update:modelValue="importExample">
      <div v-if="isLoaded" class="pa-4">
        <component :is="ExampleComponent" />
      </div>
    </v-lazy>
  </v-sheet>
</template>

<script lang="ts">
  import { markRaw, ref } from 'vue'

  export default {
    props: {
      file: String,
    },

    setup (props) {
      const isLoaded = ref(false)
      const ExampleComponent = ref()

      const importExample = async () => {
        const template = await import(`../../examples/${props.file}.vue`)
        ExampleComponent.value = markRaw(template.default)
        isLoaded.value = true
      }

      return { ExampleComponent, isLoaded, importExample }
    },
  }
</script>
