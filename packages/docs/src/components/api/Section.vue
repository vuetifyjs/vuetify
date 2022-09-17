<template>
  <div v-if="items?.length">
    <!-- <div class="d-flex mb-2">
      <app-text-field
        clearable
        icon="$mdiMagnify"
        label="Filter"
        @input="filter = $event"
      />
    </div> -->
    <app-headline v-if="showHeadline" :path="`api-headers.${section}`" />
    <template v-if="section === 'props'">
      <PropsTable :items="items" />
    </template>
    <template v-else-if="section === 'events'">
      <EventsTable :items="items" />
    </template>
    <template v-else-if="section === 'slots'">
      <SlotsTable :items="items" />
    </template>
    <template v-else-if="section === 'exposed'">
      <ExposedTable :items="items" />
    </template>
    <!-- <template v-else>
      <api-table
        :api-data="apiData"
        class="mb-4"
        :field="section"
        :filter="filter"
      />
    </template> -->
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'
  import { useLocaleStore } from '@/store/locale'
  import PropsTable from './PropsTable.vue'
  import ExposedTable from './ExposedTable.vue'
  import EventsTable from './EventsTable.vue'
  import SlotsTable from './SlotsTable.vue'
  import { Item } from './utils'

  const getApi = (name: string) => {
    return import(`../../api/data/${name}.json`)
  }

  export default defineComponent({
    name: 'ApiSection',
    components: {
      PropsTable,
      ExposedTable,
      EventsTable,
      SlotsTable,
    },
    props: {
      name: {
        type: String,
        required: true,
      },
      section: {
        type: String,
        required: true,
      },
      showHeadline: Boolean,
    },

    setup (props) {
      const store = useLocaleStore()
      const items = ref()

      async function fetchApiData () {
        try {
          const api = (await getApi(props.name)).default
          if (!api[props.section]) {
            throw new Error(`API section "${props.section}" for "${props.name}" does not exist`)
          }
          const section = (api[props.section]?.properties ?? {}) as Record<string, Item>
          items.value = Object.entries(section).reduce<any>((arr, [name, prop]) => {
            arr.push({
              ...prop,
              name,
              description: prop.description[store.locale],
            })
            return arr
          }, []).sort((a: any, b: any) => a.name.localeCompare(b.name))
        } catch (err) {
          console.error(err)
        }
      }

      fetchApiData()

      watch(() => props.name, fetchApiData)

      return {
        filter: ref(),
        items,
      }
    },
  })
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

    :deep(.token.operator)
      background: none

  .name-item
    white-space: nowrap

    &:not(:hover):not(:focus)
      span
        opacity: 0
</style>
