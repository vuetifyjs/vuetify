<template>
  <v-sheet elevation="1" rounded class="mb-9">
    <div class="d-flex justify-end pa-2 example-header">
      <v-btn icon="mdi-theme-light-dark" size="small" variant="text" @click="toggleTheme" />
      <v-btn icon="mdi-codepen" size="small" variant="text" />
      <v-btn icon="mdi-github" size="small" variant="text" />
      <v-btn icon="mdi-code-tags" size="small" variant="text" />
    </div>
    <v-lazy @update:modelValue="importExample">
      <v-theme-provider v-if="isLoaded" :theme="theme" with-background class="pa-4">
        <component :is="ExampleComponent" />
      </v-theme-provider>
      <div v-else class="skeleton" />
    </v-lazy>
  </v-sheet>
</template>

<script lang="ts">
  import { markRaw, ref } from 'vue'

  const getExample = (component: string, example: string) => {
    return import(`../../examples/${component}/${example}.vue`)
  }

  export default {
    props: {
      file: {
        type: String,
        required: true,
      },
    },

    setup (props) {
      const theme = ref('light')
      const isLoaded = ref(false)
      const ExampleComponent = ref()

      const importExample = async () => {
        try {
          console.log('importing', props.file)
          const [component, example] = props.file.split('/')
          const template = await getExample(component, example)
          ExampleComponent.value = markRaw(template.default)
          isLoaded.value = true
        } catch (e) {
          console.error(e)
        }
      }

      const toggleTheme = () => theme.value = theme.value === 'light' ? 'dark' : 'light'

      return { ExampleComponent, isLoaded, importExample, theme, toggleTheme }
    },
  }
</script>

<style>
  .example-header {
    border-bottom: 1px solid lightgrey;
  }

  .skeleton {
    min-height: 200px
  }
</style>
