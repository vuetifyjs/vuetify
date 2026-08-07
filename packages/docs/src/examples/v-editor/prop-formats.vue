<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-text>
      <v-select
        v-model="formats"
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
        :formats="formats"
        height="200"
      ></v-editor>
    </v-card-text>
  </v-card>
</template>

<script setup>
  const content = ref('This is some <b>rich text</b> content with <i>formatting</i>')
  const availableItems = ['bold', 'italic', 'underline', 'strike-through', 'code', 'heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'heading6', 'subscript', 'superscript', 'quote']
  const formats = ref(['bold', 'italic', 'underline', 'strike-through', 'code', 'heading1', 'heading2', 'subscript', 'superscript', 'quote'])
</script>

<script>
  export default {
    data: () => ({
      content: 'This is some <b>rich text</b> content with <i>formatting</i>',
      availableItems: ['bold', 'italic', 'underline', 'strike-through', 'code', 'heading1', 'heading2', 'heading3', 'heading4', 'heading5', 'heading6', 'subscript', 'superscript', 'quote'],
      formats: ['bold', 'italic', 'underline', 'strike-through', 'code', 'heading1', 'heading2', 'subscript', 'superscript', 'quote'],
    }),
  }
</script>
