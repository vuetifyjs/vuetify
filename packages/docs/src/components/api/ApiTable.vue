<template>
  <AppSheet>
    <v-table :style="`--cols: ${headers.length}`" class="api-table" density="comfortable" role="table">
      <thead role="rowgroup">
        <tr role="row">
          <th
            v-for="header in headers"
            :key="header"
            :class="header"
            role="columnheader"
          >
            <div
              class="text-capitalize"
              v-text="header"
            />
          </th>
        </tr>
      </thead>

      <tbody role="rowgroup">
        <template v-for="item in filtered" :key="item.name">
          <slot
            name="row"
            v-bind="{
              props: {
                style: 'background: rgba(0,0,0,.1)'
              },
              item,
            }"
          />

          <tr v-if="item.description || (user.one.devmode && item.source)" role="row">
            <td class="text-mono" colspan="3" role="cell">
              <template v-if="item.description">
                <AppMarkdown
                  v-if="localeStore.locale !== 'eo-UY'"
                  :content="item.description"
                  class="mb-0"
                />
                <span v-else>{{ item.description }}</span>
              </template>

              <p v-if="user.one.devmode && item.source">
                <strong>source: {{ item.source }}</strong>
                <template v-if="user.one.devmode && item.descriptionSource && item.source !== item.descriptionSource">
                  <br>
                  <strong>description source: {{ item.descriptionSource }}</strong>
                </template>
              </p>
            </td>
          </tr>
        </template>

        <tr v-if="!filtered.length" role="row">
          <td class="text-center text-disabled text-body-medium" colspan="4" role="cell">
            {{ t('search.no-results') }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </AppSheet>
</template>

<script setup lang="ts">
  // Types
  import type { PropType } from 'vue'

  const props = defineProps({
    headers: {
      type: Array as PropType<string[]>,
      default: () => ([]),
    },
    items: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  })

  const { t } = useI18n()
  const appStore = useAppStore()
  const localeStore = useLocaleStore()
  const user = useUserStore()

  const filtered = computed(() => {
    const items = props.items.filter((item: any) => {
      return user.one.devmode || item.description !== '**FOR INTERNAL USE ONLY**'
    })
    if (!appStore.apiSearch) return items

    const query = camelCase(appStore.apiSearch).toLowerCase()

    return items.filter((item: any) => {
      return item.name.toLowerCase().includes(query)
    })
  })
</script>
