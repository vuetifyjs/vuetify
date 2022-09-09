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
          <tr>
            <td>
              <NameCell section="props" :name="kebabCase(item.name)" />
            </td>
            <td>
              <TypescriptCell :code="getType(item)" />
            </td>
            <td>
              <TypescriptCell :code="item.default" />
            </td>
            <td>
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
  import TypescriptCell from './TypescriptCell.vue'
  import NameCell from './NameCell.vue'
  import { kebabCase } from 'lodash'

  export default defineComponent({
    components: {
      TypescriptCell,
      NameCell,
    },
    props: {
      items: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
    },
    setup (props) {
      const headers = ['name', 'type', 'default', 'description']

      return {
        headers,
        field: 'props',
        getType,
        kebabCase,
      }
    },
  })
</script>
