<template>
  <v-container>
    <v-data-table-virtual
      :headers="headers"
      :items="groups"
      height="400"
      item-value="id"
      fixed-header
      show-expand
    >
      <template v-slot:item.count="{ item }">
        <v-chip :text="`${item.children.length} items`" size="small"></v-chip>
      </template>

      <template v-slot:item.data-table-expand="{ item, internalItem, isExpanded, toggleExpand }">
        <v-icon-btn
          v-if="item.children.length"
          :icon="isExpanded(internalItem) ? '$collapse' : '$expand'"
          icon-size="20"
          variant="text"
          @click="toggleExpand(internalItem)"
        ></v-icon-btn>

        <v-icon-btn
          v-else
          icon="$plus"
          icon-size="20"
          @click="addChild(item); isExpanded(internalItem) || toggleExpand(internalItem)"
        ></v-icon-btn>
      </template>

      <template v-slot:expanded-row="{ columns, item }">
        <v-data-table-row
          v-for="child in item.children"
          :key="child.id"
          :item="asRow(child)"
          class="bg-surface-light"
        >
          <template v-slot:item.name="{ value }">
            <span class="pl-4">{{ value }}</span>
          </template>

          <template v-slot:item.data-table-expand>
            <v-icon-btn
              icon="$close"
              icon-color="red"
              icon-size="20"
              variant="text"
              @click="removeChild(item, child)"
            ></v-icon-btn>
          </template>
        </v-data-table-row>

        <tr>
          <td
            :colspan="columns.length"
            class="pa-0 border-dashed border-sm border-opacity-50"
            style="height: 32px"
          >
            <v-btn
              height="32"
              icon="$plus"
              size="small"
              text="row"
              variant="text"
              block
              tile
              @click="addChild(item)"
            ></v-btn>
          </td>
        </tr>
      </template>
    </v-data-table-virtual>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  let nextId = 0

  const newChild = () => ({ id: `child-${nextId++}`, name: `Item ${nextId}`, type: 'child' })

  const headers = [
    { title: 'Name', key: 'name', width: 170 },
    { title: 'Type', key: 'type', width: 'auto' },
    { title: 'Children', key: 'count', width: 140, sortable: false },
    { key: 'data-table-expand', width: 96, align: 'end' },
  ]

  const groups = ref(Array.from({ length: 200 }, (_, i) => ({
    id: i,
    name: `Group ${i + 1}`,
    type: 'group',
    children: Array.from({ length: i % 7 ? 2 + (i % 4) : 0 }, newChild),
  })))

  function addChild (group) {
    group.children.push(newChild())
  }

  function removeChild (group, child) {
    group.children.splice(group.children.indexOf(child), 1)
  }

  function asRow (child) {
    return {
      type: 'item',
      key: child.id,
      value: child.id,
      raw: child,
      columns: { name: child.name, type: child.type },
      selectable: false,
    }
  }
</script>

<script>
  export default {
    data: () => ({
      nextId: 0,
      groups: [],
      headers: [
        { title: 'Name', key: 'name', width: 170 },
        { title: 'Type', key: 'type', width: 'auto' },
        { title: 'Children', key: 'count', width: 140, sortable: false },
        { key: 'data-table-expand', width: 96, align: 'end' },
      ],
    }),

    created () {
      this.groups = Array.from({ length: 200 }, (_, i) => ({
        id: i,
        name: `Group ${i + 1}`,
        type: 'group',
        children: Array.from({ length: i % 7 ? 2 + (i % 4) : 0 }, () => this.newChild()),
      }))
    },

    methods: {
      newChild () {
        return { id: `child-${this.nextId++}`, name: `Item ${this.nextId}`, type: 'child' }
      },
      addChild (group) {
        group.children.push(this.newChild())
      },
      removeChild (group, child) {
        group.children.splice(group.children.indexOf(child), 1)
      },
      asRow (child) {
        return {
          type: 'item',
          key: child.id,
          value: child.id,
          raw: child,
          columns: { name: child.name, type: child.type },
          selectable: false,
        }
      },
    },
  }
</script>
