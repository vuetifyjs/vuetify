<template>
  <v-container>
    <v-select
      v-model="selectionStrategy"
      :items="['single-leaf', 'leaf', 'single-independent', 'independent', 'classic']"
      label="Selection strategy"
    ></v-select>
    <v-row>
      <v-col>
        <v-treeview
          v-model:selected="selection"
          :items="items"
          :select-strategy="selectionStrategy"
          show-select
        ></v-treeview>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col
        class="pa-6"
        cols="6"
      >
        <template v-if="!selection.length">
          No items selected.
        </template>
        <template v-else>
          <div
            v-for="item in selection"
            :key="item"
          >
            {{ item }}
          </div>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      selectionStrategy: 'single-leaf',
      selection: [],
      items: [
        {
          value: 'Root',
          title: 'Root',
          $children: [
            { value: 'Child #1', title: 'Child #1' },
            { value: 'Child #2', title: 'Child #2' },
            {
              value: 'Child #3',
              title: 'Child #3',
              $children: [
                { value: 'Grandchild #1', title: 'Grandchild #1' },
                { value: 'Grandchild #2', title: 'Grandchild #2' },
              ],
            },
          ],
        },
      ],
    }),
  }
</script>
