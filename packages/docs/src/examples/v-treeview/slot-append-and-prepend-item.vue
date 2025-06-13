<template>
  <v-treeview
    v-model:activated="activated"
    :items="items"
    item-key="id"
    item-value="id"
    activatable
    open-all
  >
    <template v-slot:append="{ item, depth, isFirst, isLast }">
      <v-icon-btn :disabled="!depth" icon="mdi-arrow-left" @click.stop="move(item, 'left')"></v-icon-btn>
      <v-icon-btn :disabled="isFirst" icon="mdi-arrow-up" @click.stop="move(item, 'up')"></v-icon-btn>
      <v-icon-btn :disabled="isLast" icon="mdi-arrow-down" @click.stop="move(item, 'down')"></v-icon-btn>
      <v-icon-btn :disabled="isFirst" icon="mdi-arrow-right" @click.stop="move(item, 'right')"></v-icon-btn>
    </template>
  </v-treeview>
</template>

<script setup lang="ts">
  import { ref, shallowRef } from 'vue'

  const activated = ref([])
  const root = {
    id: 0,
    children: [
      {
        id: 1,
        title: 'Office Tools',
        children: [
          { id: 2, title: 'Calendar' },
          { id: 3, title: 'Notepad' },
        ],
      },
      {
        id: 4,
        title: 'Dev Tools',
        children: [
          { id: 5, title: 'VS Code' },
          { id: 6, title: 'Figma' },
          { id: 7, title: 'Webstorm' },
        ],
      },
    ],
  }
  const items = shallowRef([...root.children])

  type TreeNode = { id: number, children?: TreeNode[] }

  function findParent (id: number, items: TreeNode[] = [root]): TreeNode {
    if (items.length === 0) return null
    return items.find(item => item.children?.some(c => c.id === id)) ??
      findParent(id, items.flatMap(item => item.children ?? []))!
  }

  function findItemBefore (item: TreeNode) {
    return findParent(item.id).children!
      .find((_, i, all) => all[i + 1]?.id === item.id)
  }

  function findItemAfter (item: TreeNode) {
    return findParent(item.id).children!
      .find((_, i, all) => all[i - 1]?.id === item.id)
  }

  function detach (item: TreeNode) {
    const parent = findParent(item.id)
    parent.children!.splice(parent.children.indexOf(item), 1)
    if (parent.children.length === 0) parent.children = undefined
  }

  function injectNextTo (item: TreeNode, target: TreeNode, after = true) {
    if (!target || target === root) return
    detach(item)
    const targetParent = findParent(target.id)
    targetParent.children!.splice(targetParent.children.indexOf(target) + (after ? 1 : 0), 0, item)
    activated.value = [item.id]
  }

  function appendTo (item: TreeNode, target: TreeNode) {
    if (!target) return
    detach(item)
    target.children ??= []
    target.children.push(item)
    activated.value = [item.id]
  }

  function move (item: TreeNode, direction: 'left' | 'up' | 'down' | 'right') {
    switch (direction) {
      case 'left':
        injectNextTo(item, findParent(item.id))
        break
      case 'up':
        injectNextTo(item, findItemBefore(item), false)
        break
      case 'right':
        appendTo(item, findItemBefore(item))
        break
      case 'down':
        injectNextTo(item, findItemAfter(item))
        break
    }
    items.value = [...root.children]
  }
</script>

<script>
  export default {
    data: () => ({
      activated: [],
      root: {
        id: 0,
        children: [
          {
            id: 1,
            title: 'Office Tools',
            children: [
              { id: 2, title: 'Calendar' },
              { id: 3, title: 'Notepad' },
            ],
          },
          {
            id: 4,
            title: 'Dev Tools',
            children: [
              { id: 5, title: 'VS Code' },
              { id: 6, title: 'Figma' },
              { id: 7, title: 'Webstorm' },
            ],
          },
        ],
      },
      items: [],
    }),
    mounted () {
      this.items = [...this.root.children]
    },
    methods: {
      findParent (id, items) {
        items ??= [this.root]
        if (items.length === 0) return null
        return items.find(item => item.children?.some(c => c.id === id)) ??
          this.findParent(id, items.flatMap(item => item.children ?? []))
      },
      findItemBefore (item) {
        return this.findParent(item.id).children
          .find((_, i, all) => all[i + 1]?.id === item.id)
      },
      findItemAfter (item) {
        return this.findParent(item.id).children
          .find((_, i, all) => all[i - 1]?.id === item.id)
      },
      detach (item) {
        const parent = this.findParent(item.id)
        parent.children.splice(parent.children.indexOf(item), 1)
        if (parent.children.length === 0) parent.children = undefined
      },
      injectNextTo (item, target, after = true) {
        if (!target || target === this.root) return
        this.detach(item)
        const targetParent = this.findParent(target.id)
        targetParent.children.splice(targetParent.children.indexOf(target) + (after ? 1 : 0), 0, item)
        this.activated = [item.id]
      },
      appendTo (item, target) {
        if (!target) return
        this.detach(item)
        target.children ??= []
        target.children.push(item)
        this.activated = [item.id]
      },
      move (item, direction) {
        switch (direction) {
          case 'left':
            this.injectNextTo(item, this.findParent(item.id))
            break
          case 'up':
            this.injectNextTo(item, this.findItemBefore(item), false)
            break
          case 'right':
            this.appendTo(item, this.findItemBefore(item))
            break
          case 'down':
            this.injectNextTo(item, this.findItemAfter(item))
            break
        }
        this.items = [...this.root.children]
      },
    },
  }
</script>
