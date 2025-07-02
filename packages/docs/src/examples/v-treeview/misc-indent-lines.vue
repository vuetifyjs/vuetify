<template>
  <div>
    <v-toolbar>
      <div class="d-flex ga-6 pl-6">
        <v-switch v-model="actionIcons" color="success" label="action icons" hide-details></v-switch>
        <v-switch v-model="prependIcons" color="success" label="prepend icons" hide-details></v-switch>
        <v-switch v-model="separateRoots" color="success" label="separate roots" hide-details></v-switch>
      </div>
    </v-toolbar>
    <v-container class="d-flex ga-8 justify-center flex-wrap" fluid>

      <v-sheet width="400">
        <v-treeview
          :hide-actions="!actionIcons"
          :items="items1"
          :separate-roots="separateRoots"
          density="compact"
          item-value="id"
          max-width="400"
          open-all
          open-on-click
          show-lines
        >
          <template v-if="prependIcons" v-slot:prepend="{ item, isOpen }">
            <v-icon :icon="getIcon(item, isOpen)"></v-icon>
          </template>
        </v-treeview>
      </v-sheet>

      <v-sheet width="400">
        <v-treeview
          :hide-actions="!actionIcons"
          :items="items2"
          :separate-roots="separateRoots"
          density="compact"
          item-value="id"
          open-all
          open-on-click
          show-lines
        >
          <template v-if="prependIcons" v-slot:prepend="{ item, isOpen }">
            <v-icon :icon="getIcon(item, isOpen)"></v-icon>
          </template>
        </v-treeview>
      </v-sheet>
    </v-container>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const separateRoots = shallowRef(false)
  const actionIcons = shallowRef(true)
  const prependIcons = shallowRef(true)

  const files = {
    html: 'mdi-language-html5',
    js: 'mdi-nodejs',
    pdf: 'mdi-file-pdf-box',
    png: 'mdi-file-image',
    mov: 'mdi-video-outline',
    mp4: 'mdi-video-outline',
  }

  function getIcon (item, isOpen) {
    if (item.children) return isOpen ? 'mdi-folder-open' : 'mdi-folder'
    return files[item.title.split('.').at(-1)] ?? 'mdi-file-outline'
  }

  const items1 = [
    {
      id: 5,
      title: 'Documents',
      children: [
        {
          id: 6,
          title: 'vuetify',
          children: [
            {
              id: 7,
              title: 'src',
              children: [{ id: 8, title: 'index.js' }],
            },
          ],
        },
        {
          id: 101,
          title: 'material1',
          children: [
            {
              id: 111,
              title: 'src',
              children: [
                { id: 112, title: 'v-chip.js' },
                { id: 113, title: 'v-slider.js' },
              ],
            },
          ],
        },
        {
          id: 10,
          title: 'material2',
          children: [
            {
              id: 11,
              title: 'src',
              children: [
                { id: 12, title: 'v-btn.js' },
                { id: 13, title: 'v-card.js' },
                { id: 14, title: 'v-window.js' },
              ],
            },
          ],
        },
      ],
    },
  ]

  const items2 = [
    {
      id: 115,
      title: 'Documents',
      children: [
        {
          id: 116,
          title: 'Financial',
          children: [
            { id: 17, title: 'November.pdf' },
          ],
        },
        {
          id: 117,
          title: 'Taxes',
          children: [
            { id: 118, title: 'December.pdf' },
            { id: 119, title: 'January.pdf' },
          ],
        },
        {
          id: 120,
          title: 'Later',
          children: [
            { id: 121, title: 'Company logo.png' },
          ],
        },
      ],
    },
    {
      id: 15,
      title: 'Downloads',
      children: [
        { id: 16, title: '2022-03-01 Report.pdf' },
        { id: 18, title: 'Tutorial.html' },
      ],
    },
    {
      id: 19,
      title: 'Videos',
      children: [
        {
          id: 20,
          title: 'Tutorials',
          children: [
            { id: 21, title: 'Basic layouts.mp4' },
            { id: 23, title: 'Empty folder', children: [] },
            { id: 22, title: 'Advanced techniques.mp4' },
          ],
        },
        { id: 24, title: 'Intro.mov' },
        { id: 25, title: 'Conference introduction.mov' },
      ],
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      separateRoots: false,
      actionIcons: true,
      prependIcons: true,
      files: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        pdf: 'mdi-file-pdf-box',
        png: 'mdi-file-image',
        mov: 'mdi-file-video-outline',
        mp4: 'mdi-video-outline',
      },
      items1: [
        {
          id: 5,
          title: 'Documents',
          children: [
            {
              id: 6,
              title: 'vuetify',
              children: [
                {
                  id: 7,
                  title: 'src',
                  children: [{ id: 8, title: 'index.js' }],
                },
              ],
            },
            {
              id: 101,
              title: 'material1',
              children: [
                {
                  id: 111,
                  title: 'src',
                  children: [
                    { id: 112, title: 'v-chip.js' },
                    { id: 113, title: 'v-slider.js' },
                  ],
                },
              ],
            },
            {
              id: 10,
              title: 'material2',
              children: [
                {
                  id: 11,
                  title: 'src',
                  children: [
                    { id: 12, title: 'v-btn.js' },
                    { id: 13, title: 'v-card.js' },
                    { id: 14, title: 'v-window.js' },
                  ],
                },
              ],
            },
          ],
        },
      ],
      items2: [
        {
          id: 115,
          title: 'Documents',
          children: [
            {
              id: 116,
              title: 'Financial',
              children: [
                { id: 17, title: 'November.pdf' },
              ],
            },
            {
              id: 117,
              title: 'Taxes',
              children: [
                { id: 118, title: 'December.pdf' },
                { id: 119, title: 'January.pdf' },
              ],
            },
            {
              id: 120,
              title: 'Later',
              children: [
                { id: 121, title: 'Company logo.png' },
              ],
            },
          ],
        },
        {
          id: 15,
          title: 'Downloads',
          children: [
            { id: 16, title: '2022-03-01 Report.pdf' },
            { id: 18, title: 'Tutorial.html' },
          ],
        },
        {
          id: 19,
          title: 'Videos',
          children: [
            {
              id: 20,
              title: 'Tutorials',
              children: [
                { id: 21, title: 'Basic layouts.mp4' },
                { id: 23, title: 'Empty folder', children: [] },
                { id: 22, title: 'Advanced techniques.mp4' },
              ],
            },
            { id: 24, title: 'Intro.mov' },
            { id: 25, title: 'Conference introduction.mov' },
          ],
        },
      ],
    }),
    methods: {
      getIcon (item, isOpen) {
        if (item.children) return isOpen ? 'mdi-folder-open' : 'mdi-folder'
        return this.files[item.title.split('.').at(-1)] ?? 'mdi-file-outline'
      },
    },
  }
</script>
