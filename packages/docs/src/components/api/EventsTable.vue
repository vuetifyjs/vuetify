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
            <NameCell section="exposed" :name="item.name" />
            <td>
              <PrismCell :code="getType(item)" />
            </td>
          </tr>
          <tr>
            <td colspan="2" class="text-mono">
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
  import NameCell from './NameCell.vue'
  import PrismCell from './PrismCell.vue'

  export default defineComponent({
    components: {
      NameCell,
      PrismCell,
    },
    props: {
      items: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
    },
    setup (props) {
      const headers = ['name', 'type']

      return {
        headers,
        field: 'props',
        getType,
      }
    },
  })
</script>
