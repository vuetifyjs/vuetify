<template>
  <v-sheet
    :color="isDark ? '#1F1F1F' : 'grey lighten-5'"
    :dark="isDark"
    :rounded="rounded"
    class="app-code overflow-hidden"
    dir="ltr"
    outlined
  >
    <slot />

    <app-copy-btn
      :target="target"
      class="mr-n2 mt-n2"
    />
  </v-sheet>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'AppCode',

    props: {
      rounded: {
        type: [Boolean, String],
        default: true,
      },
    },

    computed: {
      ...get('user', [
        'theme@dark',
        'theme@mixed',
      ]),
      isDark () {
        return this.dark || this.mixed
      },
    },

    methods: {
      target () {
        return this.$el.querySelector('pre')
      },
    },
  }
</script>

<style lang="sass">
  .v-sheet.app-code
    margin: 16px 0
    position: relative
    padding: 12px 50px 12px 16px

    &:not(:hover) .v-btn--copy .v-icon
      opacity: .4

    pre, code
      background: transparent
      font-size: 1rem
      font-weight: 300
      margin: 0 !important

    > pre
      border-radius: inherit

    code[class*=language],
    pre[class*=language]
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
      white-space: pre
      word-break: normal
      word-spacing: normal
      word-wrap: normal

    pre[class*=language]
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

    &.theme--dark
      code[class*=language],
      pre[class*=language]
        color: #ccc !important

      pre[class*=language]
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
