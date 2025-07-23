<template>
  <v-treeview
    v-model:selected="model"
    :items="items"
    item-value="id"
    select-strategy="classic"
    open-all
    selectable
  >
    <template v-slot:toggle="{ props: toggleProps, isOpen, isSelected, isIndeterminate, path, item }">
      <v-badge
        :color="isSelected ? 'success' : 'warning'"
        :model-value="isSelected || isIndeterminate"
      >
        <template v-slot:badge>
          <v-icon
            v-if="isSelected"
            icon="$complete"
            v-tooltip="`All elements in ${item.title} are selected`"
          ></v-icon>
          <span v-if="isIndeterminate">{{ selectionsInfo(path) }}</span>
        </template>
        <v-btn
          v-bind="toggleProps"
          :color="isIndeterminate ? 'warning' : isSelected ? 'success' : 'medium-emphasis'"
          :variant="isOpen ? 'outlined' : 'tonal'"
        ></v-btn>
      </v-badge>
    </template>
  </v-treeview>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const model = shallowRef([])

  function selectionsInfo (path) {
    const node = path.reduce((current, i) => current.children[i], { children: items })

    const allLeafsIds = (function flatten (n) {
      return n.children?.flatMap(flatten) ?? [n.id]
    })(node)

    const selectedCount = allLeafsIds
      .filter(id => model.value.includes(id))
      .length

    return `${selectedCount}/${allLeafsIds.length}`
  }

  const items = [
    {
      id: '1',
      title: 'Dashboard',
      children: [
        {
          id: '1-1',
          title: 'Analytics',
        },
        {
          id: '1-2',
          title: 'Reports',
        },
        {
          id: '1-3',
          title: 'Financial',
          children: [
            {
              id: '1-3-1',
              title: 'Budget',
            },
            {
              id: '1-3-2',
              title: 'Operations',
            },
            {
              id: '1-3-3',
              title: 'Costs',
            },
          ],
        },
      ],
    },
  ]
</script>

<script>
  export default {
    data () {
      return {
        model: [],
        items: [
          {
            id: '1',
            title: 'Dashboard',
            children: [
              {
                id: '1-1',
                title: 'Analytics',
              },
              {
                id: '1-2',
                title: 'Reports',
              },
              {
                id: '1-3',
                title: 'Financial',
                children: [
                  {
                    id: '1-3-1',
                    title: 'Budget',
                  },
                  {
                    id: '1-3-2',
                    title: 'Operations',
                  },
                  {
                    id: '1-3-3',
                    title: 'Costs',
                  },
                ],
              },
            ],
          },
        ],
      }
    },
    methods: {
      selectionsInfo (path) {
        const node = path.reduce((current, i) => current.children[i], { children: this.items })

        const allLeafsIds = (function flatten (n) {
          return n.children?.flatMap(flatten) ?? [n.id]
        })(node)

        const selectedCount = allLeafsIds
          .filter(id => this.model.includes(id))
          .length

        return `${selectedCount}/${allLeafsIds.length}`
      },
    },
  }
</script>
