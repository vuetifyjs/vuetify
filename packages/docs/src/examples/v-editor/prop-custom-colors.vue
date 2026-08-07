<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-text>
      <v-editor
        v-model="content"
        color="primary"
        height="200"
      ></v-editor>
    </v-card-text>

    <v-card-text>
      <v-editor
        v-model="content2"
        color="success"
        height="200"
        label="Success Color Editor"
        placeholder="Start typing your content here..."
      ></v-editor>
    </v-card-text>
  </v-card>
</template>

<script setup>
  const content = shallowRef('This editor uses <b>primary</b> color theme.')
  const content2 = shallowRef('This editor uses <b>success</b> color theme.')
</script>

<script>
  export default {
    data: () => ({
      content: 'This editor uses <b>primary</b> color theme.',
      content2: 'This editor uses <b>success</b> color theme.',
    }),
  }
</script>
