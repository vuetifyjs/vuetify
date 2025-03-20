<template>
  <v-defaults-provider
    :defaults="{
      global: { eager: false }
    }"
    scoped
  >
    <AppSheet class="mb-9">
      <v-lazy v-model="hasRendered" min-height="44">
        <v-toolbar
          border="b"
          class="px-1"
          height="44"
          flat
        >
          <v-fade-transition hide-on-leave>
            <div v-if="showCode" class="d-flex ga-1 px-1">
              <v-btn
                v-for="(section, i) of sections"
                :key="section.name"
                :active="template === i"
                class="text-none"
                size="small"
                variant="text"
                @click="template = i"
              >
                <span :class="template === i ? 'text-high-emphasis' : 'text-medium-emphasis'">
                  {{ upperFirst(section.name) }}
                </span>
              </v-btn>
            </div>

            <div
              v-else-if="user.dev && file"
              class="text-body-2 ma-1 text-medium-emphasis"
            >
              <v-icon icon="mdi-file-tree" />

              {{ file }}.vue
            </div>
          </v-fade-transition>

          <v-spacer />

          <template v-if="!preview">
            <v-tooltip
              v-for="({ path, ...action }, i) of actions"
              :key="i"
              :disabled="xs"
              location="top"
              open-delay="500"
            >
              <template #activator="{ props: tooltip }">
                <v-fade-transition hide-on-leave>
                  <v-btn
                    v-show="!action.hide"
                    :key="action.icon"
                    class="me-1 text-medium-emphasis"
                    density="comfortable"
                    size="small"
                    variant="text"
                    v-bind="mergeProps(action as any, tooltip)"
                  />
                </v-fade-transition>
              </template>

              <span>{{ t(path) }}</span>
            </v-tooltip>
          </template>
        </v-toolbar>
      </v-lazy>

      <div class="d-flex flex-column">
        <v-expand-transition v-if="hasRendered || preview">
          <v-window v-show="showCode" v-model="template">
            <v-window-item
              v-for="(section, i) of sections"
              :key="section.name"
              :eager="i === 0 || isEager"
            >
              <v-theme-provider :theme="theme">
                <AppMarkup
                  :code="section.content"
                  :rounded="false"
                />
              </v-theme-provider>
            </v-window-item>
          </v-window>
        </v-expand-transition>

        <v-theme-provider
          :class="showCode && !preview && 'border-t'"
          :theme="theme"
          class="pa-2 rounded-b"
          with-background
        >
          <component :is="ExampleComponent" v-if="isLoaded" />
        </v-theme-provider>
      </div>
    </AppSheet>
  </v-defaults-provider>
</template>

<script setup lang="ts">
  // Components
  import ExampleMissing from '@/components/examples/ExampleMissing.vue'

  // Utilities
  import { getExample } from 'virtual:examples'

  const { xs } = useDisplay()
  const { t } = useI18n()
  const user = useUserStore()

  const props = defineProps({
    inline: Boolean,
    hideInvert: Boolean,
    file: {
      type: String,
      required: true,
    },
    open: Boolean,
    preview: Boolean,
  })

  function parseTemplate (target: string, template: string) {
    const pattern = {
      composition: /(<script setup>[\w\W]*?<\/script>)/g,
      options: /(<script>[\w\W]*?<\/script>)/g,
    }[target] || new RegExp(`(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`, 'g')
    const parsed = pattern.exec(template)

    return parsed?.[1]
  }

  const isLoaded = shallowRef(false)
  const isError = shallowRef(false)
  const showCode = shallowRef(props.inline || props.open)
  const template = shallowRef(0)
  const hasRendered = shallowRef(false)
  const isEager = shallowRef(false)
  const copied = shallowRef(false)

  const component = shallowRef()
  const code = shallowRef<string>()
  const ExampleComponent = computed(() => {
    return isError.value ? ExampleMissing : isLoaded.value ? component.value : null
  })
  const sections = computed(() => {
    const _code = code.value
    if (!_code) return []
    const scriptContent = parseTemplate(user.composition, _code) ??
      parseTemplate(({ composition: 'options', options: 'composition' } as any)[user.composition], _code)

    return [
      {
        name: 'template',
        language: 'html',
        content: parseTemplate('template', _code),
      },
      {
        name: 'script',
        language: 'javascript',
        content: scriptContent,
      },
      {
        name: 'style',
        language: 'css',
        content: parseTemplate('style', _code),
      },
    ].filter(v => v.content) as { name: string, content: string, language: string }[]
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

  const playgroundLink = computed(() => {
    if (!isLoaded.value || isError.value) return null

    const resources = JSON.parse(component.value.playgroundResources || '{}')
    const setup = component.value.playgroundSetup?.trim()
    return usePlayground(
      sections.value,
      resources.css,
      resources.imports,
      setup,
    )
  })

  const actions = computed(() => [
    {
      icon: theme.value === 'dark' ? 'mdi-white-balance-sunny' : 'mdi-weather-night',
      path: 'invert-example-colors',
      onClick: toggleTheme,
    },
    {
      icon: '$vuetify-play',
      path: 'edit-in-playground',
      href: playgroundLink.value,
      target: '_blank',
      hide: xs.value,
    },
    {
      icon: 'mdi-github',
      path: 'view-in-github',
      href: `https://github.com/vuetifyjs/vuetify/tree/${getBranch()}/packages/docs/src/examples/${props.file}.vue`,
      target: '_blank',
      hide: xs.value || !user.dev,
    },
    {
      icon: copied.value ? 'mdi-check' : 'mdi-clipboard-multiple-outline',
      path: 'copy-example-source',
      onClick: async () => {
        navigator.clipboard.writeText(
          sections.value.map(section => section.content).join('\n')
        )

        copied.value = true

        await wait(2000)

        copied.value = false
      },
      hide: xs.value,
    },
    {
      icon: !showCode.value ? 'mdi-code-tags' : 'mdi-chevron-up',
      path: !showCode.value ? 'view-source' : 'hide-source',
      onClick: () => {
        showCode.value = !showCode.value
      },
    },
  ])

  watch(showCode, val => val && (isEager.value = true))

  function toggleTheme () {
    if (theme.value === parentTheme.name.value) {
      theme.value = parentTheme.current.value.dark ? 'light' : 'dark'
    } else {
      theme.value = parentTheme.name.value
    }
  }
</script>
