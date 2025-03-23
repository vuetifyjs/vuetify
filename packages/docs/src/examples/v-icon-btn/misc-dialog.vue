<template>
  <v-btn>
    Open Dialog

  <v-dialog v-model="dialog" activator="parent" max-width="500" persistent>
    <v-card title="Dialog" subtitle="Click the X to close">
      <template #append>
        <v-icon-btn icon="$close" @click="dialog = false"></v-icon-btn>
      </template>
    </v-card>
  </v-dialog>
</v-btn>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const dialog = shallowRef(false)
</script>
