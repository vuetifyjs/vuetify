<template>
  <ApiTable :headers="headers">
    <template #row="{ props, item }">
      <tr v-bind="props">
        <NameCell section="events" :name="item.name" :new-in="item.newIn" />

        <td>
          <PrismCell :code="item.formatted" />
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

  const headers = ['name', 'type']
</script>
