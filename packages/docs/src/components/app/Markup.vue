<template>
  <v-sheet
    ref="root"
    :theme="isDark ? 'dark' : 'light'"
    :color="isDark ? '#1F1F1F' : 'grey-lighten-4'"
    :rounded="rounded"
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

    <v-tooltip location="bottom">
      <template #activator="{ props: activatorProps }">
        <v-btn
          :icon="clicked ? 'mdi-check' : 'mdi-clipboard-text'"
          class="me-1 text-disabled me-2 mt-2 app-markup-btn"
          density="compact"
          style="position: absolute; right: 0; top: 0;"
          v-bind="activatorProps"
          variant="text"
          @click="copy"
        />
      </template>

      <span>{{ t('copy-example-source') }}</span>
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

  // Composables
  import { useI18n } from 'vue-i18n'
  import { useTheme } from 'vuetify'
  import { useUserStore } from '@/store/user'

  // Utilities
  import { ComponentPublicInstance, computed, ref, watchEffect } from 'vue'
  import { IN_BROWSER } from '@/util/globals'
  import { wait } from '@/util/helpers'
  import { stripLinks } from '@/components/api/utils'

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
  const clicked = ref(false)
  const root = ref<ComponentPublicInstance>()

  const highlighted = ref('')
  watchEffect(async () => {
    highlighted.value = props.code && props.language && Prism.highlight(await props.code, Prism.languages[props.language], props.language)
  })

  const className = computed(() => `langauge-${props.language}`)

  async function copy () {
    if (!IN_BROWSER || !root.value) return

    const el = root.value.$el.querySelector('code')

    if (!el) return

    el.setAttribute('contenteditable', 'true')
    el.focus()

    document.execCommand('selectAll', false, undefined)
    document.execCommand('copy')

    el.removeAttribute('contenteditable')

    clicked.value = true

    await wait(500)

    window.getSelection()?.removeAllRanges()

    clicked.value = false
  }

  const isDark = computed(() => {
    return user.mixedTheme || theme.current.value.dark
  })

</script>

<style lang="sass">
  .v-sheet.app-markup
    // margin: 16px 0
    position: relative

    &:not(:hover)
      .app-markup-btn
        opacity: 0 !important

    &:not(:hover) .v-btn--copy .v-icon
      opacity: .4

    > pre
      border-radius: inherit

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

    pre
      &::after
        bottom: .5rem
        color: hsla(0, 0%, 19%, 0.5)
        font-family: inherit
        font-size: 0.7rem
        font-weight: 700
        pointer-events: none
        position: absolute
        right: .5rem
        text-transform: uppercase

    pre.language-bash::after
      content: ' sh '

    pre.language-html::after
      content: 'html'

    pre.language-js::after
      content: 'js'

    pre.language-json::after
      content: 'json'

    pre.language-sass::after
      content: 'sass'

    pre.language-scss::after
      content: 'scss'

    pre.language-ts::after
      content: 'ts'

    pre.language-vue::after
      content: 'vue'

    &.v-theme--dark
      code,
      pre
        color: #ccc !important

        &::selection, ::selection
          background-color: #113663

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
