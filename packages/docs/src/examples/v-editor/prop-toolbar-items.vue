<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-text>
      <v-select
        v-model="toolbarItems"
        :items="availableItems"
        label="Toolbar Items"
        variant="outlined"
        chips
        multiple
      ></v-select>
    </v-card-text>
    <v-card-text>
      <v-editor
        v-model="content"
        :toolbar-items="toolbarItems"
        height="200"
      ></v-editor>
    </v-card-text>

  </v-card>
</template>

<script setup>
  const content = ref('This is some <b>rich text</b> content with <i>formatting</i>')
  const availableItems = ['bold', 'italic', 'underline']
  const toolbarItems = ref(['bold', 'italic', 'underline'])
</script>

<script>
  export default {
    data: () => ({
      content: 'This is some <b>rich text</b> content with <i>formatting</i>',
      availableItems: ['bold', 'italic', 'underline'],
      toolbarItems: ['bold', 'italic', 'underline'],
    }),
  }
</script>
