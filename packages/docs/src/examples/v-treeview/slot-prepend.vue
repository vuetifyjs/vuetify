<template>
  <v-treeview
    v-model:selected="tree"
    v-model:opened="open"
    :items="items"
    select-strategy="single-independent"
    select-on-click
    hide-select
    selected-color="primary"
    @click:dblclick="({ isOpen, open }) => open(!isOpen)"
  >
    <template v-slot:prepend="{ file, isOpen }">
      <v-icon v-if="!file" :icon="isOpen ? 'mdi-folder-open' : 'mdi-folder'"></v-icon>
      <v-icon v-else :icon="files[file]"></v-icon>
    </template>
  </v-treeview>
</template>

<script>
  export default {
    data: () => ({
      open: ['public'],
      files: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-code-json',
        md: 'mdi-language-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
      },
      tree: [],
      items: [
        {
          title: '.git',
          value: '.git',
        },
        {
          title: 'node_modules',
          value: 'node_modules',
        },
        {
          title: 'public',
          value: 'public',
          $children: [
            {
              title: 'static',
              value: 'static',
              $children: [{
                title: 'logo.png',
                value: 'logo.png',
                file: 'png',
              }],
            },
            {
              title: 'favicon.ico',
              value: 'favicon.ico',
              file: 'png',
            },
            {
              title: 'index.html',
              value: 'index.html',
              file: 'html',
            },
          ],
        },
        {
          title: '.gitignore',
          value: '.gitignore',
          file: 'txt',
        },
        {
          title: 'babel.config.js',
          value: 'babel.config.js',
          file: 'js',
        },
        {
          title: 'package.json',
          value: 'package.json',
          file: 'json',
        },
        {
          title: 'README.md',
          value: 'README.md',
          file: 'md',
        },
        {
          title: 'vue.config.js',
          value: 'vue.config.js',
          file: 'js',
        },
        {
          title: 'yarn.lock',
          value: 'yarn.lock',
          file: 'txt',
        },
      ],
    }),
  }
</script>
