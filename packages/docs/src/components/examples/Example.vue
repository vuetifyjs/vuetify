<template>
  <v-sheet elevation="1" rounded class="mb-9">
    <div class="d-flex justify-end pa-2 example-header">
      <v-tooltip v-for="{ path, ...action } in actions" :key="path" anchor="top">
        <template #activator="{ props: tooltip }">
          <v-btn size="small" variant="text" v-bind="mergeProps(action, tooltip)" />
        </template>
        <span>{{ t(path) }}</span>
      </v-tooltip>
      <Codepen v-if="isLoaded" />
    </div>
    <v-expand-transition>
      <div v-if="showCode">
        <template v-for="section of sections" :key="section.name">
          <app-markup v-if="section.content" :code="section.content" />
        </template>
      </div>
    </v-expand-transition>
    <v-theme-provider v-if="isLoaded" :theme="theme" with-background class="pa-4">
      <component :is="ExampleComponent" />
    </v-theme-provider>
  </v-sheet>
</template>

<script setup lang="ts">
  import { computed, mergeProps, onMounted, ref, shallowRef } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useTheme } from 'vuetify'
  import { getBranch } from '@/util/helpers'

  import { getExample } from 'virtual:examples'
  import ExampleMissing from './ExampleMissing.vue'
  import { useCodepen } from '@/composables/codepen'

  const { t } = useI18n()

  const props = defineProps({
    file: {
      type: String,
      required: true,
    },
  })

  function parseTemplate (target: string, template: string) {
    const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
    const regex = new RegExp(string, 'g')
    const parsed = regex.exec(template) || []

    return parsed[1] || ''
  }

  const isLoaded = ref(false)
  const isError = ref(false)
  const showCode = ref(false)

  const component = shallowRef()
  const code = ref<string>()
  const sections = ref<{ name: string, content: string, language: string }[]>([])
  const ExampleComponent = computed(() => {
    return isError.value ? ExampleMissing : isLoaded.value ? component.value : null
  })

  onMounted(importExample)

  async function importExample () {
    try {
      const {
        component: _component,
        source: _code,
      } = await getExample(props.file)
      component.value = _component
      code.value = _code
      sections.value = [
        {
          name: 'template',
          language: 'html',
          content: parseTemplate('template', _code),
        },
        {
          name: 'script',
          language: 'javascript',
          content: parseTemplate('script', _code),
        },
        {
          name: 'style',
          language: 'css',
          content: parseTemplate('style', _code),
        },
      ]
      isLoaded.value = true
      isError.value = false
    } catch (e) {
      console.error(e)
      isLoaded.value = true
      isError.value = true
    }
  }
  const parentTheme = useTheme()
  const _theme = ref<null | string>(null)
  const theme = computed({
    get: () => _theme.value ?? parentTheme.current.value,
    set: val => _theme.value = val,
  })
  const toggleTheme = () => theme.value = theme.value === 'light' ? 'dark' : 'light'

  const { Codepen, openCodepen } = useCodepen({ code, sections, component })

  const actions = computed(() => [
    {
      icon: 'mdi-theme-light-dark',
      path: 'invert-example-colors',
      onClick: toggleTheme,
    },
    {
      icon: 'mdi-codepen',
      path: 'edit-in-codepen',
      onClick: openCodepen,
    },
    {
      icon: 'mdi-github',
      path: 'view-in-github',
      href: `https://github.com/vuetifyjs/vuetify/tree/${getBranch()}/packages/docs/src/examples/${props.file}.vue`,
      target: '_blank',
    },
    {
      icon: 'mdi-code-tags',
      path: 'view-source',
      onClick: () => (showCode.value = !showCode.value),
    },
  ])
</script>

<style>
.example-header {
  border-bottom: 1px solid lightgrey;
}
</style>
