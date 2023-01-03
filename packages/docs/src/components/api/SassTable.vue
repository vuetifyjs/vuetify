<template>
  <app-sheet>
    <v-table
      class="api-table"
    >
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
        <template v-for="item in items" :key="item.name">
          <tr :class="theme.dark ? 'bg-grey-darken-3' : 'bg-grey-lighten-4'">
            <NameCell section="props" :name="kebabCase(item.name)" />
            <td>
              <PrismCell :code="item.default" language="scss" />
            </td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </app-sheet>
</template>

<script setup lang="ts">
  // Components
  import NameCell from './NameCell.vue'
  import PrismCell from './PrismCell.vue'

  // Utilities
  import { kebabCase } from 'lodash-es'
  import { PropType } from 'vue'
  import { useTheme } from 'vuetify'

  defineProps({
    items: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  })

  const { current: theme } = useTheme()

  const headers = ['name', 'default']
</script>
