<template>
  <v-card
    class="mx-auto"
    max-width="328"
    rounded="lg"
    border
  >
    <v-confirm-edit v-model="date">
      <template v-slot:default="{ model: proxyModel, actions }">
        <v-date-picker v-model="proxyModel.value">
          <template v-slot:actions>
            <component :is="actions"></component>
          </template>
        </v-date-picker>
      </template>
    </v-confirm-edit>
  </v-card>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const date = shallowRef()
</script>
