<template>
  <v-treeview :items=" items " item-key="name" activatable>
    <template v-slot:prepend=" { index, depth, path } ">
      <v-btn
        icon="mdi-information-outline"
        variant="text"
        v-tooltip:end=" `Index: ${ index } | Depth:${ depth } | Path: ${ path }` "
      ></v-btn>
    </template>
    <template v-slot:append=" { path, isFirst, isLast, item } ">
      <v-btn-group divided>
        <v-btn :disabled=" isFirst " icon="mdi-arrow-up" @click.stop=" moveUp( path )"></v-btn>
        <v-btn :disabled=" isLast " icon="mdi-arrow-down" @click.stop="moveDown( path )"></v-btn>
        <v-btn icon="mdi-cursor-pointer" @click.stop="showDialog( item, path )"></v-btn>
      </v-btn-group>
    </template>
  </v-treeview>
  <v-dialog v-model=" show " width="50%">
    <v-card>
      <v-card-title>Move item</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <h3>Move</h3>
            {{ from?.title }}
            {{ selected }}
          </v-col>
          <v-col cols="12">

            <v-btn text="Move To ROOT" @click.stop="moveTo( [] )"></v-btn>

            <v-treeview :items=" items " item-title="title" item-value="id" open-all>
              <template v-slot:append=" { path } ">
                <v-btn text="Move here" @click.stop="moveTo( path )"></v-btn>
              </template>
            </v-treeview>
          </v-col>
        </v-row>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script setup>
  import { ref } from 'vue'

  const items = ref([
    {
      id: 1,
      title: 'Applications :',
      children: [
        { id: 2, title: 'Calendar : app' },
        { id: 3, title: 'Chrome : app' },
        { id: 4, title: 'Webstorm : app' },
      ],
    },
    {
      id: 5,
      title: 'Documents :',
      children: [
        {
          id: 6,
          title: 'vuetify :',
          children: [
            {
              id: 7,
              title: 'src :',
              children: [
                { id: 8, title: 'index : ts' },
                { id: 9, title: 'bootstrap : ts' },
              ],
            },
          ],
        },
        {
          id: 10,
          title: 'material2 :',
          children: [
            {
              id: 11,
              title: 'src :',
              children: [
                { id: 12, title: 'v-btn : ts' },
                { id: 13, title: 'v-card : ts' },
                { id: 14, title: 'v-window : ts' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 15,
      title: 'Downloads :',
      children: [
        { id: 16, title: 'October : pdf' },
        { id: 17, title: 'November : pdf' },
        { id: 18, title: 'Tutorial : html' },
      ],
    },
    {
      id: 19,
      title: 'Videos :',
      children: [
        {
          id: 20,
          title: 'Tutorials :',
          children: [
            { id: 21, title: 'Basic layouts : mp4' },
            { id: 22, title: 'Advanced techniques : mp4' },
            { id: 23, title: 'All about app : dir' },
          ],
        },
        { id: 24, title: 'Intro : mov' },
        { id: 25, title: 'Conference introduction : avi' },
      ],
    },
  ])

  const from = ref()
  const fromPath = ref()
  const toPath = ref()
  const show = ref(false)
  const selected = ref()

  function moveUp (paths) {
    if (paths.length === 0) return
    if (paths.length === 1) {
      const index = paths.pop()
      const temp = items.value[index]
      items.value.splice(index, 1)
      items.value.splice(index - 1, 0, temp)
    }

    if (paths.length > 1) {
      const index = paths.pop()
      const parent = paths.reduce((acc, path) => Array.isArray(acc) ? acc[path] : acc.children[path], items.value)
      const temp = parent.children[index]
      if (!parent.children) {
        parent.children = []
      }
      parent.children.splice(index, 1)
      parent.children.splice(index - 1, 0, temp)
    }
  }
  function moveDown (paths) {
    if (paths.length === 0) return
    if (paths.length === 1) {
      const index = paths.pop()
      const temp = items.value[index]
      items.value.splice(index, 1)
      items.value.splice(index + 1, 0, temp)
    }
    if (paths.length > 1) {
      const index = paths.pop()
      const parent = paths.reduce((acc, path) => Array.isArray(acc) ? acc[path] : acc.children[path], items.value)
      const temp = parent.children[index]
      parent.children.splice(index, 1)
      parent.children.splice(index + 1, 0, temp)
    }
  }

  function makeChild (fromPath, toPath, item) {
    if (fromPath.length === 0) return
    if (fromPath.length === 1) {
      const index = fromPath.pop()
      items.value.splice(index, 1)
    }

    if (fromPath.length > 1) {
      const index = fromPath.pop()
      const parent = fromPath.reduce((acc, path) => Array.isArray(acc) ? acc[path] : acc.children[path], items.value)
      if (!parent.children) {
        parent.children = []
      }
      parent.children.splice(index, 1)
    }

    if (toPath.length === 0) {
      items.value.push(item)
    }
    if (toPath.length === 1) {
      const index = toPath.pop()
      items.value[index].children.push(item)
    }

    if (toPath.length > 1) {
      const parent = toPath.reduce((acc, path) => Array.isArray(acc) ? acc[path] : acc.children[path], items.value)
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(item)
    }
  }

  function showDialog (item, path) {
    show.value = true
    from.value = item
    fromPath.value = path
    toPath.value = null
  }

  function reset () {
    show.value = false
    from.value = null
    fromPath.value = null
    toPath.value = null
  }

  function moveTo (toPath) {
    makeChild(fromPath.value, toPath, from.value)
    reset()
  }
</script>
