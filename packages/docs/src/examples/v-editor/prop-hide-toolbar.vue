<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-text>
      <v-editor
        v-model="content"
        height="200"
        hide-toolbar
      ></v-editor>
    </v-card-text>
  </v-card>
</template>

<script setup>
  const content = ref('This is some plain text content without formatting options.')
</script>

<script>
  export default {
    data: () => ({
      content: 'This is some plain text content without formatting options.',
    }),
  }
</script>
