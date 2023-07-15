<template>
  <div class="border rounded my-6">
    <v-select
      ref="autocomplete"
      v-model="selectedfVersionStrategy"
      :items="versionStrategies"
      :menu-props="menuProps"
      hide-details
      density="comfortable"
      item-title="text"
      label="Upgradign from"
      prepend-inner-icon="mdi-update"
      return-object
    />

    <v-card variant="flat" rounded="t-0 b">
      <div class="my-8">
        <v-card-title>
          Upgrading Vuetfiy from {{ selectedfVersionStrategy?.text }}
        </v-card-title>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
// Utilities
import { computed, ref, watch } from "vue";

const autocomplete = ref();
const selectedfVersionStrategy = ref();

const versionStrategies = ref([
  { text: "Version 1 to Version 2", value: 12 },
  { text: "Version 1 to Version 3", value: 13 },
  { text: "Version 2 to Version 3", value: 23 },
]);

const menuProps = computed(() => {
  return {
    contentClass: "notes-autocomplete rounded-b-lg",
    maxHeight: 300,
  };
});

watch(selectedfVersionStrategy, (val) => {
  if (!val) return;
  autocomplete.value?.blur();
});
</script>

<style lang="sass">
.notes-autocomplete
  > .v-list.v-select-list
    background: transparent !important
.releases
  img
    max-width: 100%
</style>
