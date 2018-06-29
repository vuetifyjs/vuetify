<template>
  <div
    :class="['markup', color]"
    :data-lang="lang"
    class="mb-3"
  >
    <pre><code ref="markup" class="hljs" v-html="code" /></pre>

    <div class="markup__copy">
      <v-icon @click="copyMarkup">content_copy</v-icon>
      <v-slide-x-transition>
        <span
          v-if="copied"
          class="component-example-copied"
        >Copied</span>
      </v-slide-x-transition>
    </div>
  </div>
</template>

<script>
  // Libs
  import hljs from 'highlight.js/lib/highlight.js'
  import hljsJson from 'highlight.js/lib/languages/json'
  import hljsJS from 'highlight.js/lib/languages/javascript'
  import hljsScss from 'highlight.js/lib/languages/scss'
  import hljsStylus from 'highlight.js/lib/languages/stylus'
  import hljsXML from 'highlight.js/lib/languages/xml'
  import hljsTS from 'highlight.js/lib/languages/typescript'

  hljs.registerLanguage('bash', hljsJS)
  hljs.registerLanguage('js', hljsJS)
  hljs.registerLanguage('json', hljsJson)
  hljs.registerLanguage('html', hljsXML)
  hljs.registerLanguage('stylus', hljsStylus)
  hljs.registerLanguage('scss', hljsScss)
  hljs.registerLanguage('vue', hljsXML)
  hljs.registerLanguage('ts', hljsTS)

  // Utilities
  const LANG_MAP = {
    'cli': 'bash',
    'css': 'scss',
    'html': 'html',
    'javascript': 'js',
    'styl': 'stylus'
  }

  export default {
    name: 'Markup',

    props: {
      color: {
        type: String,
        default: 'grey lighten-3'
      },
      lang: {
        type: String,
        default: ''
      }
    },

    data: () => ({
      code: null,
      copied: false,
      highlightAttempts: 0
    }),

    computed: {
      language () {
        return LANG_MAP[this.lang] || this.lang
      }
    },

    mounted () {
      const cb = deadline => {
        if (deadline.timeRemaining() < 33.3 &&
          this.highlightAttempts < 3 &&
          !deadline.didTimeout
        ) {
          ++this.highlightAttempts
          requestIdleCallback(cb, { timeout: 250 })
        } else {
          this.init()
        }
      }

      'requestIdleCallback' in window
        ? window.requestIdleCallback(cb, { timeout: 500 })
        : this.init()
    },

    updated () {
      this.init()
    },

    methods: {
      init () {
        const lang = this.language
        const text = this.$slots.default[0].text
        const { value: code } = lang
          ? hljs.highlight(lang, text)
          : hljs.highlightAuto(text)

        this.code = code
      },
      copyMarkup () {
        const markup = this.$refs.markup
        markup.setAttribute('contenteditable', 'true')
        markup.focus()
        document.execCommand('selectAll', false, null)
        this.copied = document.execCommand('copy')
        markup.removeAttribute('contenteditable')
        setTimeout(() => { this.copied = false }, 2000)
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../../node_modules/vuetify/src/stylus/settings/_colors.styl'

  .markup
    font-size: 1.3rem
    font-family: 'Inconsolata', monospace
    transition: .3s ease-out
    box-shadow: none
    display: flex
    padding: 24px
    border-radius: 2px
    position: relative
    align-items: center

    .component-example-copied
      position: absolute
      top: 12px
      right: 50px

    &__copy
      position: absolute
      right: 0px
      top: 0px
      cursor: pointer
      width: 25px
      height: 25px
      z-index: 1

    &:after
      position: absolute
      right: 10px
      transition: opacity .2s ease-in
      content: attr(data-lang)
      color: rgba(#000, 0.3)
      font-size: 1rem
      font-weight: 700
      top: 5px

    &:hover
      &:after
        opacity: 0

    .v-icon
      position: absolute
      right: 0
      transition: opacity .2s ease-in
      font-size: 1.5rem
      opacity: 0
      top: 0
      cursor: pointer
      width: 50px
      height: 50px
      z-index: 4

    &:hover
      .v-icon
        opacity: 1

    pre, code
      background: transparent
      font-family: 'Inconsolata', monospace
      line-height: 1.5
      width: 100%

    code
      position: relative
      box-shadow: none
      overflow-x: auto
      overflow-y: hidden
      word-break: break-word
      flex-wrap: wrap
      align-items: center
      vertical-align: middle

      > div
        width: 100%

      &:before,
      &:after
        display: none

    .hljs
      color: #1867C0
      font-weight: 300

      .hljs-keyword,
      .hljs-attr
        color: #333
        font-weight: 700

      .hljs-tag, .hljs-variable
        color: $purple.lighten-1

      .hljs-string, .hljs-literal, .hljs-number
        color: $red.lighten-1
        font-weight: 400

      .hljs-comment
        color: $grey.base
        font-weight: 300

  .v-tabs
    .markup
      max-width: 100%
</style>
