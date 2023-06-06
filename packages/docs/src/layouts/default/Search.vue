<template>
  <!-- eslint-disable vue/attribute-hyphenation  -->
  <v-menu
    v-model="menuModel"
    max-height="75vh"
    offset-y
    readonly
    @input="resetSearch"
  >
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
        :search-client="searchClient"
        :search-function="searchFunction"
        index-name="vuetifyjs-v2"
      >
        <ais-configure
          :facetFilters="[`lang:${locale}`]"
          :hitsPerPage="50"
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
  import algoliasearch from 'algoliasearch'
  import SearchResults from './SearchResults'

  // Globals
  import { IN_BROWSER } from '@/util/globals'

  // This behavior should be easier to do with solo fields
  // TODO: Review this for v3
  export default {
    name: 'DefaultSearch',

    components: { SearchResults },

    inject: ['theme'],

    data: () => ({
      isFocused: false,
      menuModel: false,
      searchClient: algoliasearch(
        'NHT6C0IV19', // docsearch app ID
        'ffa344297924c76b0f4155384aff7ef2' // vuetify API key
      ),
      searchString: '',
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
      if (this.search) {
        this.$nextTick(() => {
          this.searchString = this.search
          this.$refs.searchInput.focus()
        })
      }

      document.addEventListener('keydown', this.onDocumentKeydown)
    },

    beforeDestroy () {
      if (!IN_BROWSER) return

      document.removeEventListener('keydown', this.onDocumentKeydown)
    },

    methods: {
      async onFocus () {
        clearTimeout(this.timeout)

        this.isFocused = true
      },
      searchFunction (helper) {
        helper.state.query && helper.search()
      },
      transformItems (items) {
        items = items.map(item => {
          const url = new URL(item.url)

          return {
            ...item,
            url: url.href.split(url.origin).pop(),
          }
        })
        const groups = this.groupItems(items, 'lvl0')

        groups.forEach(group => {
          group.items = this.groupItems(group.items, 'lvl1')
        })

        // const uiIndex = groups.findIndex(val => val.name === 'UI Components')
        // if (uiIndex > 0) {
        //   groups.unshift(groups.splice(uiIndex, 1)[0])
        // }

        return groups
      },
      groupItems (items, attribute) {
        const groups = []

        items.forEach(item => {
          const group = groups.find(val => val.name === item.hierarchy[attribute])

          if (group) {
            group.items.push(item)
          } else {
            groups.push({
              name: item.hierarchy[attribute],
              items: [item],
            })
          }
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
      display: flex
      flex-direction: column
      overflow: hidden

  .ais-InstantSearch
    flex: 1
    min-height: 0
    overflow-y: auto

  .ais-PoweredBy
    display: flex
    justify-content: flex-end
    padding: 8px 8px 0
</style>
