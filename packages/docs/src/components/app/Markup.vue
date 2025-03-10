<template>
  <v-hover v-slot="{ props: hoverProps, isHovering }">
    <v-sheet
      v-bind="{ ...hoverProps, ...$attrs }"
      ref="root"
      :color="theme.name.value === 'light' && !user.mixedTheme ? 'surface-bright' : undefined"
      :rounded="rounded"
      :theme="theme.name.value === 'light' && user.mixedTheme ? 'dark' : theme.name.value"
      class="app-markup overflow-hidden"
      dir="ltr"
    >
      <v-toolbar
        v-if="resource"
        class="px-1"
        height="44"
      >
        <v-sheet
          v-if="resource"
          class="text-body-2 px-3 pt-3 text-medium-emphasis"
          color="transparent"
          height="44"
          rounded="tl"
        >
          <v-icon icon="mdi-file-tree" />

          {{ resource }}
        </v-sheet>
      </v-toolbar>

      <v-tooltip location="start">
        <template #activator="{ props: activatorProps }">
          <v-fade-transition>
            <v-btn
              v-if="isHovering"
              :key="icon"
              :icon="icon"
              class="text-disabled me-3 mt-1 app-markup-btn position-absolute right-0 top-0"
              density="comfortable"
              v-bind="activatorProps"
              variant="text"
              @click="copy"
            />
          </v-fade-transition>
        </template>

        <span>{{ t('copy-source') }}</span>
      </v-tooltip>

      <div class="pa-4 pe-12">
        <slot>
          <pre v-if="inline" :class="className">
        <code :class="className" v-html="highlighted" />
      </pre>

          <code v-else :class="className" v-html="highlighted" />
        </slot>
      </div>
    </v-sheet>
  </v-hover>
</template>

<script setup lang="ts">
  // Styles
  import Prism from 'prismjs'
  import 'prismjs/themes/prism.css'
  import 'prismjs/components/prism-bash.js'
  import 'prismjs/components/prism-css.js'
  import 'prismjs/components/prism-javascript.js'
  import 'prismjs/components/prism-json.js'
  import 'prismjs/components/prism-sass.js'
  import 'prismjs/components/prism-scss.js'
  import 'prismjs/components/prism-typescript.js'

  // Types
  import type { ComponentPublicInstance } from 'vue'

  const props = defineProps({
    resource: String,
    code: null,
    inline: Boolean,
    language: {
      type: String,
      default: 'markup',
    },
    rounded: {
      type: Boolean,
      default: true,
    },
  })

  // Transform inline links in typescript into actual links
  Prism.languages.insertBefore('typescript', 'string', {
    hyperlink: /<a.*?>(.*?)<\/a>/g,
  })
  Prism.hooks.add('wrap', env => {
    if (env.type === 'hyperlink' && env.tag !== 'a') {
      env.tag = 'a'
      env.content = env.content.replaceAll('&lt;', '<')
      env.attributes.href = /href="(.*?)"/.exec(env.content)?.[1] || ''
      env.attributes.target = '_blank'
      env.content = stripLinks(env.content)[0]
    }
  })

  const user = useUserStore()
  const theme = useTheme()
  const { t } = useI18n()
  const clicked = shallowRef(false)
  const root = ref<ComponentPublicInstance>()

  const highlighted = shallowRef('')
  watchEffect(async () => {
    highlighted.value = props.code && props.language && Prism.highlight(await props.code, Prism.languages[props.language], props.language)
  })

  const className = computed(() => `language-${props.language}`)
  const icon = computed(() => clicked.value ? 'mdi-check' : 'mdi-clipboard-text-outline')

  async function copy () {
    const el = root.value?.$el.querySelector('code')

    navigator.clipboard.writeText(props.code || el?.innerText || '')

    clicked.value = true

    await wait(2000)

    clicked.value = false
  }
</script>

<script lang="ts">
  export default {
    inheritAttrs: false,
  }
</script>

<style lang="sass">
  .v-sheet.app-markup
    position: relative

    code,
    pre
      background: none
      color: currentColor !important
      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace
      font-size: 1rem
      font-weight: 300
      hyphens: none
      line-height: 1.5
      margin: 0
      padding: 0
      tab-size: 4
      text-align: left
      text-shadow: none
      white-space: pre-wrap
      word-break: normal
      word-spacing: normal
      word-wrap: normal

    pre,
    code
      &::after
        bottom: .5rem
        color: hsla(0, 0%, 19%, 0.5)
        font-family: inherit
        font-size: 0.7rem
        font-weight: 700
        pointer-events: none
        position: absolute
        right: 1rem
        text-transform: uppercase

    pre.language-bash::after
      content: ' sh '

    pre.language-html::after
      content: 'html'

    pre.language-js::after
      content: ' js '

    pre.language-json::after
      content: 'json'

    pre.language-sass::after
      content: 'sass'

    code.language-scss::after
      content: 'scss'

    pre.language-ts::after
      content: ' ts '

    pre.language-vue::after
      content: 'vue'

    // TODO: handle this differently
    &.v-theme--blackguard,
    &.v-theme--dark
      --prism-interpolation: var(--prism-operator)

      code,
      pre
        color: #ccc !important

        &::selection, ::selection
          background-color: #113663

      code,
      pre
        &::after
          color: hsla(0, 0%, 50%, 1)

      &.v-sheet--outlined
        border: thin solid hsla(0,0%,100%,.12) !important

      .token.operator,
      .token.string
        background: none

      .token.comment,
      .token.block-comment,
      .token.prolog,
      .token.doctype,
      .token.cdata
        color: #999

      .token.punctuation
        color: #ccc

      .token.tag,
      .token.attr-name,
      .token.namespace,
      .token.deleted
        color: #e2777a

      .token.function-name
        color: #6196cc

      .token.boolean,
      .token.number,
      .token.function
        color: #f08d49

      .token.property,
      .token.class-name,
      .token.constant,
      .token.symbol
        color: #f8c555

      .token.selector,
      .token.important,
      .token.atrule,
      .token.keyword,
      .token.builtin
        color: #cc99cd

      .token.string,
      .token.char,
      .token.attr-value,
      .token.regex,
      .token.variable
        color: #7ec699

      .token.operator,
      .token.entity,
      .token.url
        color: #67cdcc

      .token.important,
      .token.bold
        font-weight: bold

      .token.italic
        font-style: italic

      .token.entity
        cursor: help

      .token.inserted
        color: green
</style>
