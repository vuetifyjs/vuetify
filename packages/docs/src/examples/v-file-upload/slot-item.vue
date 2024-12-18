<template>
  <v-file-upload
    v-model="model"
    clearable
    multiple
    show-size
  >
    <template v-slot:item="{ props: itemProps }">
      <v-file-upload-item v-bind="itemProps" lines="one" nav>
        <template v-slot:prepend>
          <v-avatar size="32" rounded></v-avatar>
        </template>

        <template v-slot:clear="{ props: clearProps }">
          <v-btn color="primary" v-bind="clearProps"></v-btn>
        </template>
      </v-file-upload-item>
    </template>
  </v-file-upload>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const model = shallowRef(null)
</script>
