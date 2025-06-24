<template>
  <AppSheet>
    <v-table class="api-table" density="comfortable">
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header"
            :class="header"
          >
            <div
              class="text-capitalize"
              v-text="header"
            />
          </th>
        </tr>
      </thead>

      <tbody>
        <template v-for="item in filtered" :key="item.name">
          <v-hover>
            <template #default="{ isHovering, props: hoverProps }">
              <slot
                name="row"
                v-bind="{
                  props: {
                    ...hoverProps,
                    style: isHovering && 'background: rgba(0,0,0,0.1)'
                  },
                  item
                }"
              />
            </template>
          </v-hover>

          <tr v-if="item.description || (user.dev && item.source)">
            <td v-if="user.dev && item.source" class="text-mono pt-4" colspan="4">
              <p v-if="user.dev && item.source">
                <strong>source: {{ item.source }}</strong>
                <template v-if="user.dev && item.descriptionSource && item.source !== item.descriptionSource">
                  <br>
                  <strong>description source: {{ item.descriptionSource }}</strong>
                </template>
              </p>
            </td>
          </tr>

        </template>

        <tr v-if="!filtered.length">
          <td class="text-center text-disabled text-body-2" colspan="4">
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
  const user = useUserStore()

  const filtered = computed(() => {
    const items = props.items.filter((item: any) => {
      return user.dev || item.description !== '**FOR INTERNAL USE ONLY**'
    })
    if (!appStore.apiSearch) return items

    const query = camelCase(appStore.apiSearch).toLowerCase()

    return items.filter((item: any) => {
      return item.name.toLowerCase().includes(query)
    })
  })
</script>

<style scoped lang="sass">
.api-table
  :deep(.v-markdown p)
    margin-bottom: 0
  :deep(.v-markdown a)
    display: inline-block
</style>
