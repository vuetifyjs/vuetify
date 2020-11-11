<template>
  <v-text-field
    id="doc-search"
    ref="search"
    v-model="model"
    :background-color="(!theme.isDark && !isFocused) ? 'grey lighten-3' : undefined"
    :class="isSearching ? 'rounded-b-0' : ' rounded-lg'"
    :flat="!isFocused && !isSearching"
    :placeholder="placeholder"
    autocomplete="off"
    class="mx-2 mx-md-4"
    dense
    hide-details
    solo
    style="max-width: 450px;"
    @blur="onBlur"
    @clear="resetSearch"
    @focus="onFocus"
    @keydown.esc="onEsc"
  >
    <template #prepend-inner>
      <v-icon
        :color="!isFocused ? 'grey' : undefined"
        class="ml-1 mr-2"
      >
        $mdiMagnify
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  // Globals
  import { IN_BROWSER, IS_PROD } from '@/util/globals'

  // This behavior should be easier to do with solo fields
  // TODO: Review this for v3
  export default {
    name: 'DefaultSearch',

    inject: ['theme'],

    data: () => ({
      docsearch: {},
      hasBooted: false,
      isFocused: false,
      model: '',
      timeout: null,
    }),

    computed: {
      search: get('route/query@search'),
      isSearching () {
        return this.model && this.model.length > 0
      },
      placeholder () {
        if (this.isFocused) return ''

        let placeholder = this.$t('search.placeholder')

        if (!this.$vuetify.breakpoint.mobile) {
          placeholder += ' ' + this.$t('search.key-hint')
        }

        return placeholder
      },
    },

    watch: {
      isSearching (val) {
        val
          ? this.$refs.search.focus()
          : this.resetSearch()
      },
    },

    mounted () {
      if (!IN_BROWSER) return

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

      // Focus and search if available
      if (this.search) this.$refs.search.focus()
    },

    beforeDestroy () {
      if (IN_BROWSER) return

      document.onkeydown = null

      this.resetSearch()
    },

    methods: {
      async init (docsearch) {
        const vm = this

        this.docsearch = docsearch({
          apiKey: '259d4615e283a1bbaa3313b4eff7881c',
          autocompleteOptions: {
            appendTo: '#app-bar',
            autoselect: true,
            clearOnSelected: true,
            debug: !IS_PROD,
            hint: false,
          },
          handleSelected (input, event, suggestion) {
            vm.$router.push(suggestion.url.split('.com').pop())
            vm.resetSearch(400)
          },
          indexName: 'vuetifyjs',
          inputSelector: '#doc-search',
        })

        if (!this.search) return

        this.model = this.search

        this.$refs.search.focus()

        await this.$nextTick()

        // Dispatch an event to trigger agolia search menu
        const event = new Event('input')

        this.$refs.search.$refs.input.dispatchEvent(event)
      },
      onBlur () {
        this.resetSearch()
      },
      onEsc () {
        this.$refs.search.blur()
      },
      async onFocus () {
        clearTimeout(this.timeout)

        if (!this.hasBooted) {
          Promise.all([
            import(
              /* webpackChunkName: "docsearch" */
              'docsearch.js/dist/cdn/docsearch.min.js'
            ),
            import(
              /* webpackChunkName: "docsearch" */
              'docsearch.js/dist/cdn/docsearch.min.css'
            ),
          ]).then(([promise]) => this.init(promise.default))

          this.hasBooted = true
        }

        this.isFocused = true
      },
      resetSearch (timeout = 0) {
        clearTimeout(this.timeout)

        this.$nextTick(() => {
          this.model = undefined
          this.timeout = setTimeout(() => (this.isFocused = false), timeout)

          if (!this.docsearch) return

          this.docsearch.autocomplete.autocomplete.close()
          this.docsearch.autocomplete.autocomplete.setVal('')
        })
      },
    },
  }
</script>

<style lang="sass">
  #app
    .algolia-docsearch-suggestion--title
      margin-bottom: 0

    .algolia-autocomplete

      .ds-dropdown-menu
        clip-path: inset(0px -12px -12px -12px) !important
        box-shadow: 0px 1px 4px 0px rgba(32, 33, 36, 0.28) !important
        border-radius: 0 0 8px 8px
        left: -52px !important
        top: 0px !important
        min-width: calc(100% + 64px)
        max-width: calc(100%)

        [class^=ds-dataset-]
          border-radius: 0 0 8px 8px
          border-color: transparent

        &:before
          display: none

      a
        text-decoration: none !important

    &.theme--dark
      color: white

      [class^=ds-dataset-],
      .algolia-docsearch-suggestion
        background: #1E1E1E !important

        .algolia-docsearch-suggestion--highlight
          color: #2196f3

        .algolia-docsearch-suggestion--title
          color: #FFFFFF

        .algolia-docsearch-suggestion--category-header
          color: #a4a7ae
</style>
