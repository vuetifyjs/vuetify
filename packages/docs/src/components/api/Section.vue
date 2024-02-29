<template>
  <div v-if="items?.length" class="mb-4">
    <!-- <div class="d-flex mb-2">
      <AppTextField
        clearable
        icon="$mdiMagnify"
        label="Filter"
        @input="filter = $event"
      />
    </div> -->
    <AppHeadline v-if="showHeadline" :path="`api-headers.${section}`" />
    <TableComponent :items="items" :name="name" />
  </div>
</template>

<script setup lang="ts">
  // Components
  import EventsTable from '@/components/api/EventsTable.vue'
  import ExposedTable from '@/components/api/ExposedTable.vue'
  import PropsTable from '@/components/api/PropsTable.vue'
  import SassTable from '@/components/api/SassTable.vue'
  import SlotsTable from '@/components/api/SlotsTable.vue'

  // Types
  import type { Item } from './utils'

  // Data
  import newIn from '@/data/new-in.json'

  const getApi = (name: string) => {
    return import(`../../../../api-generator/dist/api/${name}.json`)
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

  const store = useLocaleStore()
  const items = ref()

  const TableComponent = computed(() => {
    if (['props', 'argument', 'modifiers'].includes(props.section)) {
      return PropsTable
    } else if (props.section === 'events') {
      return EventsTable
    } else if (props.section === 'slots') {
      return SlotsTable
    } else if (props.section === 'exposed') {
      return ExposedTable
    } else if (props.section === 'sass') {
      return SassTable
    }

    return PropsTable
  })

  async function fetchApiData () {
    try {
      const api = (await getApi(props.name)).default
      if (!api[props.section]) {
        throw new Error(`API section "${props.section}" for "${props.name}" does not exist`)
      }
      const section = (api[props.section] ?? {}) as Record<string, Item>
      const _newIn = newIn as Record<string, Record<string, Record<string, string>>>

      items.value = Object.entries(section).reduce<any>((arr, [name, prop]) => {
        arr.push({
          ...prop,
          name,
          newIn: _newIn?.[props.name]?.[props.section]?.[name],
          description: prop.description?.[store.locale],
          descriptionSource: prop.descriptionSource?.[store.locale],
        })
        return arr
      }, []).sort((a: any, b: any) => a.name.localeCompare(b.name))
    } catch (err) {}
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
