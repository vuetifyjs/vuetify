<template>
  <v-responsive
    class="mr-6"
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
      solo-inverted
      prepend-inner-icon="mdi-magnify"
      rounded
      @blur="onBlur"
    />
  </v-responsive>
</template>

<script>
  export default {
    name: 'DocumentationSearch',

    data: () => ({
      label: `Search ("s" to focus)`,
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
          e.keyCode === 83 &&
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
            appendTo: '#app',
            hint: false,
            debug: true,
          },
          indexName: 'vuetifyjs',
          inputSelector: '#search',
          handleSelected (input, event, suggestion) {
            const url = suggestion.url
            const loc = url.split('.com')
            vm.search = ''
            vm.isSearching = false
            vm.$router.push(loc.pop())
          },
        })
      },
      onBlur () {
        this.$nextTick(() => {
          this.search = ''
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
    .algolia-autocomplete > span
      left: -16px !important
      top: 18px !important
      @include elevation(6)

      .ds-dataset-1
        border: none !important
</style>
