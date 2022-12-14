<!-- eslint-disable vue/attribute-hyphenation  -->
<template>
  <v-dialog v-model="model" scrollable width="500" height="700" @after-leave="searchString = ''">
    <template #activator="{ props }">
      <v-text-field v-bind="props" readonly variant="solo" :placeholder="placeholder" hide-details />
    </template>
    <v-card height="100%">
      <v-text-field
        v-model="searchString"
        class="flex-grow-0"
        variant="solo"
        autofocus
        :placeholder="t('search.placeholder')"
        hide-details
      />

      <v-card-text class="pa-0">
        <ais-instant-search
          :search-client="searchClient"
          :search-function="searchFunction"
          index-name="vuetifyjs-next"
        >
          <ais-configure
            :facetFilters="[`lang:${locale}`]"
            :hitsPerPage="50"
            :query="searchString"
          />

          <ais-hits v-slot="{ items }">
            <search-results ref="list" :groups="transformItems(items)" />
          </ais-hits>
        </ais-instant-search>
      </v-card-text>

      <AisPoweredBy />
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import algoliasearch from 'algoliasearch'
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
  import { onBeforeRouteLeave } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { useDisplay } from 'vuetify'
  import { AisConfigure, AisHits, AisInstantSearch, AisPoweredBy } from 'vue-instantsearch/vue3/es/src/instantsearch.js'
  import SearchResults from './SearchResults.vue'

  // Types
  import type { AlgoliaSearchHelper } from 'algoliasearch-helper'

  const { t } = useI18n()
  const { mobile } = useDisplay()

  const list = ref<InstanceType<typeof SearchResults>>()
  const model = ref(false)
  const searchString = ref('')
  const searchClient = algoliasearch(
    'NHT6C0IV19', // docsearch app ID
    'ffa344297924c76b0f4155384aff7ef2' // vuetify API key
  )

  const placeholder = computed(() => {
    let placeholder = t('search.placeholder')

    if (!mobile.value) {
      placeholder += ' ' + t('search.key-hint')
    }

    return placeholder
  })
  const locale = 'en'

  onMounted(() => {
    document.addEventListener('keydown', onDocumentKeydown)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onDocumentKeydown)
  })
  onBeforeRouteLeave(() => {
    model.value = false
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
  function onDocumentKeydown (e: KeyboardEvent) {
    if (!model.value && e.key === '/') {
      e.preventDefault()

      model.value = true
    } else if (model.value && ['ArrowDown', 'ArrowUp'].includes(e.key)) {
      list.value?.rootEl?.focus()
    }
  }
</script>

<style scoped>
  :deep(.v-field--variant-solo) {
    box-shadow: none;
  }
</style>
