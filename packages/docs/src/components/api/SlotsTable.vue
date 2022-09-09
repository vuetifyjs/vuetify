<template>
  <div>
    <!-- <v-table
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
              <NameCell section="exposed" :name="item.name" />
            </td>
            <td>
              <TypescriptCell :code="getType(item)" />
            </td>
            <td>
              <app-markdown v-if="item.description" :content="item.description" />
            </td>
          </tr>
        </template>
      </tbody>
    </v-table> -->
    <template v-for="item in items" :key="item.name">
      <v-card class="mb-4">
        <template #title>
          <NameCell section="slots" :name="item.name" />
        </template>
        <v-card-text>
          <app-markdown v-if="item.description" :content="item.description" />
        </v-card-text>
        <v-card-text>
          <app-markup :code="getType(item)" language="ts" resource="props" />
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script lang="ts">
  // Imports
  import { defineComponent, PropType } from 'vue'
  import { getType } from './utils'
  import NameCell from './NameCell.vue'
  import TypescriptCell from './TypescriptCell.vue'

  export default defineComponent({
    components: {
      NameCell,
      TypescriptCell,
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
