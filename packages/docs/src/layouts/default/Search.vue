<template>
  <!-- eslint-disable vue/attribute-hyphenation  -->
  <v-menu v-model="menuModel" offset-y readonly max-height="75vh" @input="resetSearch">
    <template #activator="{ attrs }">
      <v-text-field
        ref="searchInput"
        v-model="searchString"
        v-bind="attrs"
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
        @focus="onFocus"
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
    <v-card>
      <ais-instant-search
        index-name="vuetifyjs"
        :search-client="searchClient"
        :search-function="searchFunction"
      >
        <ais-configure
          :facetFilters="[`language:${locale}`]"
          :query="searchString"
        />
        <ais-hits v-slot="{ items }">
          <search-results :groups="transformItems(items)" />
        </ais-hits>
      </ais-instant-search>
      <ais-powered-by />
    </v-card>
  </v-menu>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'
  import { groupItems, sortItems } from 'vuetify/lib/util/helpers'
  import SearchResults from './SearchResults'
  import algoliasearch from 'algoliasearch'

  // Globals
  import { IN_BROWSER } from '@/util/globals'

  // This behavior should be easier to do with solo fields
  // TODO: Review this for v3
  export default {
    name: 'DefaultSearch',

    components: {
      SearchResults,
    },

    inject: ['theme'],

    data: () => ({
      searchString: '',
      menuModel: false,
      searchClient: algoliasearch(
        'BH4D9OD16A', // docsearch app ID
        '259d4615e283a1bbaa3313b4eff7881c' // vuetify API key
      ),
      isFocused: false,
    }),

    computed: {
      locale: get('route/params@locale'),
      search: get('route/query@search'),
      isSearching () {
        return this.searchString && this.searchString.length > 0
      },
      placeholder () {
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
          ? this.menuModel = true
          : this.resetSearch()
      },
    },

    mounted () {
      if (!IN_BROWSER) return

      document.addEventListener('keydown', this.onDocumentKeydown)
    },

    beforeDestroy () {
      if (IN_BROWSER) return

      document.removeEventListener('keydown', this.onDocumentKeydown)
    },

    methods: {
      async onFocus () {
        clearTimeout(this.timeout)
        this.isFocused = true
      },
      init (algoliasearch) {
        this.searchClient = algoliasearch(
          'BH4D9OD16A', // docsearch app ID
          '259d4615e283a1bbaa3313b4eff7881c' // vuetify API key
        )
      },
      searchFunction (helper) {
        helper.state.query && helper.search()
      },
      transformItems (items) {
        const sorted = sortItems([...items], ['hierarchy.lvl0', 'hierarchy.lvl1'], [false, false], this.locale)
          .map(item => {
            const url = new URL(item.url)
            return {
              ...item,
              url: url.href.split(url.origin).pop(),
            }
          })
        const groups = groupItems(sorted, ['hierarchy.lvl0'])
        groups.forEach(group => {
          group.items = groupItems(group.items, ['hierarchy.lvl1'])
        })
        return groups
      },
      resetSearch () {
        clearTimeout(this.timeout)

        this.$nextTick(() => {
          this.searchString = ''
          this.timeout = setTimeout(() => this.isFocused = false)
          this.menuModel = false
        })
      },
      onDocumentKeydown (e) {
        if (
          e.key === '/' &&
          e.target !== this.$refs.searchInput.$refs.input
        ) {
          e.preventDefault()

          this.$refs.searchInput.focus()
        }
      },
    },
  }
</script>

<style lang="sass" scoped>
  .v-menu__content
    width: 0

    &, & > *
      overflow: hidden
      display: flex
      flex-direction: column

  .ais-InstantSearch
    min-height: 0
    flex: 1
    overflow-y: auto

  .ais-PoweredBy
    display: flex
    justify-content: flex-end
    padding: 8px 8px 0
</style>
