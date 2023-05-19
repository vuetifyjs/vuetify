<template>
  <ApiTable :headers="headers">
    <template #row="{ props, ...item }">
      <tr v-bind="props">
        <NameCell section="props" :name="kebabCase(item.name)" />

        <td>
          <PrismCell :code="item.formatted" />
        </td>

        <td>
          <PrismCell :code="item.default" />
        </td>
      </tr>
    </template>
  </ApiTable>
</template>

<script setup lang="ts">
  // Components
  import ApiTable from './ApiTable.vue'
  import NameCell from './NameCell.vue'
  import PrismCell from './PrismCell.vue'

  // Utilities
  import { kebabCase } from 'lodash-es'

  const headers = ['name', 'type', 'default']
</script>
