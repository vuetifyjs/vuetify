<template>
  <ApiApiTable :headers="headers">
    <template #row="{ props, item }">
      <tr v-bind="props" role="row">
        <ApiNameCell :name="item.name" :new-in="item.newIn" section="sass" />

        <td role="cell">
          <ApiPrismCell :code="item.default" />
        </td>
      </tr>
    </template>
  </ApiApiTable>
</template>

<script setup lang="ts">
  const headers = ['name', 'default']
</script>
