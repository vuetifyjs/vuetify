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
    <AppHeadline :path="`api-headers.${section}`" />
    <TableComponent :items="items" :name="name" />
  </div>
</template>

<script setup lang="ts">
  // Components
  import DirectiveTable from '@/components/api/DirectiveTable.vue'
  import EventsTable from '@/components/api/EventsTable.vue'
  import ExposedTable from '@/components/api/ExposedTable.vue'
  import PropsTable from '@/components/api/PropsTable.vue'
  import SassTable from '@/components/api/SassTable.vue'
  import SlotsTable from '@/components/api/SlotsTable.vue'

  // Types
  import type { PartData } from '@vuetify/api-generator/src/types'
  import type { PropType } from 'vue'

  // Data
  import newIn from '@/data/new-in.json'

  type PartKey = Exclude<keyof PartData, 'displayName' | 'fileName' | 'pathName'>
  type NewIn = Record<string, Record<PartKey, Record<string, string>>>

  const getApi = (name: string): Promise<{ default: PartData }> => {
    return import(`../../../../api-generator/dist/api/${name}.json`)
  }

  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    section: {
      type: String as PropType<PartKey>,
      required: true,
    },
  })

  const store = useLocaleStore()
  const items = shallowRef()

  const TableComponent = computed(() => {
    return {
      props: PropsTable,
      events: EventsTable,
      slots: SlotsTable,
      exposed: ExposedTable,
      modifiers: ExposedTable,
      sass: SassTable,
      argument: DirectiveTable,
      value: DirectiveTable,
    }[props.section] || PropsTable
  })

  async function fetchApiData () {
    try {
      const api = (await getApi(props.name)).default
      const sectionName = props.section
      const section = api[sectionName]
      if (!section) {
        throw new Error(`API section "${props.section}" for "${props.name}" does not exist`)
      }

      if (sectionName === 'argument' || sectionName === 'value') {
        const section = api[sectionName]!
        items.value = [{
          ...section,
          name: sectionName,
          description: section.description?.[store.locale],
          descriptionSource: section.descriptionSource?.[store.locale],
        }]
      } else {
        const _newIn = newIn as any as NewIn
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
      }
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
