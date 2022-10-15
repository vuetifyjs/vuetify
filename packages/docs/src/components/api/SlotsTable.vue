<template>
  <app-sheet>
    <v-table
      class="api-table"
    >
      <tbody>
        <template v-for="item in items" :key="item.name">
          <tr class="bg-grey-lighten-4">
            <td>
              <NameCell section="props" :name="item.name" />
            </td>
          </tr>
          <tr v-if="item.formatted !== 'never'">
            <app-markup :code="getType(item)" language="ts" :rounded="false" />
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
      const headers = ['name', 'type', 'description']

      return {
        headers,
        field: 'props',
        getType,
      }
    },
  })
</script>
