<!-- eslint-disable vue/attribute-hyphenation  -->
<template>
  <v-dialog
    v-model="model"
    activator="parent"
    content-class="overflow-visible align-self-start mt-16"
    max-height="900"
    width="600"
    scrollable
    @after-leave="searchString = ''"
  >
    <v-card>
      <AppTextField
        v-model="searchString"
        :placeholder="`${t('search.looking') }...`"
        class="flex-grow-0 mb-4"
        variant="filled"
        autofocus
        @focus="$event.target.select()"
        @keydown.down="list?.$el.focus()"
      >
        <template #append-inner>
          <AppBtn size="small" border>
            <span class="text-caption text-disabled">{{ t('esc') }}</span>
          </AppBtn>
        </template>
      </AppTextField>

      <v-card-text :class="['px-4 py-0 d-flex flex-wrap justify-center', searchString ? 'align-start' : 'align-center']">
        <template v-if="(searches.length || favorites.length) && !searchString">
          <AppSearchSearchGroup
            :results="searches"
            :title="t('search.recent')"
            class="mb-4"
            icon="mdi-history"
          >
            <template #actions="{ index }">
              <div class="d-flex align-center ga-1">
                <v-icon-btn icon="mdi-star-outline" icon-size="20" size="24" variant="text" @click.prevent="saveResult(index)" />
                <v-icon-btn icon="mdi-delete-outline" icon-size="20" size="24" variant="text" @click.prevent="deleteRecent(index)" />
              </div>
            </template>
          </AppSearchSearchGroup>

          <AppSearchSearchGroup
            :results="favorites"
            :title="t('search.favorite')"
            icon="mdi-history"
          >
            <template #actions="{ index }">
              <div class="d-flex align-center ga-1">
                <v-icon-btn icon="mdi-star" icon-size="20" size="24" variant="text" @click.prevent="unsaveResult(index)" />
                <v-icon-btn icon="mdi-delete-outline" icon-size="20" size="24" variant="text" @click.prevent="deleteFavorite(index)" />
              </div>
            </template>
          </AppSearchSearchGroup>
        </template>

        <template v-else-if="!searchString">
          <div class="text-center">
            <v-icon
              class="mb-6 mx-auto text-disabled"
              icon="mdi-text-box-search-outline"
              size="150"
            />

            <br>

            <v-list-subheader class="d-inline-flex">
              {{ t('search.results') }}
            </v-list-subheader>
          </div>
        </template>

        <ais-instant-search
          v-else
          :search-client="searchClient"
          class="flex-grow-1"
          index-name="vuetifyjs-v3"
          @state-change="searchFunction"
        >
          <ais-configure
            :facetFilters="[`lang:${locale}`]"
            :hitsPerPage="50"
            :query="searchString"
          />

          <ais-hits v-slot="{ items }">
            <AppSearchSearchResults
              ref="list"
              :groups="transformItems(items)"
              @click:result="selectResult"
            />
          </ais-hits>
        </ais-instant-search>
      </v-card-text>

      <v-divider class="mt-4" />

      <div class="d-flex mx-4 my-2 align-center">
        <AppLink class="text-caption" href="https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/#how-to-use">
          Advanced search
        </AppLink>
        <v-spacer />
        <AisPoweredBy class="pt-2" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  // Types
  import SearchResults from '@/components/app/drawer/SearchResults.vue'

  // Utilities
  import { AisConfigure, AisHits, AisInstantSearch, AisPoweredBy } from 'vue-instantsearch/vue3/es/src/instantsearch.js'
  import algoliasearch from 'algoliasearch'

  // Types
  import type { AlgoliaSearchHelper } from 'algoliasearch-helper'
  import type { ShallowRef } from 'vue'

  const { t } = useI18n()

  const model = defineModel<boolean>()
  const searchString = defineModel('search', { type: String, default: '' })

  const list = ref<InstanceType<typeof SearchResults>>()
  const searchClient = algoliasearch(
    'NHT6C0IV19', // docsearch app ID
    'ffa344297924c76b0f4155384aff7ef2' // vuetify API key
  )

  // Ensure to return array from local storage
  function getLocalStorage (key: string): Record<string, string>[] {
    const value = JSON.parse(localStorage.getItem(key) || '[]')
    if (!Array.isArray(value)) {
      return []
    }
    return value
  }

  const searches = shallowRef(getLocalStorage('searches'))
  const favorites = shallowRef(getLocalStorage('favorite'))

  const locale = 'en'

  watch(searches, val => {
    localStorage.setItem('searches', JSON.stringify(val))
  })

  watch(favorites, val => {
    localStorage.setItem('favorites', JSON.stringify(val))
  })

  function searchFunction (helper: AlgoliaSearchHelper) {
    if (helper.state.query) helper.search()
  }
  function transformItems (items: any[]) {
    // const sorted = sortItems([...items], ['hierarchy.lvl0', 'hierarchy.lvl1'], [false, false], locale)
    items = items.map(item => {
      const url = new URL(item.url)

      return {
        ...item,
        url: url.href.split(url.origin).pop(),
      }
    })
    const groups = groupItems(items, 'lvl0')

    groups.forEach(group => {
      group.items = groupItems(group.items, 'lvl1')
    })

    // const uiIndex = groups.findIndex(val => val.name === 'UI Components')
    // if (uiIndex > 0) {
    //   groups.unshift(groups.splice(uiIndex, 1)[0])
    // }

    return groups
  }
  function groupItems (items: any[], attribute: string) {
    const groups: any[] = []

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
  }
  function deleteItem (results: ShallowRef<any, any>, index:number) {
    const array = results.value.slice(0, 6)
    array.splice(index, 1)
    results.value = array
  }
  function deleteRecent (index: number) {
    deleteItem(searches, index)
  }
  function deleteFavorite (index: number) {
    deleteItem(favorites, index)
  }
  function selectResult (result: any) {
    // Check favorites
    const favorite = favorites.value.find(search => JSON.stringify(search) === JSON.stringify(result))

    if (favorite) {
      // Deduplication in favorites
      const filtered = favorites.value.filter(search => JSON.stringify(search) !== JSON.stringify(result))
      filtered.unshift(result)

      favorites.value = filtered.slice(0, 6)

      // No longer need to proceed in searches
      return
    }

    // Deduplication in searches
    const filtered = searches.value.filter(search => JSON.stringify(search) !== JSON.stringify(result))
    filtered.unshift(result)

    searches.value = filtered.slice(0, 6)
  }
  function moveResult (from: ShallowRef<any, any>, to: ShallowRef<any, any>, index: number) {
    const source = from.value.slice(0, 6)
    const item = source[index]
    source.splice(index, 1)

    const target = to.value.slice(0, 6)
    target.unshift(item)

    from.value = source
    to.value = target
  }
  function saveResult (index: number) {
    moveResult(searches, favorites, index)
  }
  function unsaveResult (index: number) {
    moveResult(favorites, searches, index)
  }
</script>

<style scoped>
  :deep(.v-field--variant-solo) {
    box-shadow: none;
  }
</style>
