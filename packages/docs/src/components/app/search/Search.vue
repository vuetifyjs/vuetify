<!-- eslint-disable vue/attribute-hyphenation  -->
<template>
  <v-dialog
    v-model="model"
    height="700"
    scrollable
    width="500"
    @after-leave="searchString = ''"
  >
    <template #activator="{ props: activatorProps }">
      <app-btn
        :active="model"
        :icon="xs ? 'mdi-magnify' : undefined"
        :prepend-icon="smAndUp ? 'mdi-magnify' : undefined"
        v-bind="activatorProps"
      >
        <span :class="mdAndUp && 'me-n1'">
          <span v-if="smAndUp">
            {{ t('search.label') }}
          </span>

          <span
            :class="[
              smAndDown ? 'border-opacity-0' : 'py-1 px-2 ms-2',
              'border rounded text-disabled text-caption'
            ]"
          >
            <span v-if="mdAndUp">{{ t('search.key-hint') }}</span>
          </span>
        </span>
      </app-btn>
    </template>

    <v-card height="100%">
      <v-toolbar color="primary" class="ps-3 pe-4">
        <v-icon icon="$vuetify" size="x-large" />

        <v-toolbar-title class="ms-2">
          {{ t('search.label') }} Vuetify
        </v-toolbar-title>

        <v-spacer />

        <v-btn
          class="me-n2"
          icon="mdi-close"
          size="x-small"
          variant="text"
          @click="model = false"
        />
      </v-toolbar>

      <app-text-field
        v-model="searchString"
        :placeholder="`${t('search.looking') }...`"
        autofocus
        class="flex-grow-0"
        variant="filled"
      />

      <v-card-text class="pa-4">
        <div v-if="!searchString" class="mt-16 pt-16 text-center">
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

        <ais-instant-search
          v-else
          :search-client="searchClient"
          :search-function="searchFunction"
          index-name="vuetifyjs-v3"
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

      <AisPoweredBy class="ms-auto me-4 mb-2" />
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  // Components
  import SearchResults from './SearchResults.vue'

  // Composables
  import { useDisplay } from 'vuetify'
  import { useI18n } from 'vue-i18n'
  import { onBeforeRouteLeave, useRoute } from 'vue-router'

  // Utilities
  import { AisConfigure, AisHits, AisInstantSearch, AisPoweredBy } from 'vue-instantsearch/vue3/es/src/instantsearch.js'
  import { onBeforeUnmount, onMounted, ref } from 'vue'
  import algoliasearch from 'algoliasearch'

  // Types
  import type { AlgoliaSearchHelper } from 'algoliasearch-helper'

  const { t } = useI18n()
  const { smAndUp, smAndDown, mdAndUp, xs } = useDisplay()
  const { query } = useRoute()

  const list = ref<InstanceType<typeof SearchResults>>()
  const model = ref(false)
  const searchString = ref('')
  const searchClient = algoliasearch(
    'NHT6C0IV19', // docsearch app ID
    'ffa344297924c76b0f4155384aff7ef2' // vuetify API key
  )

  const locale = 'en'

  onMounted(() => {
    document.addEventListener('keydown', onDocumentKeydown)
    if (query?.search) {
      searchString.value = query.search as string
      model.value = true
    }
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
