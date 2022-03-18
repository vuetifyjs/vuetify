<template>
  <v-container>
    <v-select
      v-model="openStrategy"
      :items="['multiple', 'single']"
      label="Open strategy"
    ></v-select>

    <v-row>
      <v-col>
        <v-treeview
          v-model:opened="open"
          :items="items"
          :open-strategy="openStrategy"
        ></v-treeview>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col
        class="pa-6"
        cols="6"
      >
        <template v-if="!open.length">
          No items opened.
        </template>
        <template v-else>
          <div
            v-for="item in open"
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
      openStrategy: 'multiple',
      open: [],
      items: [
        {
          value: 'Parent #1',
          title: 'Parent #1',
          $children: [
            {
              value: 'Child #1',
              title: 'Child #1',
              $children: [
                { value: 'Grandchild #1', title: 'Grandchild #1' },
                { value: 'Grandchild #2', title: 'Grandchild #2' },
              ],
            },
            {
              value: 'Child #2',
              title: 'Child #2',
              $children: [
                { value: 'Grandchild #3', title: 'Grandchild #3' },
                { value: 'Grandchild #4', title: 'Grandchild #4' },
              ],
            },
          ],
        },
        {
          value: 'Parent #2',
          title: 'Parent #2',
          $children: [
            {
              value: 'Child #3',
              title: 'Child #3',
            },
            {
              value: 'Child #4',
              title: 'Child #4',
              $children: [
                { value: 'Grandchild #5', title: 'Grandchild #5' },
                { value: 'Grandchild #6', title: 'Grandchild #6' },
              ],
            },
          ],
        },
      ],
    }),
  }
</script>
