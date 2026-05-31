<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-text>
      <v-editor
        v-model="content"
        height="200"
      ></v-editor>
    </v-card-text>

    <v-card-text>
      <v-textarea
        v-model="content"
        label="HTML Output"
        readonly
      ></v-textarea>
    </v-card-text>
  </v-card>
</template>

<script setup>
  const content = shallowRef('This is some <b>rich text</b> content with <i>formatting</i>.')
</script>

<script>
  export default {
    data: () => ({
      content: 'This is some <b>rich text</b> content with <i>formatting</i>.',
    }),
  }
</script>
