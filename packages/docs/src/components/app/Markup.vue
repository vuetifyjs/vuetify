<template>
  <v-sheet
    ref="root"
    :theme="isDark ? 'dark' : 'light'"
    class="app-markup overflow-hidden pa-2"
    dir="ltr"
    rounded
    v-bind="$attrs"
  >
    <v-sheet
      :color="isDark ? '#1F1F1F' : 'grey-lighten-4'"
      class="border"
      outlined
      rounded
    >
      <v-toolbar
        border="b"
        class="px-1"
        color="transparent"
        flat
        height="44"
      >
        <v-spacer />

        <v-tooltip anchor="bottom">
          <template #activator="{ props }">
            <v-btn
              :icon="clicked ? 'mdi-check' : 'mdi-clipboard-text'"
              class="mr-1 text-disabled"
              density="comfortable"
              v-bind="props"
              @click="copy"
            />
          </template>

          <span>{{ t('copy-example-source') }}</span>
        </v-tooltip>
      </v-toolbar>

      <div class="pa-4">
        <slot>
          <pre v-if="inline" :class="className">
            <code :class="className" v-html="highlighted" />
          </pre>

          <code v-else :class="className" v-html="highlighted" />
        </slot>
      </div>
    </v-sheet>
  </v-sheet>
</template>

<script lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'
  import { useTheme } from 'vuetify'
  import { useUserStore } from '@/store/user'

  // Utilities
  import { ComponentPublicInstance, computed, defineComponent, ref } from 'vue'
  import { IN_BROWSER } from '@/util/globals'
  import { wait } from '@/util/helpers'

  // Imports
  import Prism from 'prismjs'
  import 'prismjs/themes/prism.css'
  import 'prismjs/components/prism-bash.js'
  import 'prismjs/components/prism-css.js'
  import 'prismjs/components/prism-javascript.js'
  import 'prismjs/components/prism-json.js'
  import 'prismjs/components/prism-sass.js'
  import 'prismjs/components/prism-scss.js'
  import 'prismjs/components/prism-typescript.js'

  export default defineComponent({
    name: 'Markup',

    inheritAttrs: false,

    props: {
      code: String,
      inline: Boolean,
      language: {
        type: String,
        default: 'markup',
      },
    },

    setup (props) {
      const user = useUserStore()
      const theme = useTheme()
      const clicked = ref(false)
      const root = ref<ComponentPublicInstance>()
      const type = ref('js')
      const { t } = useI18n()

      const highlighted = computed(() => (
        props.code && props.language && Prism.highlight(props.code, Prism.languages[props.language], props.language)
      ))
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
        return user.mixedTheme || theme.getTheme(theme.current.value).dark
      })

      return {
        root,
        isDark,
        highlighted,
        className,
        clicked,
        copy,
        type,
        t,
      }
    },
  })
</script>

<style lang="sass">
  .v-sheet.app-markup
    // margin: 16px 0
    position: relative

    &:not(:hover) .v-btn--copy .v-icon
      opacity: .4

    pre, code
      background: transparent
      font-size: 1rem
      font-weight: 300
      margin: 0 !important

    > pre
      border-radius: inherit

    code,
    pre
      background: none
      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace
      font-size: 1rem
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
        bottom: 1rem
        color: hsla(0, 0%, 19%, 0.5)
        font-family: inherit
        font-size: 0.7rem
        font-weight: 700
        position: absolute
        right: 14px
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
