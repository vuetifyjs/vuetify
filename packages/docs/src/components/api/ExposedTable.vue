<script setup lang="ts">
</script>
<template>
  <ApiApiTable>
    <template #row="{ props, item }">
      <tr v-bind="props" role="row">
        <ApiNameCell :name="item.name" :new-in="item.newIn" section="exposed" />
      </tr>

      <tr role="row">
        <AppMarkup
          :code="item.formatted"
          :rounded="false"
          language="ts"
        />
      </tr>
    </template>
  </ApiApiTable>
</template>
