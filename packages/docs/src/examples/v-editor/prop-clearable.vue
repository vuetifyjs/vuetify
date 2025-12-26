<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-text>
      <v-editor
        v-model="content"
        height="200"
        clearable
        persistent-clear
      ></v-editor>
    </v-card-text>
  </v-card>
</template>

<script setup>
  const content = ref('This content can be cleared using the clear button.')
</script>

<script>
  export default {
    data: () => ({
      content: 'This content can be cleared using the clear button.',
    }),
  }
</script>
