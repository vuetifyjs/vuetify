<template>
  <div class="v-markup">
    <prism :language="language">
      <slot />
    </prism>

    <div class="v-markup__copy">
      <v-icon @click="copyMarkup">content_copy</v-icon>
      <v-slide-x-transition>
        <span
          v-if="copied"
          class="v-markup__copied"
        >Copied</span>
      </v-slide-x-transition>
    </div>
  </div>
</template>

<script>
  import 'prismjs'
  import 'prismjs/components/prism-bash.js'
  import 'prismjs/components/prism-css.js'
  import 'prismjs/components/prism-javascript.js'
  import 'prismjs/components/prism-json.js'
  import 'prismjs/components/prism-stylus.js'
  import 'prismjs/components/prism-typescript.js'

  // Utilities
  const AVAILABLE_LANGUAGES = [
    'bash',
    'css',
    'javascript',
    'json',
    'markup',
    'stylus',
    'ts'
  ]

  const LANGUAGE_MAP = {
    cli: 'bash',
    html: 'markup',
    js: 'javascript',
    styl: 'stylus',
    typescript: 'ts',
    vue: 'markup'
  }

  export default {
    name: 'Markup',

    components: {
      Prism: () => import('vue-prism-component')
    },

    props: {
      lang: {
        type: String,
        default: ''
      }
    },

    data: () => ({
      copied: false
    }),

    computed: {
      language () {
        const lang = LANGUAGE_MAP[this.lang] || this.lang

        if (lang && !AVAILABLE_LANGUAGES.includes(lang)) {
          console.log(lang + ' is unavailable')

          return undefined
        }

        return lang
      }
    },

    methods: {
      copyMarkup () {
        const markup = this.$el.querySelector('pre')
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
  .v-markup
    align-items: center
    box-shadow: none
    display: flex
    border-radius: 2px
    position: relative
    overflow-x: auto
    overflow-y: hidden
    margin-bottom: 16px
    background: #2d2d2d
    color: #fff

    pre, code
      margin: 0
      background: transparent
      font-family: 'Inconsolata', monospace
      font-weight: 300
      font-size: 15px
      line-height: 1.55

    code
      position: relative
      box-shadow: none
      overflow-x: auto
      overflow-y: hidden
      word-break: break-word
      flex-wrap: wrap
      align-items: center
      vertical-align: middle
      white-space: pre-wrap

      &:before
        display: none

    &__copied
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
      color: inherit
      position: absolute
      right: 0
      transition: opacity .2s ease-in
      font-size: 1.5rem
      opacity: 0
      top: 0
      width: 50px
      height: 50px
      z-index: 4

    &:hover
      .v-icon
        opacity: 1
</style>
