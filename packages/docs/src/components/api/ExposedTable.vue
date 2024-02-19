<template>
  <ApiApiTable>
    <template #row="{ props, item }">
      <tr v-bind="props">
        <ApiNameCell section="exposed" :name="item.name" :new-in="item.newIn" />
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
