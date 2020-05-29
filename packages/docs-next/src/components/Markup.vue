<template>
  <v-card
    :id="id"
    :color="$vuetify.theme.dark ? undefined : 'grey darken-4'"
    class="v-markup"
    outlined
  >
    <prism
      :language="language"
      :inline="inline"
    >
      <slot />
    </prism>

    <div
      v-if="!noCopy"
      class="v-markup__copy"
    >
      <v-icon
        title="Copy code"
        aria-label="Copy code"
        @click="copyMarkup"
      >
        $mdiContentCopy
      </v-icon>

      <v-slide-x-transition>
        <span
          v-if="copied"
          class="v-markup__copied"
        >Copied</span>
      </v-slide-x-transition>
    </div>
  </v-card>
</template>

<script>
  // Prism
  import 'prismjs'
  import 'prismjs/components/prism-bash.js'
  import 'prismjs/components/prism-css.js'
  import 'prismjs/components/prism-javascript.js'
  import 'prismjs/components/prism-json.js'
  import 'prismjs/components/prism-sass.js'
  import 'prismjs/components/prism-scss.js'
  import 'prismjs/components/prism-stylus.js'
  import 'prismjs/components/prism-typescript.js'

  // Utilities
  import { copyElementContent } from '@/util/helpers'

  export default {
    name: 'Markup',

    components: {
      Prism: () => import('vue-prism-component'),
    },

    props: {
      lang: {
        type: String,
        default: undefined,
      },
      inline: Boolean,
      noCopy: Boolean,
      value: {
        type: String,
        default: 'markup',
      },
    },

    data: vm => ({
      code: null,
      copied: false,
      language: vm.lang,
    }),

    computed: {
      id () {
        if (this.value === 'markup') return
        return 'markup-' + this.value.replace(/_/g, '-')
      },
    },

    methods: {
      copyMarkup () {
        copyElementContent(this.$el.querySelector('pre'))

        this.copied = true
        setTimeout(() => { this.copied = false }, 2000)
      },
    },
  }
</script>

<style lang="sass">
  .v-application .v-markup
    align-items: center
    box-shadow: none
    display: flex
    border-radius: 4px
    position: relative
    overflow: hidden
    margin-bottom: 16px
    background: #2d2d2d
    color: #fff

    &.theme--dark
      background: #1F1F1F

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
      right: 75px

    &__copy
      position: absolute
      top: 0
      cursor: pointer
      width: 25px
      height: 25px
      z-index: 1

    &__copy
      right: 0

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
      .v-markup__copy
        .v-icon
          opacity: 1

        &:after
          opacity: 0

    .v-markup__copy
      .v-icon
        color: inherit
        position: absolute
        right: 0
        transition: opacity .2s ease-in
        font-size: 1.5rem
        opacity:0
        top: 0
        width: 50px
        height: 50px
        z-index: 4

    // prism.js tomorrow night eighties for JavaScript, CoffeeScript, CSS and HTML
    // Based on https://github.com/chriskempson/tomorrow-theme
    // @author Rose Pritchard

    code[class*="language-"],
    pre[class*="language-"]
      color: #ccc
      background: none
      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace
      font-size: 1rem
      text-align: left
      white-space: pre
      word-spacing: normal
      word-break: normal
      word-wrap: normal
      line-height: 1.5
      tab-size: 4
      hyphens: none

    pre[class*="language-"]
      padding: 1rem
      margin: 0
      overflow: auto

    :not(pre) > code[class*="language-"]
      padding: .1rem
      border-radius: .3rem
      white-space: normal

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
