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
          <tr class="bg-grey-lighten-4">
            <td>
              <NameCell section="props" :name="kebabCase(item.name)" />
            </td>
            <td>
              <PrismCell :code="getType(item)" />
            </td>
            <td>
              <PrismCell :code="item.default" />
            </td>
          </tr>
          <tr>
            <td colspan="3" class="text-mono">
              <app-markdown v-if="item.description" :content="item.description" />
            </td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </app-sheet>
</template>

<script lang="ts">
  // Imports
  import { defineComponent, PropType } from 'vue'
  import { getType } from './utils'
  import PrismCell from './PrismCell.vue'
  import NameCell from './NameCell.vue'
  import { kebabCase } from 'lodash-es'

  export default defineComponent({
    components: {
      PrismCell,
      NameCell,
    },
    props: {
      items: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
    },
    setup (props) {
      const headers = ['name', 'type', 'default']

      return {
        headers,
        field: 'props',
        getType,
        kebabCase,
      }
    },
  })
</script>
