<template>
  <v-responsive
    class="mr-0 mr-md-6 hidden-xs-only"
    max-width="250"
  >
    <v-text-field
      id="search"
      ref="search"
      v-model="search"
      :label="label"
      color="primary"
      dense
      flat
      hide-details
      prepend-inner-icon="mdi-magnify"
      rounded
      solo-inverted
      @blur="onBlur"
      @keydown.esc="onEsc"
    />
  </v-responsive>
</template>

<script>
  export default {
    name: 'DocumentationSearch',

    data: () => ({
      label: `Search ("/" to focus)`,
      search: '',
      docSearch: {},
      isSearching: false,
    }),

    watch: {
      isSearching (val) {
        this.$refs.toolbar.isScrolling = !val
        if (val) {
          this.$nextTick(() => this.$refs.search.focus())
        } else {
          this.search = null
        }
      },
      search (val) {
        if (!val) {
          this.docSearch.autocomplete.autocomplete.close()
          this.docSearch.autocomplete.autocomplete.setVal('')
        }
      },
    },

    mounted () {
      document.onkeydown = e => {
        e = e || window.event

        if (
          e.keyCode === 191 &&
          e.target !== this.$refs.search.$refs.input
        ) {
          e.preventDefault()
          this.$refs.search.focus()
        }
      }

      import(
        /* webpackChunkName: "docsearch" */
        'docsearch.js/dist/cdn/docsearch.min.css'
      )
      import(
        /* webpackChunkName: "docsearch" */
        'docsearch.js'
      ).then(this.init)
    },

    beforeDestroy () {
      document.onkeydown = null
      this.docSearch.autocomplete.autocomplete.close()
      this.docSearch.autocomplete.autocomplete.setVal('')
    },

    methods: {
      init ({ default: docsearch }) {
        const vm = this
        this.docSearch = docsearch({
          apiKey: '259d4615e283a1bbaa3313b4eff7881c',
          autocompleteOptions: {
            appendTo: '#documentation-app-bar',
            hint: false,
            debug: process.env.NODE_ENV === 'development',
          },
          indexName: 'vuetifyjs',
          inputSelector: '#search',
          handleSelected (input, event, suggestion) {
            const url = suggestion.url
            const loc = url.split('.com')

            vm.search = ''
            vm.isSearching = false
            vm.$router.push(loc.pop())
            vm.onEsc()
          },
        })
      },
      onBlur () {
        this.$nextTick(() => (this.search = ''))
      },
      onEsc () {
        this.$refs.search.blur()
      },
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/settings/_elevations.scss'
  @import '~vuetify/src/styles/tools/_elevation.sass'

  .algolia-autocomplete
    flex: 1 1 auto
    position: fixed !important

  #search
    width: 100%

  #app
    .algolia-docsearch-suggestion--title
      margin-bottom: 0

    .algolia-autocomplete
      a
        text-decoration: none !important

      > span
        left: -36px !important
        top: 0 !important
        @include elevation(8)

        &:before,
        &:after
          display: none

        .ds-dataset-1
          border: none !important
</style>
