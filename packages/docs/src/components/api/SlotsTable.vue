<template>
  <app-sheet>
    <v-table
      class="api-table"
    >
      <tbody>
        <template v-for="item in items" :key="item.name">
          <tr class="bg-grey-lighten-4">
            <NameCell section="props" :name="item.name" />
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

<script setup lang="ts">
  // Components
  import NameCell from './NameCell.vue'

  // Utilities
  import { getType } from './utils'
  import { PropType } from 'vue'

  defineProps({
    items: {
      type: Array as PropType<any[]>,
      default: () => [],
    },
  })
</script>
