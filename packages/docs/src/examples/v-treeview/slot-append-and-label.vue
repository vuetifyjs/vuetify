<template>
  <v-treeview
    :items="items"
    :opened="initiallyOpen"
    item-value="title"
    activatable
    open-on-click
  >
    <template v-slot:prepend="{ item, isOpen }">
      <v-icon v-if="!item.file">
        {{ isOpen ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
      <v-icon v-else>
        {{ files[item.file] }}
      </v-icon>
    </template>
  </v-treeview>
</template>

<script setup>
  import { ref } from 'vue'

  const initiallyOpen = ref(['public'])
  const files = ref({
    html: 'mdi-language-html5',
    js: 'mdi-nodejs',
    json: 'mdi-code-json',
    md: 'mdi-language-markdown',
    pdf: 'mdi-file-pdf-box',
    png: 'mdi-file-image',
    txt: 'mdi-file-document-outline',
    xls: 'mdi-file-excel',
  })
  const items = ref([
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
  ])
</script>
