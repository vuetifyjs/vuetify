<template>
  <div class="text-center">
    <v-btn
      color="primary"
      @click="dialog = true"
    >
      Open Hierarchical Palette
    </v-btn>

    <v-command-palette
      v-model="dialog"
      :items="items"
      title="File Explorer"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const dialog = ref(false)

  const items = [
    {
      id: 'documents',
      type: 'parent',
      title: 'Documents',
      prependIcon: 'mdi-folder',
      children: [
        { id: 'work', title: 'Work', prependIcon: 'mdi-briefcase', handler: () => alert('Opening Work folder') },
        { id: 'personal', title: 'Personal', prependIcon: 'mdi-account', handler: () => alert('Opening Personal folder') },
      ],
    },
    {
      id: 'pictures',
      type: 'parent',
      title: 'Pictures',
      prependIcon: 'mdi-image',
      children: [
        { id: 'vacation', title: 'Vacation 2024', prependIcon: 'mdi-beach', handler: () => alert('Viewing vacation photos') },
        { id: 'family', title: 'Family', prependIcon: 'mdi-human-male-female-child', handler: () => alert('Viewing family photos') },
      ],
    },
    {
      id: 'readme',
      title: 'README.md',
      prependIcon: 'mdi-file-document',
      handler: () => alert('Opening README.md'),
    },
  ]
</script>

