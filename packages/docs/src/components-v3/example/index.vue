<template>
  <v-sheet elevation="1" rounded class="mb-9">
    <div class="d-flex justify-end pa-2 example-header">
      <v-btn icon="mdi-theme-light-dark" size="small" variant="text" @click="toggleTheme" />
      <v-btn icon="mdi-codepen" size="small" variant="text" />
      <v-btn icon="mdi-github" size="small" variant="text" />
      <v-btn icon="mdi-code-tags" size="small" variant="text" @click="showCode = !showCode" />
    </div>
    <v-expand-transition>
      <div v-if="showCode">
        <template v-for="section of sections" :key="section.name">
          <app-markup v-if="section.content" :language="section.language" :code="section.content" />
        </template>
      </div>
    </v-expand-transition>
    <v-lazy @update:modelValue="importExample">
      <v-theme-provider v-if="isLoaded" :theme="theme" with-background class="pa-4">
        <component :is="ExampleComponent" />
      </v-theme-provider>
      <div v-else class="skeleton" />
    </v-lazy>
  </v-sheet>
</template>

<script lang="ts">
  import { defineComponent, markRaw, ref } from 'vue'

  const getExample = (component: string, example: string, raw?: boolean) => {
    return import(`../../examples/${component}/${example}.vue${raw ? '?raw' : ''}`)
  }

  const parseTemplate = (target: string, template: string) => {
    const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
    const regex = new RegExp(string, 'g')
    const parsed = regex.exec(template) || []

    return parsed[1] || ''
  }

  export default defineComponent({
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
      const showCode = ref(false)
      const sections = ref<{ name: string, content: string, language: string }[]>([])

      const importExample = async () => {
        try {
          const [component, example] = props.file.split('/')
          const template = await getExample(component, example)
          ExampleComponent.value = markRaw(template.default)
          const code = await getExample(component, example, true)
          sections.value = [
            {
              name: 'template',
              language: 'html',
              content: parseTemplate('template', code.default),
            },
            {
              name: 'script',
              language: 'javascript',
              content: parseTemplate('script', code.default),
            },
            {
              name: 'style',
              language: 'css',
              content: parseTemplate('style', code.default),
            },
          ]
          isLoaded.value = true
        } catch (e) {
          console.error(e)
        }
      }

      const toggleTheme = () => theme.value = theme.value === 'light' ? 'dark' : 'light'

      return { ExampleComponent, isLoaded, importExample, theme, toggleTheme, sections, showCode }
    },
  })
</script>

<style>
  .example-header {
    border-bottom: 1px solid lightgrey;
  }

  .skeleton {
    min-height: 200px
  }
</style>
