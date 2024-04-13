<template>
  <v-container>
    <v-select
      v-model="selectionType"
      :items="['leaf', 'independent']"
      label="Selection type"
    ></v-select>
    <v-row>
      <v-col>
        <v-treeview
          v-model="selection"
          :items="items"
          :selection-type="selectionType"
          open-all
          return-object
          selectable
        ></v-treeview>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col
        class="pa-6"
        cols="6"
      >
        <template v-if="!selection.length">
          No nodes selected.
        </template>
        <template v-else>
          <div
            v-for="node in selection"
            :key="node.id"
          >
            {{ node.name }}
          </div>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const selectionType = ref('leaf')
  const selection = ref([])
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
      selectionType: 'leaf',
      selection: [],
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
