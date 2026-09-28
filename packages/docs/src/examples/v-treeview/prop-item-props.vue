<template>
  <v-treeview
    :items="items"
    item-value="id"
    item-props
    open-all
    selectable
  ></v-treeview>
</template>

<script setup>
  import { ref } from 'vue'

  const items = ref([
    {
      id: 1,
      title: 'src',
      prependIcon: 'mdi-folder',
      children: [
        { id: 2, title: 'index.ts', prependIcon: 'mdi-language-typescript' },
        { id: 3, title: 'main.ts', prependIcon: 'mdi-language-typescript' },
        { id: 4, title: 'legacy.js', prependIcon: 'mdi-nodejs', disabled: true },
      ],
    },
    {
      id: 5,
      title: 'public',
      prependIcon: 'mdi-folder',
      children: [
        { id: 6, title: 'index.html', prependIcon: 'mdi-language-html5' },
        { id: 7, title: 'favicon.png', prependIcon: 'mdi-file-image' },
      ],
    },
    { id: 8, title: 'package.json', prependIcon: 'mdi-code-json' },
    { id: 9, title: 'README.md', prependIcon: 'mdi-language-markdown', disabled: true },
  ])
</script>
