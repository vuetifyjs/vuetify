<template>
  <div class="v-markup">
    <prism
      v-if="$slots.default || code"
      :language="language"
      :code="code"
    ><slot /></prism>

    <div class="v-markup__copy">
      <v-icon @click="copyMarkup">content_copy</v-icon>
      <v-slide-x-transition>
        <span
          v-if="copied"
          class="v-markup__copied"
        >Copied</span>
      </v-slide-x-transition>
    </div>

    <div
      class="v-markup__filename"
      v-text="value"
    />
  </div>
</template>

<script>
  import 'prismjs/themes/prism-tomorrow.css'
  import 'prismjs'
  import 'prismjs/components/prism-bash.js'
  import 'prismjs/components/prism-css.js'
  import 'prismjs/components/prism-javascript.js'
  import 'prismjs/components/prism-json.js'
  import 'prismjs/components/prism-stylus.js'
  import 'prismjs/components/prism-typescript.js'

  export default {
    name: 'Markup',

    components: {
      Prism: () => import('vue-prism-component')
    },

    props: {
      lang: {
        type: String,
        default: undefined
      },
      value: {
        type: String,
        default: null
      }
    },

    data: vm => ({
      code: null,
      copied: false,
      language: vm.lang
    }),

    mounted () {
      this.$nextTick(this.init)
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
      },
      init () {
        if (this.$slots.default || !this.value) return

        import(`@/snippets/${this.value}.txt`)
          .then(this.parseRaw)
          .catch(err => console.log(err))
      },
      parseRaw (res) {
        this.language = this.lang || this.value.split('_').shift()
        this.code = res.default.trim()
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

    &__filename
      position: absolute
      bottom: 0
      right: 0
      padding: 8px
      font-size: 12px
      color: rgba(#fff, .12)

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
