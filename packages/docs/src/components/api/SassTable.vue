<template>
  <ApiTable :headers="headers">
    <template #row="{ props, ...item }">
      <tr v-bind="props">
        <NameCell section="sass" :name="item.name" />

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

  const headers = ['name', 'default']
</script>
