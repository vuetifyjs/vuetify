<template>
  <v-treeview
    v-model:opened="open"
    :items="items"
    density="compact"
    item-value="title"
    activatable
    open-on-click
  >
    <template v-slot:prepend="{ item, isOpen }">
      <v-icon v-if="!item.file" :icon="isOpen ? 'mdi-folder-open' : 'mdi-folder'"></v-icon>

      <v-icon v-else :icon="files[item.file]"></v-icon>
    </template>
  </v-treeview>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const open = shallowRef(['public'])
  const files = shallowRef({
    html: 'mdi-language-html5',
    js: 'mdi-nodejs',
    json: 'mdi-code-json',
    md: 'mdi-language-markdown',
    pdf: 'mdi-file-pdf-box',
    png: 'mdi-file-image',
    txt: 'mdi-file-document-outline',
    xls: 'mdi-file-excel',
  })

  const items = [
    {
      title: '.git',
    },
    {
      title: 'node_modules',
    },
    {
      title: 'public',
      children: [
        {
          title: 'static',
          children: [{
            title: 'logo.png',
            file: 'png',
          }],
        },
        {
          title: 'favicon.ico',
          file: 'png',
        },
        {
          title: 'index.html',
          file: 'html',
        },
      ],
    },
    {
      title: '.gitignore',
      file: 'txt',
    },
    {
      title: 'babel.config.js',
      file: 'js',
    },
    {
      title: 'package.json',
      file: 'json',
    },
    {
      title: 'README.md',
      file: 'md',
    },
    {
      title: 'vue.config.js',
      file: 'js',
    },
    {
      title: 'yarn.lock',
      file: 'txt',
    },
  ]
</script>
