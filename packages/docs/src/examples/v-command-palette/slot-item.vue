<template>
  <div class="text-center my-3">
    <v-btn text="Open" @click="model = !model"></v-btn>

    <v-command-palette
      v-model="model"
      :items="items"
      max-width="500"
    >
      <template v-slot:item="{ item, props }">
        <v-list-item v-bind="props" lines="two">
          <template v-slot:append>
            <v-chip :text="item.status" size="x-small" label></v-chip>
          </template>
        </v-list-item>
      </template>
    </v-command-palette>
  </div>
</template>

<script setup>
  import { ref, shallowRef } from 'vue'

  const model = shallowRef(false)

  const items = ref([
    { title: 'Fix login redirect', subtitle: 'Opened by Ana', status: 'Open', value: 101 },
    { title: 'Update dependencies', subtitle: 'Opened by Kim', status: 'Review', value: 102 },
    { title: 'Dark mode for charts', subtitle: 'Opened by Lee', status: 'Merged', value: 103 },
  ])
</script>
