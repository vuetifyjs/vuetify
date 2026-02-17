<template>
  <ApiApiTable>
    <template #row="{ props, item }">
      <tr v-bind="props">
        <ApiNameCell :name="item.name" :new-in="item.newIn" section="exposed" />
      </tr>

      <tr>
        <AppMarkup
          :code="item.formatted"
          :rounded="false"
          language="ts"
        />
      </tr>
    </template>
  </ApiApiTable>
</template>
