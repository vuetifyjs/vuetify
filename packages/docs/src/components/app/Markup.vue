<template>
  <v-theme-provider :theme="isDark ? 'dark' : 'light'">
    <v-sheet
      ref="root"
      class="app-markup overflow-hidden"
      :color="isDark ? '#1F1F1F' : 'grey-lighten-5'"
      rounded
      outlined
      dir="ltr"
      v-bind="$attrs"
    >
      <slot>
        <pre v-if="inline" :class="className">
          <code :class="className" v-html="highlighted" />
        </pre>
        <code v-else :class="className" v-html="highlighted" />
      </slot>

      <v-btn
        size="small"
        class="v-btn--copy"
        icon
        variant="text"
        @click="copy"
      >
        <v-fade-transition hide-on-leave>
          <v-icon
            :key="String(clicked)"
            color="grey"
            :icon="clicked ? '$complete' : 'mdi-content-copy'"
          />
        </v-fade-transition>
      </v-btn>
    </v-sheet>
  </v-theme-provider>
</template>

<script lang="ts">
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

  import { ComponentPublicInstance, computed, defineComponent, ref } from 'vue'
  import { useTheme } from 'vuetify'
  import { wait } from '@/util/helpers'
  import { IN_BROWSER } from '@/util/globals'
  import { useUserStore } from '@/store/user'

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

      const highlighted = computed(() => (
        props.code && props.language && Prism.highlight(props.code, Prism.languages[props.language], props.language)
      ))
      const className = computed(() => `langauge-${props.language}`)

      async function copy () {
        if (!IN_BROWSER || !root.value) return

        const el = root.value.$el.querySelector('pre')

        if (!el) return

        el.setAttribute('contenteditable', 'true')
        el.focus()

        document.execCommand('selectAll', false, undefined)
        document.execCommand('copy')

        el.removeAttribute('contenteditable')

        clicked.value = true

        await wait(500)

        clicked.value = false
        window.getSelection()?.removeAllRanges()
      }

      const isDark = computed(() => {
        return user.mixedTheme || theme.getTheme(theme.current.value).dark
      })

      return { root, isDark, highlighted, className, clicked, copy }
    },
  })
</script>

<style lang="sass">
  .v-sheet.app-markup
    // margin: 16px 0
    position: relative
    padding: 12px 50px 12px 16px

    &:not(:hover) .v-btn--copy .v-icon
      opacity: .4

    .v-btn--copy
      position: absolute
      top: 4px
      right: 4px

    pre, code
      background: transparent
      font-size: 1rem
      font-weight: 300
      margin: 0 !important
      min-height: 48px

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
        bottom: 0.75rem
        color: hsla(0, 0%, 19%, 0.5)
        font-family: inherit
        font-size: 0.7rem
        font-weight: 700
        position: absolute
        right: 1rem
        text-transform: uppercase

    pre.language-bash::after
      content: 'sh'

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
