<template>
  <div
    :id="id"
    class="v-markup"
  >
    <!-- eslint-disable -->
    <prism
      v-if="$slots.default || code"
      :language="language"
      :code="code"
    ><slot /></prism>
    <!-- eslint-enable -->

    <div
      v-if="filename"
      class="v-markup__edit"
    >
      <a
        :href="`https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetifyjs.com/src/snippets/${file}`"
        target="_blank"
        rel="noopener"
        title="Edit code"
      >
        <v-icon>mdi-pencil</v-icon>
      </a>
    </div>

    <div class="v-markup__copy">
      <v-icon
        title="Copy code"
        @click="copyMarkup"
      >
        content_copy
      </v-icon>
      <v-slide-x-transition>
        <span
          v-if="copied"
          class="v-markup__copied"
        >
          Copied
        </span>
      </v-slide-x-transition>
    </div>

    <a
      v-if="filename"
      :href="href"
      target="_blank"
      rel="noopener"
      class="v-markup__filename"
    >
      <span v-text="file" />
    </a>
  </div>
</template>

<script>
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
        default: 'markup'
      },
      filename: {
        type: Boolean,
        default: process.env.NODE_ENV !== 'production'
      }
    },

    data: vm => ({
      code: null,
      copied: false,
      language: vm.lang
    }),

    computed: {
      file () {
        const split = this.value.split('_')
        const folder = split.shift()
        const file = split.join('_')

        return `${folder}/${file}.txt`
      },
      href () {
        const branch = process.env.NODE_ENV === 'production' ? 'master' : 'dev'
        const href = `https://github.com/vuetifyjs/vuetify/tree/${branch}/packages/vuetifyjs.com/src/snippets`

        return `${href}/${this.file}`
      },
      id () {
        if (this.value === 'markup') return
        return 'markup-' + this.value.replace(/_/g, '-')
      }
    },

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

        import(`@/snippets/${this.file}`)
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
      right: 100px

    &__copy,
    &__edit
      position: absolute
      top: 0px
      cursor: pointer
      width: 25px
      height: 25px
      z-index: 1

    &__copy
      right: 0

    &__edit
      right: 36px

      > a
        color: inherit
        text-decoration: none

    &__filename
      text-decoration: none
      position: absolute
      bottom: 0
      right: 0
      padding: 8px 12px 8px 8px
      font-size: 12px
      color: rgba(#fff, .56)

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
      .v-markup__copy,
      .v-markup__edit
        .v-icon
          opacity: 1

        &:after
          opacity: 0

    .v-markup__copy,
    .v-markup__edit
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
</style>
