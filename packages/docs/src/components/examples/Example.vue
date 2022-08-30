<template>
  <v-defaults-provider scoped>
    <v-sheet
      border
      class="mb-9"
      rounded
    >
      <v-toolbar
        border="b"
        class="px-1"
        height="44"
        flat
        rounded="t"
      >
        <v-fade-transition>
          <div v-show="showCode">
            <div class="text-body-2 px-3 text-medium-emphasis">
              <v-icon icon="mdi-file-tree" />

              {{ file }}.vue
            </div>
          </div>
        </v-fade-transition>
        <v-spacer />

        <v-tooltip
          v-for="{ path, ...action } in actions"
          :key="path"
          location="top"
        >
          <template #activator="{ props: tooltip }">
            <v-btn
              class="ml-2 text-medium-emphasis"
              density="comfortable"
              variant="text"
              v-bind="mergeProps(action as any, tooltip)"
            />
          </template>

          <span>{{ t(path) }}</span>
        </v-tooltip>

        <Codepen v-if="isLoaded" />
      </v-toolbar>

      <div class="d-flex flex-column">
        <v-expand-transition>
          <div
            v-if="showCode"
            :class="[
              'border-b',
              inline && 'order-1'
            ]"
          >
            <template
              v-for="(section, i) of sections"
              :key="section.name"
            >
              <template v-if="section.content">
                <v-divider v-if="i !== 0" />

                <v-theme-provider :theme="theme">
                  <app-markup
                    :code="section.content"
                    class="rounded-0"
                  />
                </v-theme-provider>
              </template>
            </template>
          </div>
        </v-expand-transition>

        <v-theme-provider
          :theme="theme"
          class="pa-4 rounded-b"
          with-background
        >
          <component :is="ExampleComponent" v-if="isLoaded" />
        </v-theme-provider>
      </div>
    </v-sheet>
  </v-defaults-provider>
</template>

<script setup lang="ts">
  // Components
  import ExampleMissing from './ExampleMissing.vue'

  // Composables
  import { useCodepen } from '@/composables/codepen'
  import { useI18n } from 'vue-i18n'
  import { useTheme } from 'vuetify'

  // Utilities
  import { computed, mergeProps, onMounted, ref, shallowRef } from 'vue'
  import { getBranch } from '@/util/helpers'
  import { getExample } from 'virtual:examples'

  const { t } = useI18n()

  const props = defineProps({
    inline: Boolean,
    file: {
      type: String,
      required: true,
    },
    open: Boolean,
  })

  function parseTemplate (target: string, template: string) {
    const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
    const regex = new RegExp(string, 'g')
    const parsed = regex.exec(template) || []

    return parsed[1] || ''
  }

  const isLoaded = ref(false)
  const isError = ref(false)
  const showCode = ref(props.inline || props.open)

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
    get: () => _theme.value ?? parentTheme.name.value,
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
