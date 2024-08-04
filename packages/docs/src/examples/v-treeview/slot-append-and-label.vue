<template>
  <v-treeview
    v-model="tree"
    :items="items"
    :opened="initiallyOpen"
    item-key="name"
    activatable
    open-on-click
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="!item.file">
        {{ open ? 'i-mdi:folder-open' : 'i-mdi:folder' }}
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
    html: 'i-mdi:language-html5',
    js: 'i-mdi:nodejs',
    json: 'i-mdi:code-json',
    md: 'i-mdi:language-markdown',
    pdf: 'i-mdi:file-pdf-box',
    png: 'i-mdi:file-image',
    txt: 'i-mdi:file-document-outline',
    xls: 'i-mdi:file-excel',
  })
  const tree = ref([])
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

<script>
  export default {
    data: () => ({
      initiallyOpen: ['public'],
      files: {
        html: 'i-mdi:language-html5',
        js: 'i-mdi:nodejs',
        json: 'i-mdi:code-json',
        md: 'i-mdi:language-markdown',
        pdf: 'i-mdi:file-pdf-box',
        png: 'i-mdi:file-image',
        txt: 'i-mdi:file-document-outline',
        xls: 'i-mdi:file-excel',
      },
      tree: [],
      items: [
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
      ],
    }),
  }
</script>
