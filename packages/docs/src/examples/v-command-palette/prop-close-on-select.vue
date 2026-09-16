<template>
  <div class="text-center my-3">
    <v-btn text="Open Command Palette" @click="dialog = true"></v-btn>

    <v-command-palette
      v-model="dialog"
      :items="items"
      placeholder="Search commands..."
      @after-leave="onAfterLeave"
      @before-select="handleBeforeSelect"
      @click:item="handleClick"
    ></v-command-palette>

    <v-alert
      :text="`Last action: ${lastAction || 'none'}`"
      class="mt-3"
      type="info"
      variant="tonal"
    ></v-alert>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const dialog = ref(false)
  const lastAction = ref('')

  const rootItems = [
    { title: 'Files', subtitle: 'Enter file commands', value: 'files' },
    { title: 'Settings', subtitle: 'Open settings', value: 'settings' },
  ]

  const fileItems = [
    { title: 'Back', subtitle: 'Return to root commands', value: 'back' },
    { title: 'New File', subtitle: 'Create a new file', value: 'new-file' },
    { title: 'Open File', subtitle: 'Open an existing file', value: 'open-file' },
  ]

  const items = ref(rootItems)

  function handleBeforeSelect ({ item, preventDefault }) {
    if (item.value === 'files') {
      preventDefault()
      items.value = fileItems
    }

    if (item.value === 'back') {
      preventDefault()
      items.value = rootItems
    }
  }

  function handleClick (item) {
    lastAction.value = item.title
  }

  function onAfterLeave () {
    items.value = rootItems
  }
</script>

<script>
  const rootItems = [
    { title: 'Files', subtitle: 'Enter file commands', value: 'files' },
    { title: 'Settings', subtitle: 'Open settings', value: 'settings' },
  ]

  const fileItems = [
    { title: 'Back', subtitle: 'Return to root commands', value: 'back' },
    { title: 'New File', subtitle: 'Create a new file', value: 'new-file' },
    { title: 'Open File', subtitle: 'Open an existing file', value: 'open-file' },
  ]

  export default {
    data: () => ({
      dialog: false,
      lastAction: '',
      rootItems,
      fileItems,
      items: rootItems,
    }),
    methods: {
      handleBeforeSelect ({ item, preventDefault }) {
        if (item.value === 'files') {
          preventDefault()
          this.items = this.fileItems
        }

        if (item.value === 'back') {
          preventDefault()
          this.items = this.rootItems
        }
      },
      handleClick (item) {
        this.lastAction = item.title
      },
      onAfterLeave () {
        this.items = this.rootItems
      },
    },
  }
</script>
