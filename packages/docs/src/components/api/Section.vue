<template>
  <div v-if="items?.length" class="mb-4">
    <div class="d-flex mb-2">

      <v-text-field
        v-model="search"
        density="compact"
        variant="solo"
        label="Filter"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
      />

    </div>

    <app-headline v-if="showHeadline" :path="`api-headers.${section}`" />

    <component :is="renderApiSection" :items="filteredItems" />

  </div>
</template>

<script setup lang="ts">
  import { computed, computed, ref, ref, watch, watch } from 'vue'

  // Components
  import SassTable from './SassTable.vue'
  import SlotsTable from './SlotsTable.vue'
  import PropsTable from './PropsTable.vue'
  import SassTable from './SassTable.vue'
  import EventsTable from './EventsTable.vue'
  import ExposedTable from './ExposedTable.vue'

  // Composables
  import { useLocaleStore } from '@/store/locale'

  // Utilities
  import { Item } from './utils'

  const getApi = (name: string) => {
    return import(`../../api/data/${name}.json`)
  }

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      required: true,
    },
    showHeadline: Boolean,
  })

  const sectionMap = {
    sass: SassTable,
    slots: SlotsTable,
    events: EventsTable,
    exposed: ExposedTable,
    props: PropsTable,
    argument: PropsTable,
    modifiers: PropsTable,
  }

  const renderApiSection = computed(() => {
    const component = sectionMap[props.section as keyof typeof sectionMap]
    return component || null
  })

  // 👉 Seection Search logic
  const search = ref()
  const searchableFields = ['name', 'description']

  const filteredItems = computed(() => {
    return items.value.filter((item: any) =>
      searchableFields
        .map(field => item[field])
        .some(value =>
          value
            .toString()
            .toLowerCase()
            .includes(search.value?.toLowerCase() ?? '')
        )
    )
  })

  const items = ref()
  const store = useLocaleStore()

  async function fetchApiData () {
    try {
      const api = (await getApi(props.name)).default
      if (!api[props.section]) {
        throw new Error(`API section "${props.section}" for "${props.name}" does not exist`)
      }
      const section = (api[props.section] ?? {}) as Record<string, Item>
      items.value = Object.entries(section).reduce<any>((arr, [name, prop]) => {
        arr.push({
          ...prop,
          name,
          description: prop.description?.[store.locale],
        })
        return arr
      }, []).sort((a: any, b: any) => a.name.localeCompare(b.name))
    } catch (err) {
      console.error(err)
    }
  }

  fetchApiData()

  watch(() => props.name, fetchApiData)
</script>

<style lang="sass">
  .api-table
    .regular-row td
      padding: 8px 16px !important

    .regular-row.has-extra-row td
      border-bottom: none !important

    .extra-row:hover
      background: initial !important

    .extra-row td
      padding: 8px 0 !important

    .v-markdown :deep(p)
      margin-bottom: 0

    .token.operator
      background: none

  .name-item
    white-space: nowrap

    &:not(:hover):not(:focus)
      span
        opacity: 0
</style>
