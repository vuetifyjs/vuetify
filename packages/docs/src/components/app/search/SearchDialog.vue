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
        <AppSearchSearchRecent
          v-if="searches.length && !searchString"
          :searches="searches"
          @click:delete="onClickDelete"
        />

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
              @click:result="onClickResult"
            />
          </ais-hits>
        </ais-instant-search>
      </v-card-text>

      <v-divider class="my-4" />

      <AisPoweredBy class="ms-auto me-4 mb-2" />
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

  const { t } = useI18n()

  const model = defineModel<boolean>()
  const searchString = defineModel('search', { type: String, default: '' })

  const list = ref<InstanceType<typeof SearchResults>>()
  const searchClient = algoliasearch(
    'NHT6C0IV19', // docsearch app ID
    'ffa344297924c76b0f4155384aff7ef2' // vuetify API key
  )
  const searches = shallowRef(JSON.parse(localStorage.getItem('searches') || '[]'))

  const locale = 'en'

  watch(searches, val => {
    localStorage.setItem('searches', JSON.stringify(val))
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
  function onClickDelete (index: number) {
    const array = searches.value.slice(0, 6)

    array.splice(index, 1)

    searches.value = array
  }
  function onClickResult (result: any) {
    const array = searches.value.slice(0, 6)

    array.unshift(result)

    searches.value = array
  }
</script>

<style scoped>
  :deep(.v-field--variant-solo) {
    box-shadow: none;
  }
</style>
