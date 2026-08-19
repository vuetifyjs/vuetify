<template>
  <ApiApiTable :headers="headers">
    <template #row="{ props, item }">
      <tr v-bind="props" role="row">
        <ApiNameCell :name="item.name" :new-in="item.newIn" section="events" />

        <td role="cell">
          <ApiPrismCell :code="item.formatted" />
        </td>
      </tr>
    </template>
  </ApiApiTable>
</template>

<script setup lang="ts">
  const headers = ['name', 'type']
</script>
