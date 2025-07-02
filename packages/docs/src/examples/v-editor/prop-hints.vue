<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-text>
      <v-editor
        v-model="content"
        height="200"
        hint="Use the toolbar to format your text with bold, italic, and underline."
      ></v-editor>
    </v-card-text>
    <v-card-text>
      <v-editor
        v-model="content2"
        :messages="messages"
        height="200"
      ></v-editor>
    </v-card-text>
  </v-card>
</template>

<script setup>
  const content = ref('This editor shows a helpful hint below.')
  const content2 = ref('This editor shows custom messages.')
  const messages = ref(['This is a custom message', 'You can add multiple messages'])
</script>

<script>
  export default {
    data: () => ({
      content: 'This editor shows a helpful hint below.',
      content2: 'This editor shows custom messages.',
      messages: ['This is a custom message', 'You can add multiple messages'],
    }),
  }
</script>
