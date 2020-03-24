<template>
  <v-responsive
    class="mr-0 mr-md-6 hidden-xs-only transition-swing"
    :max-width="isFocused ? 300 : 250"
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
      @focus="onFocus"
      @keydown.esc="onEsc"
    />
  </v-responsive>
</template>

<script>
  export default {
    name: 'DocumentationSearch',

    data: () => ({
      docSearch: {},
      isFocused: false,
      isSearching: false,
      label: 'Search ("/" to focus)',
      search: '',
      timeout: null,
    }),

    watch: {
      isSearching (val) {
        if (val) {
          this.$refs.search.focus()

          return
        }

        this.resetSearch()
      },
      search (val) {
        if (val) return

        this.docSearch.autocomplete.autocomplete.close()
        this.docSearch.autocomplete.autocomplete.setVal('')
      },
    },

    mounted () {
      document.onkeydown = e => {
        e = e || window.event

        if (
          e.key === '/' &&
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
            autoselect: true,
            clearOnSelected: true,
            hint: false,
            debug: process.env.NODE_ENV === 'development',
          },
          handleSelected (input, event, suggestion) {
            vm.$router.push(suggestion.url.split('.com').pop())
            vm.resetSearch(400)
          },
          indexName: 'vuetifyjs',
          inputSelector: '#search',
        })
      },
      onBlur () {
        this.resetSearch()
      },
      onEsc () {
        this.$refs.search.blur()
      },
      onFocus () {
        clearTimeout(this.timeout)

        this.isFocused = true
      },
      resetSearch (timeout = 0) {
        clearTimeout(this.timeout)

        this.$nextTick(() => {
          this.search = undefined
          this.isSearching = false

          this.timeout = setTimeout(() => (this.isFocused = false), timeout)
        })
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
