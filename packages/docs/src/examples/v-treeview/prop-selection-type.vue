<template>
  <v-sheet border rounded>
    <v-container fluid>
      <v-select
        v-model="strategy"
        :items="['leaf', 'single-leaf', 'independent', 'single-independent', 'classic']"
        label="Selection type"
      ></v-select>

      <v-row>
        <v-col cols="12" md="6">
          <v-treeview
            v-model:selected="selected"
            :items="items"
            :select-strategy="strategy"
            item-value="id"
            return-object
            selectable
          ></v-treeview>
        </v-col>

        <v-divider vertical></v-divider>

        <v-col class="pa-6" cols="12" md="6">
          <template v-if="!selected.length">No nodes selected.</template>

          <template v-else>
            <div v-for="node in selected" :key="node.id">
              {{ node.title }}
            </div>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup>
  import { ref, shallowRef } from 'vue'

  const strategy = shallowRef('leaf')
  const selected = shallowRef([])
  const items = ref([
    {
      id: 1,
      title: 'Root',
      children: [
        { id: 2, title: 'Child #1' },
        { id: 3, title: 'Child #2' },
        {
          id: 4,
          title: 'Child #3',
          children: [
            { id: 5, title: 'Grandchild #1' },
            { id: 6, title: 'Grandchild #2' },
          ],
        },
      ],
    },
  ])
</script>

<script>
  export default {
    data: () => ({
      strategy: 'leaf',
      selected: [],
      items: [
        {
          id: 1,
          title: 'Root',
          children: [
            { id: 2, title: 'Child #1' },
            { id: 3, title: 'Child #2' },
            {
              id: 4,
              title: 'Child #3',
              children: [
                { id: 5, title: 'Grandchild #1' },
                { id: 6, title: 'Grandchild #2' },
              ],
            },
          ],
        },
      ],
    }),
  }
</script>
