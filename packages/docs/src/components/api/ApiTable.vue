<template>
  <app-sheet>
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
          <slot
            name="row"
            v-bind="{
              props: {
                class: 'bg-surface-bright'
              },
              item,
            }"
          />

          <tr v-if="item.description || (user.dev && item.source)">
            <td colspan="3" class="text-mono pt-4">
              <template v-if="item.description">
                <app-markdown
                  v-if="localeStore.locale !== 'eo-UY'"
                  :content="item.description"
                  class="mb-0"
                />
                <span v-else>{{ item.description }}</span>
              </template>

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
          <td colspan="4" class="text-center text-disabled text-body-2">
            {{ t('search.no-results') }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </app-sheet>
</template>

<script setup lang="ts">
  // Composables
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { computed, PropType } from 'vue'
  import { camelCase } from 'lodash-es'

  // Stores
  import { useAppStore } from '@/store/app'
  import { useLocaleStore } from '@/store/locale'
  import { useUserStore } from '@/store/user'

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
      return user.dev || item.description !== '**FOR INTERNAL USE ONLY**'
    })
    if (!appStore.apiSearch) return items

    const query = camelCase(appStore.apiSearch).toLowerCase()

    return items.filter((item: any) => {
      return item.name.toLowerCase().includes(query)
    })
  })
</script>
